import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyApiUrl, ViewImg } from "../services/service";

const ViewCarts = () => {
  const navigate = useNavigate();

  const [CartArray, setCartArray] = useState([]);
  const [DisplayCart, setDisplayCart] = useState(true);
  const [DisplayPayment, setDisplayPayment] = useState(false);

  const [Name, setName] = useState("");
  const [BankName, setBankName] = useState("");
  const [AccountNo, setAccountNo] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalItems, setTotalItems] = useState(0);

  const CheckOut = () => {
    setDisplayCart(false);
    setDisplayPayment(true);
  };

  const PlaceOrder = () => {
    if (Name === "" || Name === null) {
      alert("Please Enter Account Holder Name");
    } else if (BankName === "" || BankName == null) {
      alert("Please Enter Bank Name");
    } else if (AccountNo === "" || AccountNo == null) {
      alert("Please Enter Bank Account Number");
    } else if (IFSCCode === "" || IFSCCode == null) {
      alert("Please Enter Bank IFSC Code");
    } else {
      var obj = {
        Products: CartArray,
        Name: Name,
        BankName: BankName,
        AccountNo: AccountNo,
        IFSCCode: IFSCCode,
        TotalAmount: TotalAmount,
        UserID: localStorage.getItem("UserID"),
      };
      axios.post(MyApiUrl + "PlaceOrder", obj).then((response) => {
        if (response.data === false) {
          alert("Failed To Place Order...!");
        } else {
          alert("Your Order Is Placed...");
          localStorage.setItem("CartArray", null);
          navigate("/ViewOrders");
        }
      });
    }
  };

  const UpdateQty = (event) => {
    const updatedProducts = CartArray.map((product) =>
      parseInt(product.product_pkid) === parseInt(event.target.id)
        ? { ...product, Qty: parseInt(event.target.value) }
        : product
    );
    setCartArray(updatedProducts);
    calculatePaymentSummary(updatedProducts);
  };

  const DeleteItemFromCart = (ProductID) => {
    const updatedProducts = CartArray.filter(
      (product) => parseInt(product.product_pkid) !== parseInt(ProductID)
    );
    setCartArray(updatedProducts);
    calculatePaymentSummary(updatedProducts);
  };

  const calculatePaymentSummary = (updatedProducts) => {
    const total = updatedProducts.reduce((sum, item) => {
      return (
        parseFloat(sum) + parseFloat(item.product_price) * parseFloat(item.Qty)
      );
    }, 0);

    const totalItems = updatedProducts.reduce((sum, item) => {
      return parseFloat(sum) + parseFloat(item.Qty);
    }, 0);

    setTotalItems(totalItems);

    setTotalAmount(total);
  };

  React.useEffect(() => {
    const savedCart = localStorage.getItem("CartArray");
    if (savedCart) {
      try {
        setCartArray(JSON.parse(savedCart));
        const total = JSON.parse(savedCart).reduce((sum, item) => {
          return (
            parseFloat(sum) +
            parseFloat(item.product_price) * parseFloat(item.Qty)
          );
        }, 0);

        const totalItems = JSON.parse(savedCart).reduce((sum, item) => {
          return parseFloat(sum) + parseFloat(item.Qty);
        }, 0);

        setTotalItems(totalItems);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error parsing CartArray from localStorage:", error);
        setCartArray([]);
      }
    }
  }, []);

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            {DisplayCart ? (
              <h2 className="page-title">View Cart</h2>
            ) : (
              <h2 className="page-title">Make Payment</h2>
            )}
          </div>
        </section>

        {DisplayCart ? (
          <section className="container">
            <div className="row">
              <div className="col-md-12">
                <table className="table table-hover table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th style={{ textAlign: "center", width: "10%" }}>
                        Sl No
                      </th>
                      <th style={{ textAlign: "center", width: "20%" }}>
                        Image
                      </th>
                      <th style={{ textAlign: "center", width: "20%" }}>
                        Product Name
                      </th>
                      <th style={{ textAlign: "center", width: "10%" }}>
                        Size
                      </th>
                      <th style={{ textAlign: "center", width: "10%" }}>
                        Brand
                      </th>
                      <th style={{ textAlign: "center", width: "10%" }}>
                        Price
                      </th>
                      <th style={{ textAlign: "center", width: "10%" }}>Qty</th>
                      <th style={{ textAlign: "center", width: "10%" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartArray.length > 0 ? (
                      CartArray.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              <img
                                style={{ width: "50%" }}
                                src={ViewImg + item.product_image}
                                alt={item.product_name}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_size}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_brand}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.product_price}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <select
                                id={item.product_pkid}
                                onChange={UpdateQty}
                                value={item.Qty}
                                style={{
                                  width: "100%",
                                  height: "35px",
                                  border: "1px solid #bdbdbd",
                                  borderRadius: "5px",
                                  padding: "10%",
                                }}
                              >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                              </select>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                onClick={() => {
                                  DeleteItemFromCart(item.product_pkid);
                                }}
                                className="btn btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="EmptyCart" colSpan="8">
                          Your cart is empty, add product to your cart..!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {parseFloat(TotalAmount) !== 0 ? (
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th
                          style={{ textAlign: "center", width: "100%" }}
                          colSpan="3"
                        >
                          Payment Summary
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: "40%" }}>Total Items In Cart</td>
                        <td style={{ width: "20%" }}>:</td>
                        <td style={{ width: "40%" }}>{TotalItems}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "40%" }}>Total Order Amount</td>
                        <td style={{ width: "20%" }}>:</td>
                        <td style={{ width: "40%" }}>{TotalAmount}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan="3">
                          <button
                            style={{ border: "1px solid #299d00" }}
                            className="btn btn-success"
                            onClick={() => {
                              CheckOut();
                            }}
                          >
                            Proceed To Checkout
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {DisplayPayment ? (
          <section className="container" style={{ marginBottom: "5%" }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <form name="login-form" className="needs-validation" novalidate>
                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="Account Holder Name *"
                      required
                      value={Name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">
                      Account Holder Name *
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="Bank Name *"
                      required
                      value={BankName}
                      onChange={(event) => {
                        setBankName(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">Bank Name *</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="Account Number *"
                      required
                      value={AccountNo}
                      onChange={(event) => {
                        setAccountNo(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">
                      Account Number *
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="IFSC Code *"
                      required
                      value={IFSCCode}
                      onChange={(event) => {
                        setIFSCCode(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">IFSC Code *</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameEmailInput1"
                      placeholder="Total Amount *"
                      required
                      readOnly
                      value={TotalAmount}
                      onChange={(event) => {
                        setTotalAmount(event.target.value);
                      }}
                    />
                    <label for="customerNameEmailInput1">Total Amount *</label>
                  </div>

                  <div className="pb-3"></div>
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="button"
                    onClick={() => {
                      PlaceOrder();
                    }}
                  >
                    Place Order
                  </button>
                </form>
              </div>
              <div className="col-md-3"></div>
            </div>
          </section>
        ) : null}

        <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
      </main>
    </react-fragment>
  );
};

export default ViewCarts;
