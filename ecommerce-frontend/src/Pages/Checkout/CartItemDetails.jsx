import { formatMoney } from "../../Utils/money.js";

export function cartItemDetails({
  cartItem,
  isEditing,
  quantityInput,
  setQuantityInput,
  clickUpdateOrSave,
  deleteCartItem,
  inputRef,
}) {
  return (
    <>
      {" "}
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>

        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>

        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isEditing ? (
              <input
                ref={inputRef}
                type="number"
                min="1"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                style={{
                  width: "60px",
                  marginLeft: "6px",
                  border: "1px solid black",
                  padding: "2px 6px",
                }}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>

          <span
            className="update-quantity-link link-primary"
            onClick={clickUpdateOrSave}
            style={{ marginLeft: "10px" }}
          >
            {isEditing ? "Save" : "Update"}
          </span>

          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
