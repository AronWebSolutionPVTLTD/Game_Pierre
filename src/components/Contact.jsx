import emailjs from "@emailjs/browser";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "./Home/contact-toast.css";
function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    selectedOption: "message",
    message: "",
    bug: "",
    suggestion: "",
  });
  const {
    firstname,
    lastname,
    email,
    selectedOption,
    message,
    bug,
    suggestion,
  } = formData;

  const form = useRef();
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFieldEmpty = false;

    if (selectedOption === "message" && !message) {
      isFieldEmpty = true;
    } else if (selectedOption === "bug" && !bug) {
      isFieldEmpty = true;
    } else if (selectedOption === "suggestion" && !suggestion) {
      isFieldEmpty = true;
    } else if (!firstname || !email || !lastname) {
      isFieldEmpty = true;
    }

    if (isFieldEmpty) {
      toast.error("Please fill the required field", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    e.preventDefault();
    emailjs
      .sendForm(
        "service_14b9l0e",
        "contact_form",
        form.current,
        "KDyXTU2EIfXXujJmB",
      )
      .then(
        (result) => {
          if (result.status === 200) {
            toast.success("Your message sent successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              selectedOption: "message",
              message: "",
              bug: "",
              suggestion: "",
            });
          }
        },
        (error) => {
          console.log(error);
        },
      );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="signup_form" ref={form} onSubmit={handleSubmit}>
            <h3 className="form_title text-center mb-4">Contactez-nous</h3>
            <div className="row">
              <div className="col-sm-12 mb-3">
                <div className="form_field">
                  <input
                    type="text"
                    id="firstname"
                    placeholder=""
                    autoComplete="off"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                    required
                    className="floating_input"
                  />
                  <label htmlFor="firstname" className="floating_label">
                    Prénom
                  </label>
                </div>
              </div>
              <div className="col-sm-12 mb-3">
                <div className="form_field">
                  <input
                    type="text"
                    id="lastname"
                    placeholder=""
                    autoComplete="off"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                    required
                    className="floating_input"
                  />
                  <label htmlFor="lastName" className="floating_label">
                    Nom
                  </label>
                </div>
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
                    value={email}
                    onChange={handleChange}
                    className="floating_input"
                  />
                  <label htmlFor="email" className="floating_label">
                    Email
                  </label>
                </div>
              </div>
              <div className="col-sm-12 mb-3">
                <div className="form_field">
                  <select
                    id="contactType"
                    name="selectedOption"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    autoComplete="off"
                    required
                    placeholder=""
                    className="floating_input"
                  >
                    <option value="message">Message</option>
                    <option value="bug">Bug</option>
                    <option value="suggestion">Suggestion</option>
                  </select>
                  <label htmlFor="contactType" className="floating_label">
                    Type Du Message
                  </label>
                </div>
              </div>

              {selectedOption === "message" && (
                <div className="form_field  mb-3">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    className="floating_input"
                  />
                </div>
              )}
              {selectedOption === "bug" && (
                <div className="form_field mb-3">
                  <label htmlFor="bug">Bug Report:</label>
                  <textarea
                    id="bug"
                    name="bug"
                    value={bug}
                    onChange={handleChange}
                    className="floating_input"
                  />
                </div>
              )}
              {selectedOption === "suggestion" && (
                <div className="form_field mb-3">
                  <label htmlFor="suggestion">Suggestion:</label>
                  <textarea
                    id="suggestion"
                    name="suggestion"
                    value={suggestion}
                    onChange={handleChange}
                    className="floating_input"
                  />
                </div>
              )}

              <div className="col-12 mb-3">
                <button className="btn btn-primary w-100 form_btn">
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
