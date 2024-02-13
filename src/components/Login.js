import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "react-bootstrap/Toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
const URL=process.env.REACT_APP_API_URL;

export default function Login() {
 
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [inputerror, setInputError] = useState("");
  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(INITIAL_STATE);
  const [forgotpass, setForgotPass] = useState(false);
  const [message, setMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [showpassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "L'adresse e-mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "L'adresse e-mail n'est pas valide";
    }
    if (!values.password) {
      errors.password = "Le mot de passe est requis";
    }

    return errors;
  }

  useEffect(() => {
    const errors = validate(data);
    setInputError(errors);
  }, [data]);

  const btnsubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = data;

      if (forgotpass) {
        axios
          .post(`${URL}/api/forgotpassword`, {email,})
          .then((response) => {
            if (
              response.data.message ===
              "Password reset instructions sent to your email"
            ) {
              setData({ email: "" });
              setSubmitDisabled(true);
            }
            setShow(true);
            setMessage(response.data.message);
          })
          .catch((error) => {
            setShow(true);
            toast(error.response.data.message);
            setMessage(error.response.data.message);
          });
      } else {
        const payload = { email, password };

        const response = await axios.post(`${URL}/api/login`,payload,);

        if (response.data.message === "login successfully") {
          console.log(response.data,"data")
          // localStorage.setItem("username", response.data.data.firstName);
          localStorage.setItem("user", JSON.stringify(response.data.data))
          localStorage.setItem("token", response.data.data.token);
          navigate("/");
          setData(INITIAL_STATE);
        } else {
          alert(response.data);
        }
      }
    } catch (error) {
      setShowError(true);
      setErrorText(error?.response?.data);
      // toast(error.response.data);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="signup_form">
              {!forgotpass ? (
                <h3 className="form_title text-center mb-2">
                  Se connecter au jeu la bataille rythmique
                </h3>
              ) : (
                <>
                  <h2>Mot de passe oublié</h2>
                  <p className="text-center">
                    Veuillez entrer votre adresse e-mail pour réinitialiser
                    votre mot de passe.
                  </p>
                </>
              )}
              <Toast
                bg={
                  message === "Password reset instructions sent to your email"
                    ? "success"
                    : "danger"
                }
                className={`conf_mail_msg_${
                  message === "Password reset instructions sent to your email"
                    ? "success"
                    : "danger"
                } w-100 mb-4`}
                onClose={() => setShow(false)}
                show={show}
              >
                <Toast.Header className="">
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <span className="me-auto">
                    {message ===
                    "Password reset instructions sent to your email"
                      ? "   Un mail vient de vous être envoyé pour réinitialiser votre mot de pas"
                      : message}
                  </span>
                </Toast.Header>
              </Toast>

              {/* error toast  */}
              <Toast
                bg={
                  message === "Password reset instructions sent to your email"
                    ? "success"
                    : "danger"
                }
                className={`conf_mail_msg_${
                  message === "Password reset instructions sent to your email"
                    ? "success"
                    : "danger"
                } w-100 mb-4`}
                onClose={() => setShowError(false)}
                show={showError}
              >
                <Toast.Header className="">
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <span className="me-auto">{errorText}</span>
                </Toast.Header>
              </Toast>
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form_field">
                    <input
                      type="email"
                      id="email"
                      autoComplete="off"
                      placeholder=""
                      name="email"
                      required
                      value={data.email}
                      onChange={handleChange}
                      className="floating_input"
                    />
                    <label htmlFor="email" className="floating_label">
                      Email
                    </label>
                  </div>
                  {inputerror.email && (
                    <small className="error">{inputerror.email}</small>
                  )}
                </div>
                {!forgotpass && (
                  <div className="col-sm-12">
                    <div
                      className="form_field"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={showpassword ? "text" : "password"}
                        id="password"
                        placeholder=""
                        autoComplete="off"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        className="floating_input"
                      />
                      <label htmlFor="password" className="floating_label">
                        Password
                      </label>

                      <div
                        className="field_icon"
                        onClick={() => setShowPassword(!showpassword)}
                      >
                        {showpassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                      </div>
                    </div>
                    {inputerror.password && (
                      <small className="error">{inputerror.password}</small>
                    )}
                  </div>
                )}

                {!forgotpass ? (
                  <div className="text-end mb-3">
                    <span onClick={() => setForgotPass(!forgotpass)}>
                      {" "}
                      Mot de passe oublié?
                    </span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between flex-row-reverse mb-3 ">
                    <span onClick={() => setForgotPass(false)}>
                      {" "}
                      Retour à la connexion?
                    </span>
                  </div>
                )}
                <div className="text-end mb-3">
                  <span onClick={() => navigate("/signup")}>S'inscrire</span>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 form_btn"
                    onClick={btnsubmit}
                    disabled={submitDisabled ? true : false}
                  >
                    Connexion
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
