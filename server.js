/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-07-01 13:28:12
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-07-04 17:53:46
 */

var config = require("../../dbconfig");
const sql = require("mssql");

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "taabedar.apikit@gmail.com",
      pass: "rkmmmsihfpelganu",
    },
  })
);

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

async function forgotPassword(obj) {
  // obj -> EMPLOYEE_PKID, EMPLOYEE_EMAIL

  console.log("forgotPassword :", obj);
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EMPLOYEE_EMAIL", obj.EMPLOYEE_EMAIL)
      .query(
        "SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL"
      );

    if (result.recordsets[0].length > 0) {
      const resOtp = await generateOTP();

      var insertOTP = await pool
        .request()
        .input(
          "FORGET_PASSWORD_EMP_EMAIL",
          result.recordsets[0][0].EMPLOYEE_EMAIL
        )
        .input("FORGET_PASSWORD_OTP", resOtp)
        .input("FORGET_PASSWORD_ISACTIVE", "1")
        .query(
          `insert into FORGET_PASSWORD (FORGET_PASSWORD_OTP,FORGET_PASSWORD_ISACTIVE,FORGET_PASSWORD_EMP_EMAIL)  values(@FORGET_PASSWORD_OTP,@FORGET_PASSWORD_ISACTIVE,@FORGET_PASSWORD_EMP_EMAIL)`
        );
      console.log("OTP IS :", resOtp);
      if (insertOTP.rowsAffected == 1) {
        var mailOptions = {
          from: "taabedar.apikit@gmail.com",
          to: obj.EMPLOYEE_EMAIL,
          subject: "Forget Password OTP",
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="https://zeusbiotech.com/" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zeus Biotech Pvt Ltd</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p><b>Use the following OTP to complete your Account Recovery!</b></p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${resOtp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Zeus Biotech Pvt Ltd,</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p> Associate Companies:<p>

             <p> Zymo Nutrients Pvt Ltd<p>
             <p> Jaysons Agritech Pvt Ltd<p>
             <p> Zeus Feed Supplements Pvt Ltd<p>
              </div>
            </div>
          </div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("FORGOT_PASSWORD-->", error);
  }
}

async function checkOTP(obj) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("FORGET_PASSWORD_EMP_EMAIL", obj.FORGET_PASSWORD_EMP_EMAIL)
      .input("FORGET_PASSWORD_OTP", obj.FORGET_PASSWORD_OTP)
      .query(
        `SELECT MAX(FORGET_PASSWORD_PKID) FROM FORGET_PASSWORD WHERE FORGET_PASSWORD_OTP = @FORGET_PASSWORD_OTP AND FORGET_PASSWORD_EMP_EMAIL=@FORGET_PASSWORD_EMP_EMAIL 
        AND FORGET_PASSWORD_PKID = (SELECT MAX(FORGET_PASSWORD_PKID) FROM FORGET_PASSWORD WHERE FORGET_PASSWORD_EMP_EMAIL=@FORGET_PASSWORD_EMP_EMAIL)`
      );
    const xkimo = result.recordsets[0];

    const Ykimo = Object.values(xkimo[0]);
    console.log(Ykimo[0]);

    if (Ykimo[0] >= 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("checkOTP-->", error);
  }
}

async function ResetPassword(obj) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("EMPLOYEE_EMAIL", obj.EMPLOYEE_EMAIL)
      .input("NEW_PASSWORD", obj.NEW_PASSWORD)
      .query(
        `UPDATE EMPLOYEE_MASTER SET 
        EMPLOYEE_PASSWORD = @NEW_PASSWORD 
        WHERE EMPLOYEE_EMAIL =@EMPLOYEE_EMAIL`
      );

    let message = false;

    if (result.rowsAffected) {
      message = true;
    }

    return message;
  } catch (error) {
    console.log("ResetPassword-->", error);
  }
}

async function CheckOTPwithPassword(obj) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("OTP", obj.OTP)
      .input("EMPLOYEE_EMAIL", obj.EMPLOYEE_EMAIL)
      .input("NEW_PASSWORD", obj.NEW_PASSWORD)
      .query(
        `SELECT MAX(FORGET_PASSWORD_PKID) FROM FORGET_PASSWORD WHERE FORGET_PASSWORD_OTP = @OTP AND FORGET_PASSWORD_EMP_EMAIL=@EMPLOYEE_EMAIL 
        AND FORGET_PASSWORD_PKID = (SELECT MAX(FORGET_PASSWORD_PKID) FROM FORGET_PASSWORD WHERE FORGET_PASSWORD_EMP_EMAIL=@EMPLOYEE_EMAIL)`
      );
    const xkimo = result.recordsets[0];

    const Ykimo = Object.values(xkimo[0]);
    console.log(Ykimo[0]);

    if (Ykimo[0] >= 1) {
      let insertInto = await pool
        .request()
        .input("EMPLOYEE_EMAIL", obj.EMPLOYEE_EMAIL)
        .input("NEW_PASSWORD", obj.NEW_PASSWORD)
        .query(
          `UPDATE EMPLOYEE_MASTER SET 
          EMPLOYEE_PASSWORD = @NEW_PASSWORD 
          WHERE EMPLOYEE_EMAIL =@EMPLOYEE_EMAIL`
        );
      // .execute('InsertOrders');
      if (insertInto.rowsAffected == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return "0";
    }
  } catch (error) {
    console.log("CheckOTPwithPassword-->", error);
  }
}

async function ResetPasswordByOldPassword(obj) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EMPLOYEE_PKID", obj.EMPLOYEE_PKID)
      .input("OLD_PASSWORD", obj.OLD_PASSWORD)
      .input("NEW_PASSWORD", obj.NEW_PASSWORD)
      .query(
        `SELECT * FROM EMPLOYEE_MASTER WHERE EMPLOYEE_PKID=@EMPLOYEE_PKID AND EMPLOYEE_PASSWORD=@OLD_PASSWORD`
      );

    if (result.rowsAffected[0] > 0) {
      let insertInto = await pool
        .request()
        .input("EMPLOYEE_PKID", obj.EMPLOYEE_PKID)
        .input("OLD_PASSWORD", obj.OLD_PASSWORD)
        .input("NEW_PASSWORD", obj.NEW_PASSWORD)
        .query(
          `UPDATE EMPLOYEE_MASTER SET 
          EMPLOYEE_PASSWORD = @NEW_PASSWORD 
          WHERE EMPLOYEE_PKID =@EMPLOYEE_PKID`
        );

      if (insertInto.rowsAffected == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("ResetPasswordByOldPassword-->", error);
  }
}

async function forgotPasswordRequest(obj) {
  // obj -> EMPLOYEE_PKID, EMPLOYEE_EMAIL

  console.log("forgotPassword :", obj);
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("EMPLOYEE_EMAIL", obj.EMPLOYEE_EMAIL)
      .query(
        "SELECT * from EMPLOYEE_MASTER WHERE EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL"
      );

    if (result.recordsets[0].length > 0) {
      var insertOTP = await pool
        .request()
        .input(
          "FORGOT_PASSWORD_REQ_EMAIL",
          result.recordsets[0][0].EMPLOYEE_EMAIL
        )
        .input("FORGOT_PASSWORD_REQ_ACTIVE", "0")
        .query(
          `insert into FORGOT_PASSWORD_REQ (FORGOT_PASSWORD_REQ_EMAIL,FORGOT_PASSWORD_REQ_ACTIVE)  values(@FORGOT_PASSWORD_REQ_EMAIL,@FORGOT_PASSWORD_REQ_ACTIVE)`
        );
      if (insertOTP.rowsAffected == 1) {
        var mailOptions = {
          from: "taabedar.apikit@gmail.com",
          to: "jafaraftab15011@gmail.com",
          subject: "Forget Password Request",
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="https://zeusbiotech.com/" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zeus Biotech Pvt Ltd</a>
              </div>
              <p><b>Dear Admin!</b></p>
              <p><b>New forgot password request is sent by the employee, Please find the below email for more info.</b></p>
              <p><b>Email :</b>${obj.EMPLOYEE_EMAIL}</p>
              <p style="font-size:0.9em;">Regards,<br />Zeus Biotech Pvt Ltd,</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p> Associate Companies:<p>

             <p> Zymo Nutrients Pvt Ltd<p>
             <p> Jaysons Agritech Pvt Ltd<p>
             <p> Zeus Feed Supplements Pvt Ltd<p>
              </div>
            </div>
          </div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("FORGOT_PASSWORD-->", error);
  }
}

async function GetForgotPasswordRequest() {
  try {
    var pool = await sql.connect(config);

    var result = await pool
      .request()
      .query(
        "SELECT * FROM [FORGOT_PASSWORD_REQ] where FORGOT_PASSWORD_REQ_ACTIVE = 0"
      );

    return result.recordsets[0];
  } catch (error) {
    console.log("GetForgotPasswordRequest-->", error);
    //
  }
}

async function AcceptForgotPasswordRequest(obj) {
  try {
    let pool = await sql.connect(config);

    let up = await pool
      .request()
      .input(
        "FORGOT_PASSWORD_REQ_EMAIL",
        obj.EMPLOYEE_EMAIL
      )
      .input("FORGOT_PASSWORD_REQ_ACTIVE", "1")
      .query(
        `update FORGOT_PASSWORD_REQ set FORGOT_PASSWORD_REQ_ACTIVE = @FORGOT_PASSWORD_REQ_ACTIVE where FORGOT_PASSWORD_REQ_EMAIL=@FORGOT_PASSWORD_REQ_EMAIL`
      );

    if (up.rowsAffected > 1) {
      console.log("fds");
      var pass = await generateOTP();
      var insertOTP = await pool
        .request()
        .input(
          "EMPLOYEE_EMAIL",
          obj.EMPLOYEE_EMAIL
        )
        .input(
          "EMPLOYEE_PASSWORD",
          pass
        )
        .query(
          `update EMPLOYEE_MASTER set EMPLOYEE_PASSWORD = @EMPLOYEE_PASSWORD where EMPLOYEE_EMAIL=@EMPLOYEE_EMAIL`
        );

      if (insertOTP.rowsAffected == 1) {
        var mailOptions = {
          from: "taabedar.apikit@gmail.com",
          to: obj.EMPLOYEE_EMAIL,
          subject: "Forget Password Request",
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="https://zeusbiotech.com/" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Zeus Biotech Pvt Ltd</a>
              </div>
              <p><b>Dear Employee!</b></p>
              <p><b>As per your request your password has bean reseted, please find the below new password for login to your account.</b></p>
              <p><b>Email :</b>${obj.EMPLOYEE_EMAIL}</p>
              <p><b>Password :</b>${pass}</p>
              <p style="font-size:0.9em;">Regards,<br />Zeus Biotech Pvt Ltd,</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p> Associate Companies:<p>

             <p> Zymo Nutrients Pvt Ltd<p>
             <p> Jaysons Agritech Pvt Ltd<p>
             <p> Zeus Feed Supplements Pvt Ltd<p>
              </div>
            </div>
          </div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("FORGOT_PASSWORD-->", error);
  }
}

module.exports = {
  forgotPassword,
  checkOTP,
  ResetPassword,
  CheckOTPwithPassword,
  ResetPasswordByOldPassword,
  forgotPasswordRequest,
  GetForgotPasswordRequest,
  AcceptForgotPasswordRequest,
};
