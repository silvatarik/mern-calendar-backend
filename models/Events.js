const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function () {

    //Extract every interested var to format in the interested way
    //in our case we want to delete __v and change_id to id.
    //in that case we extract both reassigned again

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    
    return object;
})

module.exports = model('Event', EventSchema);