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
  const [showpassword,setShowPassword]=useState(false)
  const validate = (value) => {
    let error = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex =  /^[0]?[789]\d{9}$/
    if (!value.firstName.trim()) {
      error.firstName = "FirstName is required";
    }
    if (!value.lastName.trim()) {
      error.lastName = "LastName is required";
    }
    if (!value.email.trim()) {
      error.email = "Email is required";
    } else if (!regex.test(value.email)) {
      error.email = "Please enter the valid email";
    }
    if (!value.phone.trim()) {
      error.phone = "Contact number is required";
    } 
    else if(!phoneRegex.test(value.phone)){
      error.phone="Invalid Number"
    }
    // else if (value.phone.length !== 10) {
    //   error.phone = "Invalid Number ";
    // }
 
    if (!value.password.trim()) {
      error.password = "Password is required";
    } else if (value.password.trim().length < 8) {
      error.password = "Password must be 8 or more characters";
    } else if (!/\d/.test(value.password)) {
      error.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%&?]/.test(value.password)) {
      error.password = "Password must contain at least 1 special character";
    } else if (!/[A-Z]/.test(value.password)) {
      error.password = "Password must contain at least 1 capital letter";
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
        "http://localhost:5000/api/signup",
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
                  {error.firstName && <small className="error">{error.firstName}</small>}
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
                  {error.lastName && <small className="error">{error.lastName}</small>}
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
                  {error.email && <small className="error">{error.email}</small>}
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
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                     
                      
                    />
                    <label htmlFor="phone" className="floating_label">
                      Phone No.
                    </label>
                  </div>
                  {error.phone && <small className="error">{error.phone}</small>}
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


                    <div className="field_icon" onClick={()=>setShowPassword(!showpassword)} > 
                      {showpassword?<BsEyeFill/>:<BsEyeSlashFill/>}
                      </div>
       
                  </div>
                  {error.password && <small className="error">{error.password}</small>}
                </div>
                {/* <div className="col-sm-12">
                                    <div className="form_field">
                                        <input type="password"
                                            id="Confpassword"
                                            placeholder=""
                                            autoComplete="off"
                                            name="Confpassword"
                                            required 
                                            className="floating_input" />
                                        <label htmlFor="Confpassword" className="floating_label">Confirm Password</label>
                                    </div>
                                </div> */}
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 form_btn"
                    onClick={btnsubmit}
                  >
                    Submit
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
