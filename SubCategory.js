import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const SubCategory = () => {
  const [Category, setCategory] = useState("-");
  const [SubCategory, setSubCategory] = useState("");
  const [SubCategoryID, setSubCategoryID] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [Updatebtn, setUpdatebtn] = useState(false);

  const GetAllCategory = () => {
    axios.get(MyApiUrl + "Category").then((response) => {
      if (response.data.length > 0) {
        const CategoryOption = response.data.map((item) => (
          <option value={item.category_pkid}>{item.category_name}</option>
        ));
        setCategoryData(CategoryOption);
        axios.get(MyApiUrl + "SubCategory").then((response1) => {
          if (response1.data.length > 0) {
            setSubCategoryData(response1.data);
          }
        });
      }
    });
  };

  const AddSubCategory = () => {
    if (Category === "-") {
      alert("Please Select Category");
    } else if (SubCategory === "" || SubCategory === null) {
      alert("Please Enter Sub Category Name");
    } else {
      var obj = {
        Category: Category,
        SubCategory: SubCategory,
      };
      axios.post(MyApiUrl + "SubCategory", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Add...!");
        } else {
          alert("Sub Category Details Added...");
          Reset();
        }
      });
    }
  };

  const EditSubCategory = (SubCategoryID, Category, SubCategory) => {
    setSubCategoryID(SubCategoryID);
    setCategory(Category);
    setSubCategory(SubCategory);
    setUpdatebtn(true);
  };

  const UpdateSubCategory = () => {
    if (Category === "-") {
      alert("Please Select Category");
    } else if (SubCategory === "" || SubCategory === null) {
      alert("Please Enter Sub Category Name");
    } else {
      var obj = {
        Category: Category,
        SubCategory: SubCategory,
      };
      axios
        .put(MyApiUrl + "SubCategory/" + SubCategoryID + "", obj)
        .then((response) => {
          if (response.data === false) {
            alert("Failed To Update...!");
          } else {
            alert("Sub Category Details Updated...");
            Reset();
          }
        });
    }
  };

  const DeleteSubCategory = (id) => {
    axios.delete(MyApiUrl + "SubCategory/" + id + "").then((response) => {
      if (response.data) {
        alert("Sub Category Deleted...");
        GetAllCategory();
      } else {
        alert("Failed To Deleted...!");
      }
    });
  };

  const Reset = () => {
    setCategory("-");
    setSubCategory("");
    setSubCategoryID("");
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
            <h2 className="page-title">Manage Sub Category</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-4">
              <form name="login-form" className="needs-validation" novalidate>
                <div className="form-floating mb-3">
                  <select
                    className="form-control form-control_gray"
                    value={Category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    <option value="-">Select Category</option>
                    {CategoryData}
                  </select>
                  <label for="customerNameEmailInput1">Select Category *</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="login_email"
                    type="text"
                    className="form-control form-control_gray"
                    id="customerNameEmailInput1"
                    placeholder="Category *"
                    required
                    value={SubCategory}
                    onChange={(event) => {
                      setSubCategory(event.target.value);
                    }}
                  />
                  <label for="customerNameEmailInput1">Sub Category *</label>
                </div>

                <div className="pb-3"></div>
                {Updatebtn ? (
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={UpdateSubCategory}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={AddSubCategory}
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
                    <th style={{ textAlign: "center" }}>Sub Category</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SubCategoryData.length > 0
                    ? SubCategoryData.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {item.category_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.subcategory_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                onClick={() => {
                                  EditSubCategory(
                                    item.subcategory_pkid,
                                    item.category_fkid,
                                    item.subcategory_name
                                  );
                                }}
                                className="btn btn-success"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              &nbsp;&nbsp;&nbsp;
                              <button
                                onClick={() => {
                                  DeleteSubCategory(item.subcategory_pkid);
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

export default SubCategory;
