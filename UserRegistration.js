import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");

  const Register = () => {
    if (UserName === "" || UserName == null) {
      alert("Please Enter User Name");
    } else if (Email === "" || Email == null) {
      alert("Please Enter Email Address");
    } else if (ContactNumber === "" || ContactNumber == null) {
      alert("Please Enter Contact Number");
    } else if (Address === "" || Address == null) {
      alert("Please Enter Address");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        UserName: UserName,
        Email: Email,
        ContactNumber: ContactNumber,
        Address: Address,
        Password: Password,
      };
      axios.post(MyApiUrl + "userRegistration", obj).then((response) => {
        if (response.data === false) {
          alert("Registration Failed ...!");
        } else {
          alert("Registration is successful, please login to your account.");
          navigate("/UserLogin");
        }
      });
    }
  };
  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section
          className="login-register container"
          style={{ marginBottom: "5%" }}
        >
          <h2 className="d-none">Login & Register</h2>
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active"
                id="register-tab"
                data-bs-toggle="tab"
                href="#tab-item-register"
                role="tab"
                aria-controls="tab-item-register"
                aria-selected="false"
              >
                User Registration
              </a>
            </li>
          </ul>
          <div className="tab-content pt-2" id="login_register_tab_content">
            <div
              className="tab-pane fade show active"
              id="tab-item-register"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <div className="register-form">
                <form
                  name="register-form"
                  className="needs-validation"
                  novalidate
                >
                  <div className="form-floating mb-3">
                    <input
                      name="register_username"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameRegisterInput"
                      placeholder="Username"
                      required
                      value={UserName}
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />
                    <label for="customerNameRegisterInput">Username</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_email"
                      type="email"
                      className="form-control form-control_gray"
                      id="customerEmailRegisterInput"
                      placeholder="Email address *"
                      required
                      value={Email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    <label for="customerEmailRegisterInput">
                      Email address *
                    </label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_password"
                      type="number"
                      className="form-control form-control_gray"
                      id="customerPasswodRegisterInput"
                      placeholder="Password *"
                      required
                      value={ContactNumber}
                      onChange={(event) => {
                        setContactNumber(event.target.value);
                      }}
                    />
                    <label for="customerPasswodRegisterInput">
                      Contact Number *
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="register_password"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerPasswodRegisterInput"
                      placeholder="Password *"
                      required
                      value={Address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                    <label for="customerPasswodRegisterInput">Address *</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="register_password"
                      type="password"
                      className="form-control form-control_gray"
                      id="customerPasswodRegisterInput"
                      placeholder="Password *"
                      required
                      value={Password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <label for="customerPasswodRegisterInput">Password *</label>
                  </div>

                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={Register}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </react-fragment>
  );
};

export default UserRegistration;
