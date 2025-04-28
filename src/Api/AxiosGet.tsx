 import axios from "axios";
import { useEffect, useState } from "react";

interface Post{
    id:string,
    title:string
}

export default function Axios(){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res=>{
            setData(res.data);setLoading(false)
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    },[]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.map((post:Post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};
