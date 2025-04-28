import useSWR from 'swr';
import axios from 'axios';


const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Swr() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user</div>;

  return (
    <div>
      <h1>Welcome {data.name}</h1>
      <p>Email: {data.email}</p>
      <p>City: {data.address.city}</p>
    </div>
  );
}
