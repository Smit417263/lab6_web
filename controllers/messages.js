const Chat = require("../models/Chats")

function getMessages(request, response){
    Chat.find({chat_id: request.params.roomName}).lean().then(items => {
        response.render('messages', {title: 'chatroom', roomName: request.params.roomName, chats: items});
    })
}

module.exports = {
    getMessages
};


// function(req, res){
//     Chat.find({chat_id: req.params.roomName}).lean().then(item => {
//         res.json(item)
//     })
// }