var connection = require("../config/connection.js");

// Object for all the SQL statement functions.
var orm = {
  //READ
  selectAll: function(cb) {
    var queryString = "SELECT * FROM burgers";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //CREATE
  insertOne: function(burger_name, cb) {
    var queryString = "INSERT INTO burgers (burger_name) VALUE (?)";
    console.log(queryString);
    connection.query(queryString, burger_name, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  
  //UPDATE
  updateOne: function(id, cb) {
    var queryString = "UPDATE burgers SET ? WHERE ?";
    console.log(queryString);
    connection.query(queryString, [{devoured: true}, {id: id}], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //DELETE
  delete: function(id, cb) {
    var queryString = "DELETE FROM burgers WHERE ?";
    connection.query(queryString, {id}, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;