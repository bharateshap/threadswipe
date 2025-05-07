import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const Users = () => {
  const [RegisteredUsers, setRegisteredUsers] = useState([]);

  const GetAllRegisteredUsers = () => {
    axios.get(MyApiUrl + "RegisteredUsers").then((response) => {
      if (response.data.length > 0) {
        setRegisteredUsers(response.data);
      }
    });
  };

  React.useEffect(() => {
    GetAllRegisteredUsers();
  }, []);

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <h2 className="page-title">All Registered Users</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ textAlign: "center" }}>Sl No</th>
                    <th style={{ textAlign: "center" }}>User Name</th>
                    <th style={{ textAlign: "center" }}>User Email</th>
                    <th style={{ textAlign: "center" }}>Contact Number</th>
                    <th style={{ textAlign: "center" }}>Address</th>
                    <th style={{ textAlign: "center" }}>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {RegisteredUsers.length > 0
                    ? RegisteredUsers.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_email}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_phone}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_address}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_password}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </react-fragment>
  );
};

export default Users;
