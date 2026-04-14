import { HomePage } from "./Pages/Home/HomePage.jsx";
import { CheckoutPage } from "./Pages/Checkout/CheckoutPage.jsx";
import { Routes, Route } from "react-router";
import { OrdersPages } from "./Pages/Orders/OrdersPages.jsx";
import { TrackingPage } from "./Pages/Orders/TrackingPages.jsx";
import { NotFoundPage } from "./Pages/NotFoundPage.jsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="/checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="/orders"
        element={<OrdersPages cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
