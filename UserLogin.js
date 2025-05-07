import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";
import { useNavigate } from "react-router-dom";

const UserLogin = ({ setLoginType }) => {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const Login = () => {
    if (UserName === "" || UserName == null) {
      alert("Please Enter User Name");
    } else if (Password === "" || Password == null) {
      alert("Please Enter Password");
    } else {
      let obj = {
        UserName: UserName,
        Password: Password,
      };
      axios.post(MyApiUrl + "UserLogin", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Login, Please Enter Valid Credentials...!");
        } else {
          localStorage.setItem("LoginType", "User");
          localStorage.setItem("UserID", response.data[0].users_pkid);
          setLoginType("User");
          navigate("/UserDashboard");
        }
      });
    }
  };
  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="login-register container">
          <h2 className="d-none">Login & Register</h2>
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active"
                id="login-tab"
                data-bs-toggle="tab"
                href="#tab-item-login"
                role="tab"
                aria-controls="tab-item-login"
                aria-selected="true"
              >
                User Login
              </a>
            </li>
          </ul>
          <div className="tab-content pt-2" id="login_register_tab_content">
            <div
              className="tab-pane fade show active"
              id="tab-item-login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div className="login-form">
                <form name="login-form" className="needs-validation" novalidate>
                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="email"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="Email address *"
                      required
                      value={UserName}
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">Email address *</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="login_password"
                      type="password"
                      className="form-control form-control_gray"
                      id="customerPasswodInput"
                      placeholder="Password *"
                      required
                      value={Password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <label for="customerPasswodInput">Password *</label>
                  </div>

                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={Login}
                  >
                    Log In
                  </button>

                  <div className="customer-option mt-4 text-center">
                    <span className="text-secondary">No account yet?</span>
                    <a
                      href="/UserRegistration"
                      className="btn-text js-show-register"
                    >
                      Create Account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </react-fragment>
  );
};

export default UserLogin;
