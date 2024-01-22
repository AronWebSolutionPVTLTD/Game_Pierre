import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function Signup() {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  };
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_STATE);
  const [showpassword, setShowPassword] = useState(false);

  const validate = (value) => {
    let error = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    const phoneNumber1 = value.phone;
    const phoneNumber2 = value.phone;

    if (!value.firstName.trim()) {
      error.firstName = "Le prénom est requis";
    }
    if (!value.lastName.trim()) {
      error.lastName = "Le nom de famille est requis";
    }
    if (!value.email.trim()) {
      error.email = "L'adresse e-mail est requise";
    } else if (!regex.test(value.email)) {
      error.email = "Veuillez saisir une adresse e-mail valide";
    }
    if (!value.phone.trim()) {
      error.phone = "Le numéro de contact est requis";
    } else if (!phoneRegex.test(phoneNumber1)) {
      error.phone = "Numéro invalide";
    } else if (!phoneRegex.test(phoneNumber2)) {
      error.phone = "Numéro invalide";
    }

    if (!value.password.trim()) {
      error.password = "Le mot de passe est requis";
    } else if (value.password.trim().length < 8) {
      error.password = "Le mot de passe doit comporter 8 caractères ou plus";
    } else if (!/\d/.test(value.password)) {
      error.password = "Le mot de passe doit contenir au moins 1 chiffre";
    } else if (!/[!@#$%&?]/.test(value.password)) {
      error.password =
        "Le mot de passe doit contenir au moins 1 caractère spécial";
    } else if (!/[A-Z]/.test(value.password)) {
      error.password =
        "Le mot de passe doit contenir au moins 1 lettre majuscule";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    const validationErrors = validate({ ...data, [name]: value });
    setError(validationErrors);
  };

  const btnsubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phone } = data;

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const payload = { firstName, lastName, email, password, phone };

      const response = await axios.post(
        "https://game-backend-elkj.onrender.com/api/signup",
        payload,
      );

      if (response.data === "Registered Successfully") {
        console.log(response);
        setData(INITIAL_STATE);
        toast(response.data);
        navigate("/login");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="signup_form">
              <h3 className="form_title text-center mb-4">
                S'identifier a Lire La Musique
              </h3>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="form_field">
                    <input
                      type="text"
                      placeholder=""
                      autoComplete="off"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                      className="floating_input"
                    />
                    <label htmlFor="firstName" className="floating_label">
                      First name
                    </label>
                  </div>
                  {error.firstName && (
                    <small className="error">{error.firstName}</small>
                  )}
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="form_field">
                    <input
                      type="text"
                      id="lastName"
                      placeholder=""
                      autoComplete="off"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                      className="floating_input"
                    />
                    <label htmlFor="lastName" className="floating_label">
                      Last name
                    </label>
                  </div>
                  {error.lastName && (
                    <small className="error">{error.lastName}</small>
                  )}
                </div>
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
                  {error.email && (
                    <small className="error">{error.email}</small>
                  )}
                </div>
                <div className="col-sm-12 mb-3">
                  <div className="form_field">
                    <input
                      type="text"
                      id="phone"
                      placeholder=" "
                      name="phone"
                      autoComplete="off"
                      required
                      value={data.phone}
                      onChange={handleChange}
                      className="floating_input"
                      onKeyPress={(event) => {
                        if (!/[0-9+]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <label htmlFor="phone" className="floating_label">
                      Phone No.
                    </label>
                  </div>
                  {error.phone && (
                    <small className="error">{error.phone}</small>
                  )}
                </div>
                <div className="col-sm-12 mb-3">
                  <div className="form_field">
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
                  {error.password && (
                    <small className="error">{error.password}</small>
                  )}
                </div>
                <div className="text-end mb-3">
                  <span onClick={() => navigate("/login")}>Se connecter</span>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 form_btn"
                    onClick={btnsubmit}
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
