
$(document).ready(function() {
     // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("2be0eb411175134a82ca", {
        cluster: "us3",
        forceTLS: true
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function(data) {
        // alert(JSON.stringify(data));
        const evtId = Date.now();

        // Triggers custom event and map view has event listener that will display marker
        const evt = new CustomEvent("dispatch_event", {
            detail: {
                lat: data.lat,
                lng: data.lng,
                id: evtId,
            },
            bubbles: true,
            cancelable: false,
        });
        document.getElementById("googleMap").dispatchEvent(evt);

        // Render a card displaying dispatch details
        $("#incidents-list").append(
            `<li id=${evtId}>
                <div class="card" style="margin-bottom: 10px; border-radius: 10px">
                    <header class="card-header">
                        <a class="card-header-title" onclick="toggleBounce(${evtId})" style="border-radius: 10px">
                            ${data.location || "Unspecified"}
                        </a>
                    </header>
                    <div class="card-image">
                        <figure class="image is-3by2">
                            <img src=${data.img || "https://cdn.cnn.com/cnnnext/dam/assets/151130053712-cars-china-traffic-levitate-vo-00001016-exlarge-169.jpg"} alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <ul style="list-style-type: none;">
                            <li>
                                <b>Incident Type: </b> ${data.incidentType}
                            </li>
                            <li>
                                <b>Victims: </b> ${data.victims}
                            </li>
                            <li>
                                <b>Severity: </b> ${data.severity}
                            </li>
                            <li>
                                <b>Responder en route: </b> ${data.isResponderDispatched}
                            </li>
                        </ul>
                        <!-- <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a> -->
                        <br />
                            <time datetime="2016-1-1">${data.time}</time>
                        </div>
                    </div>
                    <footer class="card-footer" style="text-align: center;">
                        <a href="#" class="card-footer-item" style="border-radius: 10px">Re-assign</a>
                        <a href="#" class="card-footer-item" style="border-radius: 10px" onclick="removeMarker(${evtId})">Cancel</a>
                    </footer>
                </div>
            </li>`
        );
    });

});
