import React, { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//@ts-ignore
import Home from "./components/home/Home";
import ProductDetail from "./components/product/ProductDetail";
import NotFound from "./components/notfound/NotFound";
import ProductCreate from "./components/product/ProductCreate";
import ProductUpdate from "./components/product/ProductUpdate";

function App() {
  const [error] = useState(null);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();

    const intervalId = setInterval(() => {
      getProducts();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={<Home products={products} error={error} />}
            />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/ProductCreate" element={<ProductCreate />} />
            <Route
              path="/products/:productId/ProductUpdate"
              element={<ProductUpdate />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
