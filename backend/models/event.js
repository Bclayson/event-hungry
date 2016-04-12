var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
    event_id: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;