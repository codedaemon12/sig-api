var path    = require("path");
var request = require('request');

var appRouter = function(app) {
    app.get("/", function(req, res) {
      res.send("Hello World");
  });
  app.get("/doc", function(req, res) {
    res.sendFile(path.join(__dirname+'/docupload-handler.html'));
});
  app.get("/account", function(req, res) {
      var accountMock = {
          "username": "nraboy",
          "password": "1234",
          "twitter": "@nraboy"
      }
      if(!req.query.username) {
          return res.send({"status": "error", "message": "missing username"});
      } else if(req.query.username != accountMock.username) {
          return res.send({"status": "error", "message": "wrong username"});
      } else {
          return res.send(accountMock);
      }
  });
  app.post("/account", function(req, res) {
      if(!req.body.username || !req.body.password) {
          return res.send({"status": "error", "message": "missing a parameter"});
      } else {
          return res.send({
            "message" :"nice job"
          });
      }
});
  app.post("/verify", function(req, res) {
      //console.log(req.body.SAMLResponse);
      var SAMLResponse = req.body.SAMLResponse;
      res.send(path.join(__dirname+'/docupload-handler.html?SAMLResponse='+SAMLResponse));
      // return res.send({
      //   "message" :"nice job"
      // });
      // if(!req.body.username || !req.body.password) {
      //     return res.send({"status": "error", "message": "missing a parameter"});
      // } else {
      //     return res.send({
      //       "message" :"nice job"
      //     });
      // }
  });
}

module.exports = appRouter;
