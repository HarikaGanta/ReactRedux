import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';


export interface Product {
    id: number;
    title: string;
    price: number;
  }
  
  export interface NewProduct {
    title: string;
    price: number;
  }
  

export default function ProductDashboard() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const queryClient = useQueryClient();

  // Fetch products
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
      }));
    },
  });

  // Add product mutation
  const addProduct = useMutation<Product, Error, NewProduct>({
    mutationFn: async (newProduct) => {
      const res = await axios.post('https://dummyjson.com/products/add', newProduct);
      return res.data;
    },
    onSuccess: (newProduct) => {
      // Optimistically update local cache
      queryClient.setQueryData<Product[]>(['products'], (old) =>
        old ? [...old, newProduct] : [newProduct]
      );
    },
  });

  const handleAdd = () => {
    if (!title || price <= 0) return;
    addProduct.mutate({ title, price });
    setTitle('');
    setPrice(0);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.title} - ${product.price}</li>
        ))}
      </ul>

      <h3>Add Product</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product title"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
      />
      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
}
