import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [Products, setProducts] = useState([]);
  const [Page, setPage] = useState(1);
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

  const selectPagehandler = (ind) => {
    setPage(ind);
  };

  const nextPageHandler = (ind) => {
    if (ind >= Products.length / 10) {
      console.log("no next page ");
    } else {
      setPage(ind + 1);
    }
  };

  const prevPageHandler = (ind) => {
    if (ind <= 1) {
      console.log("no prev page ");
    } else {
      setPage(ind - 1);
    }
  };

  return (
    <>
      {Products.length > 0 && (
        <div className="products">
          {Products.slice(Page * 10 - 10, Page * 10).map((item, index) => (
            <span className="products__single" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <h2>{item.title}</h2>
            </span>
          ))}
        </div>
      )}
      {Products.length > 0 && (
        <div className="pagination">
          <span
            className={ Page > 1 ? "" : "pagination__disabled"}
            onClick={() => {
              prevPageHandler(Page);
            }}
          >
            ⬅️
          </span>
          {[...Array(Products.length / 10)].map((product, index) => (
            <span
              className={Page === index + 1 ? "pagination__active" : ""}
              onClick={() => {
                selectPagehandler(index + 1);
              }}
              key={index + 1}
            >
              {index + 1}
            </span>
          ))}
          <span
            onClick={() => {
              nextPageHandler(Page);
            }}
          >
            ➡️
          </span>
        </div>
      )}
    </>
  );
}

export default App;
