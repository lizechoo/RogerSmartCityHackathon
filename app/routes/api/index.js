const express = require('express');
const router = express.Router();
const config = require("../../config");

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: config.pusher.appId,
    key: config.pusher.key,
    secret: config.pusher.secret,
    cluster: config.pusher.cluster,
    useTLS: config.pusher.useTLS,
});

router.post("/dispatch", (req, res) => {
    console.log("/dispatch endpoint called", req.body, "body end");
    // console.log("req headers", req.headers);

    const imgs = [
        "https://shawglobalnews.files.wordpress.com/2019/08/victoria-crash-e1566683791564.jpg?quality=70&strip=all",
        "https://cdn.cnn.com/cnnnext/dam/assets/151130053712-cars-china-traffic-levitate-vo-00001016-exlarge-169.jpg",
        "https://secure.i.telegraph.co.uk/multimedia/archive/03350/Motorycycle-crash-_3350623b.jpg",
    ];
    
    const severity = (req.body.numVictims[0]*1) + (req.body.numVictims[1]*3) + (req.body.numVictims[2]*2);
    const severityThreshold = 5;

    pusher.trigger("my-channel", "my-event", {
        location: req.body.address,
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
        img: imgs[Math.floor((Math.random() * 3))] || undefined,
        incidentType: "Collision",
        victims: req.body.victimTypesInvolved.join(" - "),
        severity: severity,
        isResponderDispatched: (severity >= severityThreshold) ? "Yes" : "No",
        time: new Date().toString(),
    });

    res.json({
        "message": (severity >= severityThreshold) ? "Dispatch successfully sent" : "Dispatch not required",
    });
});

module.exports = router;