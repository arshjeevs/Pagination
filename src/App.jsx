import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [Products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {Products.length > 0 && (
        <div className="products">
          {Products.map((item, index) => (
            <span className="products__single" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <h2>{item.title}</h2>
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
