const mongoose = require('mongoose')
const bcrpty = require('bcryptjs')
const Message = require('../model/messageschema');
const Conversationschema = new mongoose.Schema({

    members: {
        type: Array,
        required: true
    },
    last_message: {
        type: {
            message_id: {
                type: String,
                required: true
            },
            sender: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            hour: {
                type: Number,
                required: true
            },
            minute: {
                type: Number,
                required: true
            },
            second: {
                type: Number,
                required: true
            }
        }
    },
    all_messages: {
        type: [{
            message_id: {
                type: String,
                required: true
            },
            sender: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            hour: {
                type: Number,
                required: true
            },
            minute: {
                type: Number,
                required: true
            },
            second: {
                type: Number,
                required: true
            }
        }],
        required: true
    }

})


const mes = mongoose.model('Conversation', Conversationschema);
module.exports = mes;