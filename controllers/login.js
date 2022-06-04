// Controller handler to handle functionality in home page

const Rooms = require("../models/User");

// Example for handle a get request at '/' endpoint.

function getLogin(request, response){
//   Rooms.find().lean().then(items => {
    response.render('login');
//   })
}

module.exports = {
    getLogin
};