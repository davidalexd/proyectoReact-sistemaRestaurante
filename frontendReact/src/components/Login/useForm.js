import { useState } from "react";
import { URL } from "../../api/apiDB";
import { helpHttp } from "../helpers/helpHttp";

///sweetalert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [Error, setError] = useState(false);

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

      MySwal.fire("Enviando", "Enviando registro", "info");
      setLoading(true);
      helpHttp()
        .post(URL.SIGNUP_AUTH, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res.message === "User registered successfully!") {
            setLoading(false);
            setResponse(true);
            setForm(initialForm);
            setError(false);
            setTimeout(() => setResponse(false), 5000);
          } else {
            setError(true);
            setLoading(false);
          }
        });
    } else {
      return;
    }
  };

  return {
    form,
    Error,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
