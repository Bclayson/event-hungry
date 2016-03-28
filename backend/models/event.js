var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventful_id: String,
    date: Date,
    user_id: Schema.Types.ObjectId
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;