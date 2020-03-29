
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
        
        // Triggers custom event and map view has event listener that will display marker
        const evt = new CustomEvent("dispatch_event", {
            detail: {
                // TODO: these values need to from `data`  once the data contract has been decided
                lat: 49.882114,
                lng: -119.477829,
            },
            bubbles: true,
            cancelable: false,
        });
        document.getElementById("googleMap").dispatchEvent(evt);

        // Render a card displaying dispatch details
        $("#dispatches-list").append(
            `<li>
                <div class="card" style="margin-bottom: 10px;">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${data.location || "Unspecified"}
                        </p>
                    </header>
                    <div class="card-image">
                        <figure class="image is-4by3">
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
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Re-assign</a>
                        <a href="#" class="card-footer-item">Cancel</a>
                    </footer>
                </div>
            </li>`
        );
    });

});
