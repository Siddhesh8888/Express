const express = require("express");
const router = express.Router();
const connection = require("../db/dbconnect");

router.get("/employees", function (req, resp) {
  connection.query("select * from employee", function (err, data, field) {
    if (err) {
      resp.status(500).send("no data found!!" + JSON.stringify(err));
    } else {
      resp.render("index", { empdata: data });
    }
  });
});

router.get("/displayaddform", function (req, resp) {
  resp.render("add-emp");
});

router.get("/insertEmployee", function (req, resp) {
  var empid = req.query.empid;
  var ename = req.query.ename;
  var sal = req.query.sal;
  connection.query(
    "insert into employee values(?,?,?)",
    [empid, ename, sal],
    function (err, result) {
      if (err) {
        resp.status(500).send("No data added!!" + JSON.stringify(err));
      } else {
        resp.redirect("/employees");
      }
    }
  );
});

router.get("/edit/:empid", function (req, resp) {
  console.log("empid: " + req.params.empid);
  connection.query(
    "select * from employee where empid=?",
    [req.params.empid],
    function (err, data, field) {
      if (err) {
        resp.status(500).send("No data found!!" + JSON.stringify(err));
      } else {
        resp.render("update-emp", { emp: data[0] });
      }
    }
  );
});

router.post("/updateEmployee", function (req, resp) {
  var empid = req.body.empid;
  var ename = req.body.ename;
  var sal = req.body.sal;

  connection.query(
    "update employee set ename=?, sal=? where empid=?",
    [ename, sal, empid],
    function (err, result) {
      if (err) {
        resp.status(500).send("data not updated.." + JSON.stringify(err));
      } else {
        resp.redirect("/employees");
      }
    }
  );
});

router.get("/delete/:empid", function (req, resp) {
  connection.query(
    "delete from employee where empid=?",
    [req.params.empid],
    function (err, result) {
      if (err) {
        resp.status(500).send("data not deleted...." + JSON.stringify(err));
      } else {
        resp.redirect("/employees");
      }
    }
  );
});

module.exports = router;
