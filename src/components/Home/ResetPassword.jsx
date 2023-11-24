import axios from "axios";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function ResetPassword() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const { email } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const btnsubmit = async (e) => {
    e.preventDefault();

    try {
      if (!newPassword || !confirmPassword) {
        setShow(true);
        setMessage("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (newPassword !== confirmPassword) {
        setShow(true);
        setMessage(
          "Le mot de passe ne correspond pas au nouveau mot de passe.",
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/resetpassword",
        { newPassword, email },
      );
      setMessage(response.data.message);
      if (
        response.data.message === "Réinitialisation du mot de passe réussie"
      ) {
        navigate("/login")
      }
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="signup_form">
            <h3 className="form_title text-center mb-4">
            Réinitialiser le mot de passe du compte
            </h3>

            <Toast
              bg={
                message === "Réinitialisation du mot de passe réussie"
                  ? "success"
                  : "danger"
              }
              className={`conf_mail_msg_${
                message === "Réinitialisation du mot de passe réussie"
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
                  {message === "Réinitialisation du mot de passe réussie"
                    ? "   Réinitialisation du mot de passe réussie"
                    : message}
                </span>
              </Toast.Header>
            </Toast>

            <div className="row">
              <div className="col-sm-12">
                <div className="form_field">
                  <input
                    type="password"
                    id="newPassword"
                    placeholder=""
                    autoComplete="off"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="floating_input"
                  />
                  <label htmlFor="newPassword" className="floating_label">
                    New Password
                  </label>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form_field">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder=""
                    autoComplete="off"
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="floating_input"
                  />
                  <label htmlFor="confirmPassword" className="floating_label">
                    Confirm Password
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button
                  className="btn btn-primary w-100 form_btn"
                  onClick={btnsubmit}
                >
                  connexion
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
