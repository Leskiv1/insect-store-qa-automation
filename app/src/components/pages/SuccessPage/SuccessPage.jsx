import React from "react";
import { useDispatch } from "react-redux";
import { removeAllCarts } from "../../../assets/store/cartSlice";
import "./SuccessPage.scss";

const SuccessPage = () => {
  const dispatch = useDispatch();

  const handleSuccessButtonClick = () => {
    dispatch(removeAllCarts())
      .then(() => {
        window.location.href = "/cart";
      })
      .catch(() => {
        alert("Не вдалося очистити корзину. Спробуйте пізніше.");
      });
  };

  return (
    <div className="success-container">
      <h1 className="success-title">Реєстрація успішна!</h1>
      <p className="success-message">Дякуємо, що зареєструвалися!</p>
      <button
        className="success-button"
        onClick={handleSuccessButtonClick}
      >
        Вернутися на Shopping cart
      </button>
    </div>
  );
};

export default SuccessPage;


