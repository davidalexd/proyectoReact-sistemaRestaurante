import { useState, useEffect } from "react";
import { URL } from "../../../api/apiDB";
import { helpHttp } from "../../helpers/helpHttp";
//para stripe
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const useFormPayment = (
  initialForm,
  validateForm,
  Payment,
  subtotal,
  item,
  idPayment,
  purchase_units
) => {
  useEffect(() => {
    setForm(initialForm);
    setErrors({});
    setCheckout(false);
    return () => {
      clearTimeout();
    };
  }, [Payment]);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);

  // hook stripe
  const stripe = useStripe();
  const elements = useElements();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [purchase_units],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log(order);
    orderSubmit();
    setCheckout(false);
  };

  const onError = (err) => {
    MySwal.fire("Carrito vacio", "LLene su carrito", "info");
    setCheckout(false);
  };
  const orderSubmit = () => {
    let products = [];
    item.map((product) =>
      products.push({
        idproduct: product.idProduct,
        quantity: product.quantity,
      })
    );
    let order_detail = {
      iduser: sessionStorage.getItem("id"),
      status: "PENDIENTE",
      subtotal: parseFloat(subtotal),
      orders: products,
      create_time: Date.now(),
      payment_method: idPayment[Payment],
    };
    const options = {
      body: order_detail,
      headers: { "content-type": "application/json" },
    };
    helpHttp()
      .post(URL.ALL_ORDERS, options)
      .then((res) => {
        console.log(res);
        if (res.idOrder) {
          setLoading(false);
          setResponse("ex4");
          setTimeout(() => setResponse(null), 5000);
          MySwal.fire("Pago realizado", "El pago fue realizado con éxito","success");
          setForm(initialForm);
          return;
        }
      });
  };

  const cardPayment = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        address: {
          city: "lima",
          country: "PE",
          line1: form.address,
        },
        email: sessionStorage.getItem("email"),
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phoneNumber,
      },
    });
    if (!error) {
      const { id } = paymentMethod;
      let card_details = {
        paymentId: id,
        amount: parseInt(subtotal),
      };
      let options = {
        body: card_details,
        headers: { "content-type": "application/json" },
      };
      helpHttp()
        .post(URL.PAYMENT_STRIPE, options)
        .then((res) => {
          if (res.message === "The payment was completed") {
            orderSubmit();
            return;
          }
          setLoading(false);
          setResponse("err3");
          setTimeout(() => setResponse(null), 5000);
        });
      elements.getElement(CardNumberElement).clear();
      elements.getElement(CardCvcElement).clear();
      elements.getElement(CardExpiryElement).clear();

      return;
    } else {
      setLoading(false);
      setResponse("err2");
      setTimeout(() => setResponse(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .post(`${URL.USERS_DB}/${sessionStorage.getItem("id")}/profile`, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.firstName) {
            if (Payment === "TARGETA") {
              cardPayment();
            } else if (Payment === "PAYPAL") {
              if (item.length > 0) {
                setLoading(false);
                setTimeout(() => setCheckout(true), 3000);
                return;
              }
              MySwal.fire("Carrito vacio", "LLene su carrito", "info");
            } else {
              console.log("No ha seleccionado un tipo de pago");
            }
            return;
          }
          setResponse("err1");
          setTimeout(() => setResponse(null), 5000);
        });
    } else {
      return;
    }
  };

  return {
    form,
    loading,
    errors,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    createOrder,
    onApprove,
    onError,
    checkout,
  };
};

export default useFormPayment;
