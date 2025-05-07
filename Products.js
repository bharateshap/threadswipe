import React, { useState, useRef } from "react";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";

const Products = () => {
  const fileInputRef = useRef(null);

  const [Category, setCategory] = useState("-");
  const [SubCategory, setSubCategory] = useState("-");
  const [ProductName, setProductName] = useState("");
  const [ProductImage, setProductImage] = useState("");
  const [ProductSize, setProductSize] = useState("");
  const [ProductBrand, setProductBrand] = useState("");
  const [ProductColor, setProductColor] = useState("");
  const [ProductMeterial, setProductMeterial] = useState("");
  const [ProductPrice, setProductPrice] = useState("");

  const [ProductID, setProductID] = useState("");

  const [CategoryData, setCategoryData] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [ProductData, setProductData] = useState([]);

  const [Updatebtn, setUpdatebtn] = useState(false);

  const GetAllCategory = () => {
    axios.get(MyApiUrl + "Category").then((response) => {
      if (response.data.length > 0) {
        const CategoryOption = response.data.map((item) => (
          <option value={item.category_pkid}>{item.category_name}</option>
        ));
        setCategoryData(CategoryOption);
        axios.get(MyApiUrl + "Products").then((response1) => {
          if (response1.data.length > 0) {
            setProductData(response1.data);
          }
        });
      }
    });
  };

  const GetAllSubCategory = (CategoryID) => {
    axios.get(MyApiUrl + "SubCategory/" + CategoryID + "").then((response) => {
      if (response.data.length > 0) {
        const CategoryOption = response.data.map((item) => (
          <option value={item.subcategory_pkid}>{item.subcategory_name}</option>
        ));
        setSubCategoryData(CategoryOption);
      }
    });
  };

  const GetAllSubCategoryForEdit = (CategoryID, SubCategoryID) => {
    axios.get(MyApiUrl + "SubCategory/" + CategoryID + "").then((response) => {
      if (response.data.length > 0) {
        const CategoryOption = response.data.map((item) => (
          <option value={item.subcategory_pkid}>{item.subcategory_name}</option>
        ));
        setSubCategoryData(CategoryOption);
        setSubCategory(SubCategoryID);
      }
    });
  };

  const AddProduct = () => {
    if (Category === "-") {
      alert("Please Select Category");
    } else if (SubCategory === "-") {
      alert("Please Select Sub Category");
    } else if (ProductName === "-") {
      alert("Please Enter Product Name");
    } else if (ProductImage === "-") {
      alert("Please Enter Product Image");
    } else if (ProductSize === "-") {
      alert("Please Enter Product Size");
    } else if (ProductBrand === "-") {
      alert("Please Enter Product Brand");
    } else if (ProductColor === "-") {
      alert("Please Enter Product Color");
    } else if (ProductMeterial === "-") {
      alert("Please Enter Product Meterial");
    } else if (ProductPrice === "-") {
      alert("Please Enter Product Price");
    } else {
      var obj = {
        Category: Category,
        SubCategory: SubCategory,
        ProductName: ProductName,
        ProductImage: ProductImage,
        ProductSize: ProductSize,
        ProductBrand: ProductBrand,
        ProductColor: ProductColor,
        ProductMeterial: ProductMeterial,
        ProductPrice: ProductPrice,
      };
      axios.post(MyApiUrl + "Products", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Add...!");
        } else {
          alert("Product Details Added...");
          Reset();
        }
      });
    }
  };

  const EditProduct = (
    ProductID,
    Category,
    SubCategory,
    Name,
    Image,
    Size,
    Brand,
    color,
    meterial,
    price
  ) => {
    setProductID(ProductID);
    setCategory(Category);
    GetAllSubCategoryForEdit(Category, SubCategory);
    setProductName(Name);
    setProductImage(Image);
    setProductSize(Size);
    setProductBrand(Brand);
    setProductColor(color);
    setProductMeterial(meterial);
    setProductPrice(price);
    setUpdatebtn(true);
  };

  const UpdateProduct = () => {
    if (Category === "-") {
      alert("Please Select Category");
    } else if (SubCategory === "-") {
      alert("Please Select Sub Category");
    } else if (ProductName === "-") {
      alert("Please Enter Product Name");
    } else if (ProductImage === "-") {
      alert("Please Enter Product Image");
    } else if (ProductSize === "-") {
      alert("Please Enter Product Size");
    } else if (ProductBrand === "-") {
      alert("Please Enter Product Brand");
    } else if (ProductColor === "-") {
      alert("Please Enter Product Color");
    } else if (ProductMeterial === "-") {
      alert("Please Enter Product Meterial");
    } else if (ProductPrice === "-") {
      alert("Please Enter Product Price");
    } else {
      var obj = {
        Category: Category,
        SubCategory: SubCategory,
        ProductName: ProductName,
        ProductImage: ProductImage,
        ProductSize: ProductSize,
        ProductBrand: ProductBrand,
        ProductColor: ProductColor,
        ProductMeterial: ProductMeterial,
        ProductPrice: ProductPrice,
      };
      axios
        .put(MyApiUrl + "Products/" + ProductID + "", obj)
        .then((response) => {
          if (response.data === false) {
            alert("Failed To Update...!");
          } else {
            alert("Product Details Updated...");
            Reset();
          }
        });
    }
  };

  const DeleteProduct = (id) => {
    axios.delete(MyApiUrl + "Products/" + id + "").then((response) => {
      if (response.data) {
        alert("Product Deleted...");
        GetAllCategory();
      } else {
        alert("Failed To Deleted...!");
      }
    });
  };

  const Reset = () => {
    setCategory("-");
    setSubCategory("-");
    setProductName("");
    setProductImage("");
    setProductSize("");
    setProductBrand("");
    setProductColor("");
    setProductMeterial("");
    setProductPrice("");
    setProductID("");
    setUpdatebtn(false);
    GetAllCategory();
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
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
            <h2 className="page-title">Manage Products</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <form name="login-form" className="needs-validation" novalidate>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <select
                        className="form-control form-control_gray"
                        value={Category}
                        onChange={(event) => {
                          GetAllSubCategory(event.target.value);
                          setCategory(event.target.value);
                        }}
                      >
                        <option value="-">Select Category</option>
                        {CategoryData}
                      </select>
                      <label for="customerNameEmailInput1">
                        Select Category *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <select
                        className="form-control form-control_gray"
                        value={SubCategory}
                        onChange={(event) => {
                          setSubCategory(event.target.value);
                        }}
                      >
                        <option value="-">Select Sub Category</option>
                        {SubCategoryData}
                      </select>
                      <label for="customerNameEmailInput1">
                        Select Sub Category *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Name *"
                        required
                        value={ProductName}
                        onChange={(event) => {
                          setProductName(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Name *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="file"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Name *"
                        required
                        ref={fileInputRef}
                        onChange={(event) => {
                          var formData = new FormData();
                          formData.append("file", event.target.files[0]);
                          axios
                            .post(MyApiUrl + "upload", formData)
                            .then((response) => {
                              setProductImage(response.data);
                            });
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Image *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Size *"
                        required
                        value={ProductSize}
                        onChange={(event) => {
                          setProductSize(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Size *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Brand *"
                        required
                        value={ProductBrand}
                        onChange={(event) => {
                          setProductBrand(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Brand *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Color *"
                        required
                        value={ProductColor}
                        onChange={(event) => {
                          setProductColor(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Color *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Meterial *"
                        required
                        value={ProductMeterial}
                        onChange={(event) => {
                          setProductMeterial(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Meterial *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        name="login_email"
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameEmailInput1"
                        placeholder="Product Price *"
                        required
                        value={ProductPrice}
                        onChange={(event) => {
                          setProductPrice(event.target.value);
                        }}
                      />
                      <label for="customerNameEmailInput1">
                        Product Price *
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pb-3"></div>
                  {Updatebtn ? (
                    <button
                      className="btn btn-primary w-100 text-uppercase"
                      type="button"
                      onClick={UpdateProduct}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100 text-uppercase"
                      type="button"
                      onClick={AddProduct}
                    >
                      Add
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-12" style={{ marginTop: "5%" }}>
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ textAlign: "center" }}>Sl No</th>
                    <th style={{ textAlign: "center" }}>Category</th>
                    <th style={{ textAlign: "center" }}>Sub Category</th>
                    <th style={{ textAlign: "center" }}>Product Name</th>
                    <th style={{ textAlign: "center" }}>Image</th>
                    <th style={{ textAlign: "center" }}>Size</th>
                    <th style={{ textAlign: "center" }}>Brand</th>
                    <th style={{ textAlign: "center" }}>Color</th>
                    <th style={{ textAlign: "center" }}>Meterial</th>
                    <th style={{ textAlign: "center" }}>Price</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductData.length > 0
                    ? ProductData.map((item, index) => {
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
                              {item.product_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <a href={ViewImg + item.product_image}>
                                <img
                                  style={{ width: "100%" }}
                                  src={ViewImg + item.product_image}
                                />
                              </a>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_size}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_brand}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_color}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_meterial}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_price}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                onClick={() => {
                                  EditProduct(
                                    item.product_pkid,
                                    item.category_fkid,
                                    item.subcategory_fkid,
                                    item.product_name,
                                    item.product_image,
                                    item.product_size,
                                    item.product_brand,
                                    item.product_color,
                                    item.product_meterial,
                                    item.product_price
                                  );
                                }}
                                className="btn btn-success"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              &nbsp;&nbsp;&nbsp;
                              <button
                                onClick={() => {
                                  DeleteProduct(item.product_pkid);
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

export default Products;
