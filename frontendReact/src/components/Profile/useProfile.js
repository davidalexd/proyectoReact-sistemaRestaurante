import { useState, useEffect } from "react";
import { URL } from "../../api/apiDB";
import { helpHttp } from "../helpers/helpHttp";
///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const useProfile = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [Error, setError] = useState(false);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    helpHttp()
      .get(`${URL.USERS_DB}/${sessionStorage.getItem("id")}/profile`)
      .then((res) => {
        if (!res.err) {
          setForm(res);
        }
      });
  }, [checkout]);

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
      // ("Enviando Cambios");

      MySwal.fire("Good job!", "You clicked the button!", "success");
      let dataClient = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        address: form.address,
      };
      helpHttp()
        .post(`${URL.USERS_DB}/${sessionStorage.getItem("id")}/profile`, {
          body: dataClient,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (!res.err) {
            setResponse(true);
            setTimeout(() => setResponse(false), 5000);
          }
        });
    } else {
      return;
    }
  };
  const handleEdit = () => {
    setCheckout(true);
  };

  const handleReset = () => {
    setErrors({});
    setCheckout(false);
  };

  return {
    form,
    Error,
    errors,
    response,
    checkout,
    handleChange,
    handleBlur,
    handleSubmit,
    handleEdit,
    handleReset,
  };
};
