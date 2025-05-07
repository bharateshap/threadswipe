import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const Category = () => {
  const [Category, setCategory] = useState("");
  const [CategoryID, setCategoryID] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [Updatebtn, setUpdatebtn] = useState(false);

  const GetAllCategory = () => {
    axios.get(MyApiUrl + "Category").then((response) => {
      if (response.data.length > 0) {
        setCategoryData(response.data);
      }
    });
  };

  const AddCategory = () => {
    if (Category === "" || Category === null) {
      alert("Please Enter Category Name");
    } else {
      var obj = {
        Category: Category,
      };
      axios.post(MyApiUrl + "Category", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Add...!");
        } else {
          alert("Category Details Added...");
          Reset();
        }
      });
    }
  };

  const EditCategory = (CategoryID, CategoryName) => {
    setCategoryID(CategoryID);
    setCategory(CategoryName);
    setUpdatebtn(true);
  };

  const UpdateCategory = () => {
    if (Category === "" || Category === null) {
      alert("Please Enter Category Name");
    } else {
      var obj = {
        Category: Category,
      };
      axios
        .put(MyApiUrl + "Category/" + CategoryID + "", obj)
        .then((response) => {
          if (response.data === false) {
            alert("Failed To Update...!");
          } else {
            alert("Category Details Updated...");
            Reset();
          }
        });
    }
  };

  const DeleteCategory = (id) => {
    axios.delete(MyApiUrl + "Category/" + id + "").then((response) => {
      if (response.data) {
        alert("Category Deleted...");
        GetAllCategory();
      } else {
        alert("Failed To Deleted...!");
      }
    });
  };

  const Reset = () => {
    setCategory("");
    setCategoryID("");
    setUpdatebtn(false);
    GetAllCategory();
  };

  React.useEffect(() => {
    GetAllCategory();
  }, []);

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <h2 className="page-title">Manage Category</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-4">
              <form name="login-form" className="needs-validation" novalidate>
                <div className="form-floating mb-3">
                  <input
                    name="login_email"
                    type="text"
                    className="form-control form-control_gray"
                    id="customerNameEmailInput1"
                    placeholder="Category *"
                    required
                    value={Category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  />
                  <label for="customerNameEmailInput1">Category *</label>
                </div>

                <div className="pb-3"></div>
                {Updatebtn ? (
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={UpdateCategory}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={AddCategory}
                  >
                    Add
                  </button>
                )}
              </form>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-7">
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ textAlign: "center" }}>Sl No</th>
                    <th style={{ textAlign: "center" }}>Category</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CategoryData.length > 0
                    ? CategoryData.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {item.category_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                onClick={() => {
                                  EditCategory(
                                    item.category_pkid,
                                    item.category_name
                                  );
                                }}
                                className="btn btn-success"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              &nbsp;&nbsp;&nbsp;
                              <button
                                onClick={() => {
                                  DeleteCategory(item.category_pkid);
                                }}
                                className="btn btn-danger"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
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

export default Category;
