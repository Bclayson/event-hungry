var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
    _id: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;