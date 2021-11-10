const { response } = require('express');

//Models
const Event = require('../models/Events');


/*------------------------ GET ------------------------------------*/

const getEvents = async (req, res = response) => {
    try {

        const events_query = await Event.find().populate('user', 'name'); //populate allow us to filter recieved data output every field

        if (!events_query) {
            return res.status(400).json({
                ok: false,
                msg: 'No query',
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'data recieved',
                events: events_query
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
        })
    }
}

/*------------------------ POST ------------------------------------*/

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid
        const eventSave = await event.save();

        return res.status(200).json({
            ok: true,
            evento: eventSave
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventID = req.params.id;

    try {

        const event_query = await Event.findById(eventID);

        if (!event_query) {
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exist'
            })
        }

        if (event_query.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User doesnt have privileges'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            evento: 'Event updated',
            eventUpdated: updateEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
            idError: eventID,
            uid: req.uid
        })
    }
}
const deleteEvent = async(req, res = response) => {

    const eventID = req.params.id;

    try {

        const event_query = await Event.findById(eventID);

        if (!event_query) {
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exist'
            })
        }

        if (event_query.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User doesnt have privileges'
            });
        }

        const deleteEvent = await Event.findByIdAndDelete(eventID);

        return res.status(200).json({
            ok: true,
            evento: 'Event deleted'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}