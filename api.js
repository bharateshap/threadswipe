/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 18:02:44
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-08-18 15:28:27
 */
"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nocache = require("nocache");
const https = require("https");
const fs = require("fs");

var app = express();
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

var router = express.Router();
// using bodyParser to parse JSON bodies into JS objects
router.use(bodyParser.json());

// -------Operations Files ----------

var Logins = require("./apiOperations/Login");
var Admin = require("./apiOperations/Admin");

// ----------------Zeus Routes for APP--------------------------------------

// ----------------Building a Secure Node js REST API---------------------//
app.use(express.static(__dirname + "/resources/static/assets/uploads"));
app.use(express.static("public"));
app.use(express.static("/resources/static/assets/uploads"));
app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

// // adding Helmet to enhance your Rest API's security
app.use(helmet());
// adding morgan to log HTTP requests
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// ----CORS Configuration----

app.use(cors());

app.options("*", cors());

app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

// ----CORS Configuration---

app.use(nocache());

// Modify the setHeaders function so it looks like this:{
app.use(
  express.static("public", {
    etag: true, // Just being explicit about the default.
    lastModified: true, // Just being explicit about the default.
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");

      if (path.endsWith(".html")) {
        // All of the project's HTML files end in .html
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader("Cache-Control", "max-age=31536000");
      }
    },
  })
);
app.use("/api", router);

//--------- Setting cache control middleware in Express{
let setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 5;

  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }

  // remember to call next() to pass on the request
  next();
};

// now call the new middleware function in your app

app.use(setCache);
router.use(setCache);
//--------- Setting cache control middleware in Express}

// file Upload -----------------------
global.__basedir = __dirname;

const initRoutes = require("./src/routes");
const { Router } = require("express/lib/express");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
initRoutes(app);
// file Upload --------------------------------

// // ----------------Building a Secure Node js REST API---------------------//

app.set("etag", false);

app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

app.get("/", (req, res) => {
  var responseText = `<h1 style="font-family: 'Lobster', cursive;
    font-size: 4em;
    text-align: center;
    margin: 10px;
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);">🤠 Hello , Kimosabey 🐺 Restful APIs Using Nodejs is Working ✌️ </h1>`;
  res.send(responseText);
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

router.use((req, res, next) => {
  var time = new Date();
  console.log(
    "---------------------------->  RECENT REQUEST TRIGGERED AT <------------------------ : ",
    time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      second: "numeric",
    })
  );
  next();
});

// -----------Login Api's--------------- //

router.route("/AdminLogin").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Logins.getAdminLogin(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/UserRegistration").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Logins.UserRegistration(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/UserLogin").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Logins.UserLogin(obj).then((data) => {
    res.status(201).json(data);
  });
});

// -----------Admin - Manage Hospital Api's--------------- //

router.route("/Category").get(async (req, res) => {
  await Admin.GetAllCategory().then((data) => {
    res.json(data);
  });
});

router.route("/Category").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Admin.AddCategory(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.put("/Category/:id", async (req, res, next) => {
  let obj = {
    ...req.body,
  };

  try {
    res.json(await Admin.UpdateCategory(obj, req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.delete("/Category/:id", async (req, res) => {
  res.json(await Admin.DeleteCategory(req.params.id));
});

router.route("/SubCategory").get(async (req, res) => {
  await Admin.GetAllSubCategory().then((data) => {
    res.json(data);
  });
});

router.route("/SubCategory/:CategotyID").get(async (req, res) => {
  await Admin.GetAllSubCategoryByCategory(req.params.CategotyID).then(
    (data) => {
      res.json(data);
    }
  );
});

router.route("/SubCategory").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Admin.AddSubCategory(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.put("/SubCategory/:id", async (req, res, next) => {
  let obj = {
    ...req.body,
  };

  try {
    res.json(await Admin.UpdateSubCategory(obj, req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.delete("/SubCategory/:id", async (req, res) => {
  res.json(await Admin.DeleteSubCategory(req.params.id));
});

router.route("/Products").get(async (req, res) => {
  await Admin.GetAllProducts().then((data) => {
    res.json(data);
  });
});

router.route("/Products").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Admin.AddProducts(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.put("/Products/:id", async (req, res, next) => {
  let obj = {
    ...req.body,
  };

  try {
    res.json(await Admin.UpdateProduct(obj, req.params.id));
  } catch (err) {
    console.error(`Error while Updating`, err.message);
    next(err);
  }
});

router.delete("/Products/:id", async (req, res) => {
  res.json(await Admin.DeleteProduct(req.params.id));
});

router.route("/Products/:CategoryID/:SubCategoryID").get(async (req, res) => {
  await Admin.GetAllProductsByCatSubCat(
    req.params.CategoryID,
    req.params.SubCategoryID
  ).then((data) => {
    res.json(data);
  });
});

router
  .route("/FilterDataForProduct/:CategoryID/:SubCategoryID")
  .get(async (req, res) => {
    await Admin.FilterDataForProduct(
      req.params.CategoryID,
      req.params.SubCategoryID
    ).then((data) => {
      res.json(data);
    });
  });

router.route("/ProductsFilter").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Admin.ProductsFilter(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/RegisteredUsers").get(async (req, res) => {
  await Admin.GetAllRegisteredUsers().then((data) => {
    res.json(data);
  });
});

router.route("/PlaceOrder").post(async (req, res) => {
  let obj = {
    ...req.body,
  };

  await Admin.PlaceOrder(obj).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/UserOrders/:UserID").get(async (req, res) => {
  await Admin.GetAllUserOrders(req.params.UserID).then((data) => {
    res.json(data);
  });
});

router.route("/AllOrder").get(async (req, res) => {
  await Admin.AllOrder().then((data) => {
    res.json(data);
  });
});

router.route("/UserProfile/:UserID").get(async (req, res) => {
  await Admin.GetUserProfile(req.params.UserID).then((data) => {
    res.json(data);
  });
});

// -------END----------------------------------------------------//

var port = process.env.PORT || 7755;

const server = app.listen(port, () =>
  console.log("API is runnning on port number : " + port)
);
