import React from "react";
import "./SuccessPage.scss";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h1 className="success-title">Реєстрація успішна!</h1>
      <p className="success-message">Дякуємо, що зареєструвалися!</p>
      <button
        className="success-button"
        onClick={() => window.location.href = "/"} // Наприклад, повернення на головну сторінку
      >
        На головну
      </button>
    </div>
  );
};

export default SuccessPage;
