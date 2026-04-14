import { Header } from "../../Components/Header.jsx";
import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid.jsx";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Ecommerce Project</title>
        <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      </Helmet>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
