import { useState, useRef, useEffect } from "react";
import { cartItemDetails } from "./CartItemDetails";
import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../Utils/money";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  const [editingId, setEditingId] = useState(null);
  const [quantityInput, setQuantityInput] = useState("");

  // 🔹 ref for quantity input
  const inputRef = useRef(null);

  // 🔹 focus + select when edit mode starts
  useEffect(() => {
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId,
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };

          const isEditing = editingId === cartItem.productId;

          const clickUpdateOrSave = async () => {
            // ENTER edit mode
            if (!isEditing) {
              setEditingId(cartItem.productId);
              setQuantityInput(cartItem.quantity);
              return;
            }

            // SAVE
            const newQty = Number(quantityInput);

            if (!newQty || newQty < 1) {
              alert("Quantity must be at least 1");
              return;
            }

            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              quantity: newQty,
            });

            await loadCart();

            setEditingId(null);
            setQuantityInput("");
          };

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM DD",
                )}
              </div>

              <div className="cart-item-details-grid">
                {cartItemDetails({
                  cartItem,
                  isEditing,
                  quantityInput,
                  setQuantityInput,
                  clickUpdateOrSave,
                  deleteCartItem,
                  inputRef,
                })}

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  {deliveryOptions.map((deliveryOption) => {
                    let priceString = "FREE Shipping";
                    if (deliveryOption.priceCents > 0) {
                      priceString = `${formatMoney(
                        deliveryOption.priceCents,
                      )} - Shipping`;
                    }

                    const updateDeliveryOption = async () => {
                      await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id,
                      });
                      await loadCart();
                    };

                    return (
                      <div
                        key={deliveryOption.id}
                        className="delivery-option"
                        onClick={updateDeliveryOption}
                      >
                        <input
                          type="radio"
                          checked={
                            deliveryOption.id === cartItem.deliveryOptionId
                          }
                          onChange={() => {}}
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`}
                        />

                        <div>
                          <div className="delivery-option-date">
                            {dayjs(
                              deliveryOption.estimatedDeliveryTimeMs,
                            ).format("dddd, MMMM DD")}
                          </div>

                          <div className="delivery-option-price">
                            {priceString}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
