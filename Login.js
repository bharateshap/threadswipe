var pool = require("../dbconfig");

async function getAdminLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `admin` WHERE admin_name = ? AND admin_password = ?",
      [obj.UserName, obj.Password]
    );

    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("getAdminLogin-->", error);
  }
}

async function UserRegistration(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into users(users_name, users_email, users_password, users_phone, users_address) values(?,?,?,?,?)",
      [obj.UserName, obj.Email, obj.Password, obj.ContactNumber, obj.Address]
    );

    return rows.affectedRows > 0 ? rows : false;
  } catch (error) {
    console.log("UserRegistration-->", error);
  }
}

async function UserLogin(obj) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `users` WHERE users_email = ? AND users_password = ?",
      [obj.UserName, obj.Password]
    );

    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log("UserLogin-->", error);
  }
}

module.exports = {
  getAdminLogin: getAdminLogin,
  UserRegistration: UserRegistration,
  UserLogin: UserLogin,
};
