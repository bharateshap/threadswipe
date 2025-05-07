import React, { useState } from "react";
import axios from "axios";
import { MyApiUrl } from "../services/service";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [ViewOrderItems, setViewOrderItems] = useState(false);
  const [OrdersItems, setOrdersItems] = useState([]);

  const MyOrders = () => {
    axios.get(MyApiUrl + "AllOrder").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setOrders(response.data);
      }
    });
  };

  const ViewOrderItem = (OrderItems) => {
    setOrdersItems(OrderItems);
    setViewOrderItems(true);
  };

  React.useEffect(() => {
    MyOrders();
  }, []);

  const SplitDate = (date) => {
    const sdate = date.split("T")[0];
    const dd = sdate.split("-");
    return `${dd[2]}-${dd[1]}-${dd[0]}`;
  };

  return (
    <react-fragment>
      <main>
        <div className="mb-4 pb-4"></div>
        <section className="about-us container">
          <div className="mw-930">
            <h2 className="page-title">All Orders</h2>
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
                    <th style={{ textAlign: "center" }}>User Name</th>
                    <th style={{ textAlign: "center" }}>Total Products</th>
                    <th style={{ textAlign: "center" }}>Account Holder Name</th>
                    <th style={{ textAlign: "center" }}>Bank Name</th>
                    <th style={{ textAlign: "center" }}>Account Number</th>
                    <th style={{ textAlign: "center" }}>IFSC Code</th>
                    <th style={{ textAlign: "center" }}>Order Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Orders.length > 0
                    ? Orders.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {SplitDate(item.order_date)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.users_name}
                            </td>
                            <td
                              style={{ textAlign: "center", cursor: "pointer" }}
                              onClick={() => {
                                ViewOrderItem(item.OrderItems);
                              }}
                            >
                              {item.OrderItems.length}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.account_holde_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.bank_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.account_no}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.ifsc_code}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.total_amount}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          {ViewOrderItems ? (
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
                      <th style={{ textAlign: "center" }}>Meterial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrdersItems.length > 0
                      ? OrdersItems.map((item, index) => {
                          return (
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                {index + 1}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_price}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_size}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_qty}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_color}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_brand}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.product_meterial}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </react-fragment>
  );
};

export default Orders;
