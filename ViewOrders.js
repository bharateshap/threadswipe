import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const ViewOrders = () => {
  const [Orders, setOrders] = useState([]);
  const [ViewOrderItems, setViewOrderItems] = useState(false);
  const [OrdersItems, setOrdersItems] = useState([]);

  const UserID = localStorage.getItem("UserID");

  const MyOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${MyApiUrl}UserOrders/${UserID}`);
      if (response.data.length > 0) {
        console.log(response.data);
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [UserID]);

  const ViewOrderItem = (OrderItems) => {
    setOrdersItems(OrderItems);
    setViewOrderItems(true);
  };

  useEffect(() => {
    MyOrders();
  }, [MyOrders]);

  const SplitDate = (date) => {
    const sdate = date.split("T")[0];
    const [year, month, day] = sdate.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <h2 className="page-title">My Orders</h2>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th style={{ textAlign: "center" }}>Sl No</th>
                    <th style={{ textAlign: "center" }}>Order Date</th>
                    <th style={{ textAlign: "center" }}>Total Products</th>
                    <th style={{ textAlign: "center" }}>Account Holder Name</th>
                    <th style={{ textAlign: "center" }}>Bank Name</th>
                    <th style={{ textAlign: "center" }}>Account Number</th>
                    <th style={{ textAlign: "center" }}>IFSC Code</th>
                    <th style={{ textAlign: "center" }}>Order Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {SplitDate(item.order_date)}
                      </td>
                      <td
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => ViewOrderItem(item.OrderItems)}
                      >
                        {item.OrderItems.length}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.account_holde_name}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.bank_name}</td>
                      <td style={{ textAlign: "center" }}>{item.account_no}</td>
                      <td style={{ textAlign: "center" }}>{item.ifsc_code}</td>
                      <td style={{ textAlign: "center" }}>{item.total_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {ViewOrderItems && (
            <div className="row">
              <div className="col-md-12">
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    marginBottom: "2.5rem",
                  }}
                >
                  Order Items
                </p>
                <table className="table table-hover table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th style={{ textAlign: "center" }}>Sl No</th>
                      <th style={{ textAlign: "center" }}>Product Name</th>
                      <th style={{ textAlign: "center" }}>Product Price</th>
                      <th style={{ textAlign: "center" }}>Size</th>
                      <th style={{ textAlign: "center" }}>Qty</th>
                      <th style={{ textAlign: "center" }}>Color</th>
                      <th style={{ textAlign: "center" }}>Brand</th>
                      <th style={{ textAlign: "center" }}>Material</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrdersItems.map((item, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>{item.product_name}</td>
                        <td style={{ textAlign: "center" }}>{item.product_price}</td>
                        <td style={{ textAlign: "center" }}>{item.product_size}</td>
                        <td style={{ textAlign: "center" }}>{item.product_qty}</td>
                        <td style={{ textAlign: "center" }}>{item.product_color}</td>
                        <td style={{ textAlign: "center" }}>{item.product_brand}</td>
                        <td style={{ textAlign: "center" }}>{item.product_meterial}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
        <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
      </main>
    </>
  );
};

export default ViewOrders;
