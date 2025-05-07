const { Console } = require("console");
const fs = require("fs");
const uploadFile = require("../middleware/upload");
// const baseUrl = "https://zeus-admin.herokuapp.com/api/files/";
const baseUrl = "http://localhost:7765/api/files/";

// console.log(baseUrl);
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    console.log("req.file----------------->", req.file);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send(
      //   {
      //   message: "Uploaded the file successfully: " + req.file.originalname,
      // }
      req.file.originalname
    );
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
