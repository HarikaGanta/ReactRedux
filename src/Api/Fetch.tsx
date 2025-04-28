import { useState, useEffect } from "react";

interface items{
    id:string,
    username:string,
    email:string,
    name:string,
}

const Fetch = () => {
    const [items, setItems] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setTimeout(()=>{
                    setItems(data);
                    setDataIsLoaded(true);
                },1000)
            });
    }, []); 

    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
    }

    return (
        <div className="App">
            <h1 className="geeks">GeeksforGeeks</h1>
            <h3>Fetch data from an API in React</h3>
            <div className="container">
                {items.map((item:items) => (
                    <div className="item" key={item.id}>
                        <ol>
                            <div>
                                <strong>User_Name: </strong>
                                {item.username},
                            </div>
                            <div>Full_Name: {item.name}</div>
                            <div>User_Email: {item.email}</div>
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fetch;