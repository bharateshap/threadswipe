import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";
import "../App.css";

const ViewProducts = () => {
  const navigate = useNavigate();

  const [CategoryData, setCategoryData] = useState([]);
  const [CategoryID, setCategoryID] = useState([]);
  const [ShowCategory, setShowCategory] = useState(true);

  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [SubCategoryID, setSubCategoryID] = useState([]);
  const [ShowSubCategory, setShowSubCategory] = useState(false);

  const [ProductData, setProductData] = useState([]);
  const [ShowProduct, setShowProduct] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [CartArray, setCartArray] = useState([]);

  const [FilterSize, setFilterSize] = useState([]);
  const [FilterBrand, setFilterBrand] = useState([]);
  const [FilterColor, setFilterColor] = useState([]);
  const [FilterMeterial, setFilterMeterial] = useState([]);

  const [Brand, setBrand] = useState("-");
  const [Size, setSize] = useState("-");
  const [Color, setColor] = useState("-");
  const [Meterial, setMeterial] = useState("-");

  const GetAllCategory = () => {
    axios.get(MyApiUrl + "Category").then((response) => {
      if (response.data.length > 0) {
        setCategoryData(response.data);
      }
    });
  };

  const SelectCategory = (CategoryID) => {
    axios.get(MyApiUrl + "SubCategory/" + CategoryID + "").then((response) => {
      if (response.data.length > 0) {
        setSubCategoryData(response.data);
        setCategoryID(CategoryID);
        setShowCategory(false);
        setShowSubCategory(true);
        setShowProduct(false);
      }
    });
  };

  const SelectSubCategory = (SubCategoryID) => {
    axios
      .get(`${MyApiUrl}Products/${CategoryID}/${SubCategoryID}`)
      .then((response) => {
        if (response.data.length > 0) {
          axios
            .get(`
              ${MyApiUrl}FilterDataForProduct/${CategoryID}/${SubCategoryID}
            `)
            .then((response1) => {
              if (response1.data.length > 0) {
                const SizeOption = response1.data[0].Size.map((item) => (
                  <option value={item.product_size}>{item.product_size}</option>
                ));
                setFilterSize(SizeOption);

                const BrandOption = response1.data[0].Brand.map((item) => (
                  <option value={item.product_brand}>
                    {item.product_brand}
                  </option>
                ));
                setFilterBrand(BrandOption);

                const ColorOption = response1.data[0].Color.map((item) => (
                  <option value={item.product_color}>
                    {item.product_color}
                  </option>
                ));
                setFilterColor(ColorOption);

                const MeterialOption = response1.data[0].Meterial.map(
                  (item) => (
                    <option value={item.product_meterial}>
                      {item.product_meterial}
                    </option>
                  )
                );
                setFilterMeterial(MeterialOption);
              }
            });
          setProductData(response.data);
          setSubCategoryID(SubCategoryID);
          setShowCategory(false);
          setShowSubCategory(false);
          setShowProduct(true);
        }
      });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ProductData.length);
  };
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * ProductData.length);
    setCurrentIndex(randomIndex);
  };

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? ProductData.length - 1 : prevIndex - 1
  //   );
  // };

  const AddProductToCart = (ProductObj) => {
    console.log(CartArray);
    const exists = CartArray.some(
      (item) => item.product_pkid === ProductObj.product_pkid
    );
    console.log(exists);
    if (exists) {
      alert("This product is already in the cart!");
    } else {
      const updatedCart = [...CartArray, ProductObj];
      setCartArray(updatedCart);
      localStorage.setItem("CartArray", JSON.stringify(updatedCart));
      alert(
        "Selected Product Is Added To Cart, Please View Cart For More Details!"
      );
    }
  };

  const handleFilterProducts = (updatedFilter) => {
    const currentFilters = {
      CategoryID,
      SubCategoryID,
      Size,
      Color,
      Brand,
      Meterial,
      ...updatedFilter,
    };

    FilterProducts(currentFilters);
  };

  const FilterProducts = (filters) => {
    axios.post(MyApiUrl + "ProductsFilter", filters).then((response) => {
      if (response.data.length > 0) {
        setProductData(response.data);
        setShowCategory(false);
        setShowSubCategory(false);
        setShowProduct(true);
      } else {
        setProductData([]);
        setShowCategory(false);
        setShowSubCategory(false);
        setShowProduct(true);
      }
    });
  };

  const ViewCart = () => {
    navigate("/ViewCarts");
  };

  React.useEffect(() => {
    GetAllCategory();
  }, [CartArray]);

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="row">
            <div className="col-md-6">
              <div className="mw-930">
                {ShowCategory ? (
                  <h2 className="page-title">Choose Category</h2>
                ) : null}
                {ShowSubCategory ? (
                  <h2 className="page-title">Choose Sub Category</h2>
                ) : null}
                {ShowProduct ? (
                  <h2 className="page-title">Choose Product</h2>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-success"
                onClick={() => {
                  ViewCart();
                }}
                type="button"
                style={{ float: "right", border: "1px solid rgb(114 197 85)" }}
              >
                View Cart
              </button>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <form name="login-form" className="needs-validation" novalidate>
                {ShowCategory ? (
                  <div className="row">
                    {CategoryData.length > 0
                      ? CategoryData.map((item) => {
                          return (
                            <div className="col-md-2" style={{ padding: "1%" }}>
                              <div
                                onClick={() => {
                                  SelectCategory(item.category_pkid);
                                }}
                                className="ViewProductCat"
                              >
                                <p style={{ marginBottom: "0" }}>
                                  {item.category_name}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : null}
                {ShowSubCategory ? (
                  <div className="row">
                    {SubCategoryData.length > 0
                      ? SubCategoryData.map((item) => {
                          return (
                            <div className="col-md-2" style={{ padding: "1%" }}>
                              <div
                                onClick={() => {
                                  SelectSubCategory(item.subcategory_pkid);
                                }}
                                className="ViewProductCat"
                              >
                                <p style={{ marginBottom: "0" }}>
                                  {item.subcategory_name}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : null}
                {ShowProduct ? (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-2">
                          <select
                            className="selectOtp"
                            value={Size}
                            onChange={(event) => {
                              setSize(event.target.value);
                              handleFilterProducts({
                                Size: event.target.value,
                              });
                            }}
                          >
                            <option value="-">Select Size</option>
                            {FilterSize}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <select
                            className="selectOtp"
                            value={Color}
                            onChange={(event) => {
                              setColor(event.target.value);
                              handleFilterProducts({
                                Color: event.target.value,
                              });
                            }}
                          >
                            <option value="-">Select Color</option>
                            {FilterColor}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <select
                            className="selectOtp"
                            value={Brand}
                            onChange={(event) => {
                              setBrand(event.target.value);
                              handleFilterProducts({
                                Brand: event.target.value,
                              });
                            }}
                          >
                            <option value="-">Select Brand</option>
                            {FilterBrand}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <select
                            className="selectOtp"
                            value={Meterial}
                            onChange={(event) => {
                              setMeterial(event.target.value);
                              handleFilterProducts({
                                Meterial: event.target.value,
                              });
                            }}
                          >
                            <option value="-">Select Meterial</option>
                            {FilterMeterial}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                      {ProductData.length > 0 ? (
                        <div className="slider-container">
                          <button
                            type="button"
                            onClick={() => {
                              handleRandom();
                            }}
                            className="prev-btn"
                          >
                            Prev
                          </button>
                          <div className="card">
                            <div
                              style={{
                                borderBottom: "1px solid rgb(217 217 217)",
                                width: "100%",
                                marginBottom: "5%",
                              }}
                            >
                              <img
                                src={
                                  ViewImg +
                                  ProductData[currentIndex].product_image
                                }
                                alt={ProductData[currentIndex].product_name}
                                className="product-image"
                              />
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid rgb(217 217 217)",
                                width: "100%",
                                marginBottom: "5%",
                              }}
                            >
                              <table className="table">
                                <tr>
                                  <td colSpan="3">
                                    <h3>
                                      {ProductData[currentIndex].product_name}
                                    </h3>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "40%" }}>
                                    <b>Price</b>
                                  </td>
                                  <td style={{ width: "20%" }}>:</td>
                                  <td
                                    style={{ textAlign: "left", width: "40%" }}
                                  >
                                    {ProductData[currentIndex].product_price}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "40%" }}>
                                    <b>Size</b>
                                  </td>
                                  <td style={{ width: "20%" }}>:</td>
                                  <td
                                    style={{ textAlign: "left", width: "40%" }}
                                  >
                                    {ProductData[currentIndex].product_size}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "40%" }}>
                                    <b>Color</b>
                                  </td>
                                  <td style={{ width: "20%" }}>:</td>
                                  <td
                                    style={{ textAlign: "left", width: "40%" }}
                                  >
                                    {ProductData[currentIndex].product_color}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "40%" }}>
                                    <b>Brand</b>
                                  </td>
                                  <td style={{ width: "20%" }}>:</td>
                                  <td
                                    style={{ textAlign: "left", width: "40%" }}
                                  >
                                    {ProductData[currentIndex].product_brand}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "40%" }}>
                                    <b>Meterial</b>
                                  </td>
                                  <td style={{ width: "20%" }}>:</td>
                                  <td
                                    style={{ textAlign: "left", width: "40%" }}
                                  >
                                    {ProductData[currentIndex].product_meterial}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                marginBottom: "2%",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  AddProductToCart(ProductData[currentIndex]);
                                }}
                                className="btn btn-primary"
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleNext();
                            }}
                            className="next-btn"
                          >
                            Next
                          </button>
                        </div>
                      ) : (
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "2%",
                            fontSize: "2em",
                            fontWeight: "500",
                            fontFamily: "Jost, sans-serif",
                          }}
                        >
                          Products not available based on the selected filter!
                        </p>
                      )}
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </section>
        <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
      </main>
    </react-fragment>
  );
};

export default ViewProducts;
