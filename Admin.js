var pool = require("../dbconfig");

async function GetAllCategory() {
  try {
    const [rows] = await pool.execute("SELECT * FROM `category`");
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllCategory-->", error);
  }
}

async function AddCategory(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into category(category_name) values(?)",
      [obj.Category]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddCategory-->", error);
  }
}

async function UpdateCategory(obj, id) {
  try {
    const [rows] = await pool.execute(
      "update category set category_name = '" +
        obj.Category +
        "' where category_pkid = '" +
        id +
        "'"
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdateCategory-->", error);
  }
}

async function DeleteCategory(id) {
  try {
    const [rows] = await pool.execute(
      "delete from category where category_pkid = '" + id + "'"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("DeleteCategory-->", error);
  }
}

async function GetAllSubCategory() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `subcategory` join category on category_pkid = category_fkid"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllSubCategory-->", error);
  }
}

async function GetAllSubCategoryByCategory(CategotyID) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `subcategory` join category on category_pkid = category_fkid where category_fkid = '" +
        CategotyID +
        "'"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllSubCategoryByCategory-->", error);
  }
}

async function AddSubCategory(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into subcategory(category_fkid,subcategory_name) values(?,?)",
      [obj.Category, obj.SubCategory]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddSubCategory-->", error);
  }
}

async function UpdateSubCategory(obj, id) {
  try {
    const [rows] = await pool.execute(
      "update subcategory set category_fkid = ?, subcategory_name = ? where subcategory_pkid = ?",
      [obj.Category, obj.SubCategory, id]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdateSubCategory-->", error);
  }
}

async function DeleteSubCategory(id) {
  try {
    const [rows] = await pool.execute(
      "delete from subcategory where subcategory_pkid = '" + id + "'"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("DeleteSubCategory-->", error);
  }
}

async function GetAllProducts() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM `products` join category on category_pkid = category_fkid join subcategory on subcategory_pkid = subcategory_fkid"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllProducts-->", error);
  }
}

async function AddProducts(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into products(category_fkid,subcategory_fkid,product_name,product_image,product_size,product_brand,product_color,product_meterial,product_price) values(?,?,?,?,?,?,?,?,?)",
      [
        obj.Category,
        obj.SubCategory,
        obj.ProductName,
        obj.ProductImage,
        obj.ProductSize,
        obj.ProductBrand,
        obj.ProductColor,
        obj.ProductMeterial,
        obj.ProductPrice,
      ]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("AddProducts-->", error);
  }
}

async function UpdateProduct(obj, id) {
  try {
    const [rows] = await pool.execute(
      "update products set category_fkid = ?, subcategory_fkid = ?, product_name = ?, product_image = ?, product_size = ?,product_brand = ?, product_color = ?, product_meterial = ?, product_price = ? where product_pkid = ?",
      [
        obj.Category,
        obj.SubCategory,
        obj.ProductName,
        obj.ProductImage,
        obj.ProductSize,
        obj.ProductBrand,
        obj.ProductColor,
        obj.ProductMeterial,
        obj.ProductPrice,
        id,
      ]
    );
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("UpdateProduct-->", error);
  }
}

async function DeleteProduct(id) {
  try {
    const [rows] = await pool.execute(
      "delete from products where product_pkid = '" + id + "'"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("DeleteProduct-->", error);
  }
}

async function GetAllProductsByCatSubCat(CategoryID, SubCategoryID) {
  try {
    const [rows] = await pool.execute(
      "SELECT *, 1 Qty FROM `products` join category on category_pkid = category_fkid join subcategory on subcategory_pkid = subcategory_fkid where products.category_fkid = '" +
        CategoryID +
        "' and products.subcategory_fkid = '" +
        SubCategoryID +
        "'"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllProductsByCatSubCat-->", error);
  }
}

async function FilterDataForProduct(CategoryID, SubCategoryID) {
  try {
    const [rows] = await pool.execute(
      "select distinct product_size from products where products.category_fkid = '" +
        CategoryID +
        "' and products.subcategory_fkid = '" +
        SubCategoryID +
        "'"
    );

    const [rows1] = await pool.execute(
      "select distinct product_brand from products where products.category_fkid = '" +
        CategoryID +
        "' and products.subcategory_fkid = '" +
        SubCategoryID +
        "'"
    );

    const [rows2] = await pool.execute(
      "select distinct product_color from products where products.category_fkid = '" +
        CategoryID +
        "' and products.subcategory_fkid = '" +
        SubCategoryID +
        "'"
    );

    const [rows3] = await pool.execute(
      "select distinct product_meterial from products where products.category_fkid = '" +
        CategoryID +
        "' and products.subcategory_fkid = '" +
        SubCategoryID +
        "'"
    );

    return [
      {
        Size: rows,
        Brand: rows1,
        Color: rows2,
        Meterial: rows3,
      },
    ];
  } catch (error) {
    console.log("FilterDataForProduct-->", error);
  }
}

async function ProductsFilter(obj) {
  try {
    console.log(obj);
    const query = `
  SELECT *, 1 as Qty
  FROM products
  JOIN category ON category_pkid = category_fkid
  JOIN subcategory ON subcategory_pkid = subcategory_fkid
  WHERE products.category_fkid = ?
    AND products.subcategory_fkid = ?
    AND (? = '-' OR product_size = ?)
    AND (? = '-' OR product_brand = ?)
    AND (? = '-' OR product_color = ?)
    AND (? = '-' OR product_meterial = ?)
`;

    const [rows] = await pool.execute(query, [
      obj.CategoryID,
      obj.SubCategoryID,
      obj.Size,
      obj.Size,
      obj.Brand,
      obj.Brand,
      obj.Color,
      obj.Color,
      obj.Meterial,
      obj.Meterial,
    ]);

    console.log(rows);
    return rows;
  } catch (error) {
    console.log("ProductsFilter-->", error);
  }
}

async function GetAllRegisteredUsers() {
  try {
    const [rows] = await pool.execute("select * from users");
    console.log(rows);
    return rows;
  } catch (error) {
    console.log("GetAllRegisteredUsers-->", error);
  }
}

async function PlaceOrder(obj) {
  try {
    const [rows] = await pool.execute(
      "insert into orders(user_fkid, order_date, account_holde_name, bank_name, account_no, ifsc_code, total_amount) values(?,now(),?,?,?,?,?)",
      [
        obj.UserID,
        obj.Name,
        obj.BankName,
        obj.AccountNo,
        obj.IFSCCode,
        obj.TotalAmount,
      ]
    );
    if (rows.affectedRows > 0) {
      const [rows1] = await pool.execute(
        "select max(order_pkid) as pkid from orders"
      );
      let myArr = obj.Products;
      for (let i = 0; i < myArr.length; i++) {
        const [rows2] = await pool.execute(
          "insert into order_items(order_fkid, product_fkid, product_qty) values(?,?,?)",
          [rows1[0].pkid, myArr[i].product_pkid, myArr[i].Qty]
        );
      }
    }
    return rows.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("PlaceOrder-->", error);
  }
}

async function GetAllUserOrders(UserID) {
  try {
    let MyArr = [];
    const [rows] = await pool.execute(
      "select * from orders where user_fkid = '" + UserID + "'"
    );
    for (let i = 0; i < rows.length; i++) {
      const [rows1] = await pool.execute(
        "SELECT * FROM order_items JOIN `products` ON `product_pkid` = `product_fkid` where order_fkid = '" +
          rows[i].order_pkid +
          "'"
      );

      let obj = {
        order_date: rows[i].order_date,
        account_holde_name: rows[i].account_holde_name,
        bank_name: rows[i].bank_name,
        account_no: rows[i].account_no,
        ifsc_code: rows[i].ifsc_code,
        total_amount: rows[i].total_amount,
        OrderItems: rows1,
      };
      MyArr.push(obj);
    }
    return MyArr;
  } catch (error) {
    console.log("GetAllUserOrders-->", error);
  }
}

async function AllOrder(UserID) {
  try {
    let MyArr = [];
    const [rows] = await pool.execute(
      "select * from orders join users on users_pkid = user_fkid"
    );
    for (let i = 0; i < rows.length; i++) {
      const [rows1] = await pool.execute(
        "SELECT * FROM order_items JOIN `products` ON `product_pkid` = `product_fkid` where order_fkid = '" +
          rows[i].order_pkid +
          "'"
      );

      let obj = {
        order_date: rows[i].order_date,
        account_holde_name: rows[i].account_holde_name,
        bank_name: rows[i].bank_name,
        account_no: rows[i].account_no,
        ifsc_code: rows[i].ifsc_code,
        total_amount: rows[i].total_amount,
        users_name: rows[i].users_name,
        OrderItems: rows1,
      };
      MyArr.push(obj);
    }
    return MyArr;
  } catch (error) {
    console.log("AllOrder-->", error);
  }
}

async function GetUserProfile(UserID) {
  try {
    let MyArr = [];
    const [rows] = await pool.execute(
      "select * from users where users_pkid = '" + UserID + "'"
    );
    return rows;
  } catch (error) {
    console.log("GetUserProfile-->", error);
  }
}

module.exports = {
  GetAllCategory: GetAllCategory,
  AddCategory: AddCategory,
  UpdateCategory: UpdateCategory,
  DeleteCategory: DeleteCategory,
  GetAllSubCategory: GetAllSubCategory,
  GetAllSubCategoryByCategory: GetAllSubCategoryByCategory,
  AddSubCategory: AddSubCategory,
  UpdateSubCategory: UpdateSubCategory,
  DeleteSubCategory: DeleteSubCategory,
  GetAllProducts: GetAllProducts,
  AddProducts: AddProducts,
  UpdateProduct: UpdateProduct,
  DeleteProduct: DeleteProduct,
  GetAllProductsByCatSubCat: GetAllProductsByCatSubCat,
  FilterDataForProduct: FilterDataForProduct,
  ProductsFilter: ProductsFilter,
  GetAllRegisteredUsers: GetAllRegisteredUsers,
  PlaceOrder: PlaceOrder,
  GetAllUserOrders: GetAllUserOrders,
  AllOrder: AllOrder,
  GetUserProfile: GetUserProfile,
};
