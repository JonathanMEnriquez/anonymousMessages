var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './anonApp', '/dist')));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/anonApp');

var messagesSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 3},
}, {timestamps: true});

mongoose.model('Messages', messagesSchema);
var Message = mongoose.model('Messages');

app.get('/api/messages', function(req, res) {
    Message.find({}, function(err, messages) {
        if (err) {
            console.log('get');
            console.log(err);
            res.json({message: "Error", errors: err});
        } else {
            res.json({message: "Successfully got all messages", data: messages})
        }
    })
})

app.post('/api/messages', function (req, res) {
    let newMessage = new Message(req.body);
    newMessage.save(function(err, message) {
        if (err) {
            console.log("validation errors", err);
            res.json({message: "Error", errors: err});
        } else {
            res.json({message: "Successfully created a message", data: message});
        }
    })
})

app.all('*', (req, res, next)=> {
    res.sendFile(path.resolve('./anonApp/dist/index.html'));
})

app.listen(8000, function() {
    console.log('listening on port 8000');
})