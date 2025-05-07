import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";

const UserProfile = () => {
  const [UserProfile, setUserProfile] = useState([]);

  const UserID = localStorage.getItem("UserID");

  const MyProfile = () => {
    axios.get(MyApiUrl + "UserProfile/" + UserID + "").then((response) => {
      if (response.data.length > 0) {
        setUserProfile(response.data);
      }
    });
  };

  React.useEffect(() => {
    MyProfile();
  }, []);

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <h2 className="page-title">Profile</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <img
                    style={{ width: "75%" }}
                    src={`${ViewImg}/SampleProfile.png`}
                  />
                </div>
                <div className="card-body" style={{ width: "100%" }}>
                  {UserProfile.length > 0 ? (
                    <table className="table table-hover table-striped">
                      <tr>
                        <th style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>Name</th>
                        <td style={{ height: "40px",width: "20%", fontSize: "15px" }}>:</td>
                        <td style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          {UserProfile[0].users_name}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          Email
                        </th>
                        <td style={{ height: "40px",width: "20%", fontSize: "15px" }}>:</td>
                        <td style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          {UserProfile[0].users_email}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          Phone
                        </th>
                        <td style={{ height: "40px",width: "20%", fontSize: "15px" }}>:</td>
                        <td style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          {UserProfile[0].users_phone}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          Address
                        </th>
                        <td style={{ height: "40px",width: "20%", fontSize: "15px" }}>:</td>
                        <td style={{ height: "40px",width: "40%", fontSize: "15px",textAlign: "left" }}>
                          {UserProfile[0].users_address}
                        </td>
                      </tr>
                    </table>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </section>
        <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
      </main>
    </react-fragment>
  );
};

export default UserProfile;
