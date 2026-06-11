import React from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./FormPage.scss";

const regx = {
  name: /^[а-яА-ЯіїєІЇЄa-zA-Z'’\-]{2,20}$/,
  phone: /^\+?[0-9]{10,13}$/, 
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
  deliveryAddress: /^вул\.\s*[а-яА-ЯіїєІЇЄa-zA-Z'’\-]+\s*,\s*\d+\s*,\s*м\.\s*[а-яА-ЯіїєІЇЄa-zA-Z'’\-]+$/,
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(regx.name, "Ім'я може містити лише літери (від 2 до 20 символів).")
    .required("Ім'я є обов'язковим."),
  lastname: Yup.string()
    .matches(regx.name, "Прізвище може містити лише літери (від 2 до 20 символів).")
    .required("Прізвище є обов'язковим."),
  email: Yup.string()
    .matches(regx.email, "Некоректна електронна пошта.")
    .required("Електронна пошта є обов'язковою."),
  phone: Yup.string()
    .matches(regx.phone, "Номер телефону має складатися з 10-13 цифр, може починатися з '+'.")
    .required("Номер телефону є обов'язковим."),
  deliveryAddress: Yup.string()
    .matches(
      regx.deliveryAddress,
      "Адреса має бути у форматі: вул. Назва, номер, м. Місто."
    )
    .required("Адреса доставки є обов'язковою."),
});


const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  deliveryAddress: "",
};

const FormComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
        console.log(values);

        const response = await fetch('/api/carts', { method: 'DELETE' });

        if (response.ok) {
            console.log("Cart cleared successfully.");
        } else {
            console.error("Failed to clear the cart.");
        }

        navigate("/success");
    } catch (error) {
        console.error("Error during form submission or cart clearing:", error);
    }
};

  return (
    <div className="form-container">
      <h1 className="form-title">Checkout</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-custom">
          <div className="input-container">
            <label htmlFor="firstname" className="input-label">
              Ім'я
            </label>
            <Field
              name="firstname"
              id="firstname"
              placeholder="Введіть ім'я"
              className="input-field"
            />
            <FormikErrorMessage
              name="firstname"
              component="div"
              className="error-message"
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastname" className="input-label">
              Прізвище
            </label>
            <Field
              name="lastname"
              id="lastname"
              placeholder="Введіть прізвище"
              className="input-field"
            />
            <FormikErrorMessage
              name="lastname"
              component="div"
              className="error-message"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Електронна пошта
            </label>
            <Field
              name="email"
              id="email"
              placeholder="Введіть email"
              className="input-field"
            />
            <FormikErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="input-container">
            <label htmlFor="phone" className="input-label">
              Номер телефону
            </label>
            <Field
              name="phone"
              id="phone"
              placeholder="Введіть номер телефону"
              className="input-field"
            />
            <FormikErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>
          <div className="input-container">
            <label htmlFor="deliveryAddress" className="input-label">
              Адреса доставки
            </label>
            <Field
              name="deliveryAddress"
              id="deliveryAddress"
              placeholder="Введіть адресу доставки"
              className="input-field"
            />
            <FormikErrorMessage
              name="deliveryAddress"
              component="div"
              className="error-message"
            />
          </div>
          <button type="submit" className="submit-button">
            Continue
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormComponent;







