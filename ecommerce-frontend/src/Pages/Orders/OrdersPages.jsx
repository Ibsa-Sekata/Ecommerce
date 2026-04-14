import { Header } from "../../Components/Header.jsx";
import { useEffect, useState, Fragment } from "react";
import { formatMoney } from "../../Utils/money.js";
import axios from "axios";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";
import "./ordersPage.css";

export function OrdersPages({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  const [addingProductId, setAddingProductId] = useState(null); // track which product shows "Added"

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  const addToCart = async (productId, quantity) => {
    setAddingProductId(productId); // show "Added" immediately

    try {
      await axios.post("/api/cart-items", { productId, quantity });
      await loadCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }

    // keep "Added" visible for 1.5 seconds
    setTimeout(() => {
      setAddingProductId(null);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <link rel="icon" href="/orders-favicon.png" />
      </Helmet>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format("MMMM DD")}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderProduct) => (
                  <Fragment key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img
                        src={orderProduct.product.image}
                        alt={orderProduct.product.name}
                      />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                          "MMMM D",
                        )}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>

                      <button
                        className="buy-again-button button-primary"
                        onClick={() =>
                          addToCart(
                            orderProduct.product.id,
                            orderProduct.quantity,
                          )
                        }
                      >
                        <img
                          className="buy-again-icon"
                          src="images/icons/buy-again.png"
                          alt="Buy Again"
                        />
                        <span className="buy-again-message">
                          {addingProductId === orderProduct.product.id
                            ? "Added"
                            : "Add to Cart"}
                        </span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <a
                        href={`/tracking/${order.id}/${orderProduct.product.id}`}
                      >
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
