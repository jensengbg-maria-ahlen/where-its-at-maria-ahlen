const { Router } = require('express');
const router = new Router();

const { showEvent, getEvents, addTicket, getTicket } = require('../models/databases');
const { createID } = require('../models/generateid');

//Get all events from database
router.get('/getall', async (req, res) => {
    let resObj = {
        success: false
    }

    const events = await getEvents();

    if (events) {
        resObj.success = true;
        resObj.events = events;
    }

    res.send(JSON.stringify(resObj));
});


//Get chosen ticket from database
router.post('/getticket', async (req, res) => {
    const body = req.body;
    console.log('From backend, body :', body);
    
    let ticket = await getTicket(body);
    console.log('From backend, ticket :', ticket);

    let resObj = {
        eventid: ticket,
        eventName: ticket,
        city: ticket,
        date: ticket,
        from: ticket,
        to: ticket,
        id: ticket
    }

    res.send(JSON.stringify(resObj));
});

 
//Get single event from database
router.post('/showevent', async (req, res) => {
    const body = req.body;
    let ticket = await showEvent(body);

    let resObj = {
        eventid: ticket.eventid,
        eventName: ticket.eventName,
        city: ticket.city,
        date: ticket.date,
        from: ticket.from,
        to: ticket.to,
        price: ticket.price
    }    
    res.send(JSON.stringify(resObj));
});


//add single ticket and generate a ticketnumber to database
router.post('/addticket', async (req, res) => {
    const body = req.body;
    const generic = createID();
    const addticket = await addTicket(body.eventid, generic);


    let resObj = {
        eventid: addticket.eventid,
        eventName: addticket.eventName,
        city: addticket.city,
        date: addticket.date,
        from: addticket.from,
        to: addticket.to,
        id: addticket.id
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;