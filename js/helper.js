/*

 This file contains all of the code running in the background that makes resumeBuilder.js possible. It contains helper functions that
 support the code to build the online resume.


 All statements in this 'js' file are enclosed in a self invoking anonymous function to avoid gloabl variable
 declarations. Variables from 'resumeBuilder.js' are accessed using the global namespace.
 */

"use strict";

(function () {

    var ns = MYRESUMEAPP; // Creating an alias for the global namespace.

    /*
     -- These are HTML strings. JavaScript functions in resumeBuilder.js replaces the following..
     -- %data% placeholder text with information from respective objects, image file names from
     -- the 'images' directory and url of the corresponding schools and online courses

     */

    ns.HTMLheaderName = '<h1 class="orange-text">%data% ';

    ns.HTMLheaderRole = '<small class="white-text">%data%</small></h1>';

    ns.HTMLlocation = '<h3 class="white-text"><img src="%data%">%data%</h3>';

    ns.HTMLbioPic = '<img src="%data%" class="biopic img-circle img-responsive" alt="Picture">';

    ns.HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

    ns.HTMLmobile = '<div class="row"><div class="col-lg-3 col-md-3 col-lg-offset-2 col-md-offset-2">' +
    '<span class="orange-text pull-right"><img src="%data%" alt="mobile icon"> mobile</span></div>' +
    '<div class="col-lg-7 col-md-7"><span class="white-text">%data%</span></div></div>';

    ns.HTMLemail = '<div class="row"><div class="col-lg-3 col-md-3 col-lg-offset-2 col-md-offset-2">' +
    '<span class="orange-text pull-right"><img src="%data%" alt="email icon"> email</span></div>' +
    '<div class="col-lg-7 col-md-7"><span class="white-text">%data%</span></div></div>';

    ns.HTMLgithub = '<div class="row"><div class="col-lg-3 col-md-3 col-lg-offset-2 col-md-offset-2">' +
    '<span class="orange-text pull-right"><img src="%data%" alt="github icon"> github</span></div>' +
    '<div class="col-lg-7 col-md-7"><span class="white-text">%data%</span></div></div>';


    ns.HTMLtwitter = '<div class="row"><div class="col-lg-3 col-md-3 col-lg-offset-2 col-md-offset-2">' +
    '<span class="orange-text pull-right"><img src="%data%" alt="twitter icon"> twitter</span></div>' +
    '<div class="col-lg-7 col-md-7"><span class="white-text">%data%</span></div></div>';

    ns.HTMLmobileFooter = '<div class="col-lg-3 col-md-3"><span class="orange-text"><img src="%data%"> mobile</span>' +
    '<span class="white-text">%data%</span></div>';

    ns.HTMLemailFooter = '<div class="col-lg-3 col-md-3"><span class="orange-text"><img src="%data%"> email</span>' +
    '<span class="white-text">%data%</span></div>';

    ns.HTMLgithubFooter = '<div class="col-lg-3 col-md-3"><span class="orange-text"><img src="%data%"> github</span>' +
    '<span class="white-text">%data%</span></div>';

    ns.HTMLtwitterFooter = '<div class="col-lg-3 col-md-3"><span class="orange-text"><img src="%data%"> twitter</span>' +
    '<span class="white-text">%data%</span></div>';

    ns.HTMLskillsStart = '<h3 id="skillsH3">Skills on a scale of 10</h3><ul id="skills" class="list-group"></ul>';

    ns.HTMLskills = '<li class="list-group-item dark-gray"><span class="badge orange-text">%data%</span>' +
    '<span class="white-text">%data%</span></li>';

    ns.HTMLworkStart = '<div class="work-entry"></div>';

    ns.HTMLworkEmployer = '<a href="#">%data%';

    ns.HTMLworkTitle = ' - %data%</a>';

    ns.HTMLworkDates = '<div class="date-text">%data%</div>';

    ns.HTMLworkLocation = '<div class="location-text">%data%</div>';

    ns.HTMLworkDescription = '<p><br>%data%</p>';

    ns.HTMLprojectStart = '<div class="project-entry"></div>';

    ns.HTMLprojectTitle = '<a href="%data%" target="_blank">%data%</a>';

    ns.HTMLprojectDates = '<div class="date-text">%data%</div>';

    ns.HTMLprojectDescription = '<p><br>%data%</p>';

    ns.HTMLschoolStart = '<div class="education-entry"></div>';

    ns.HTMLschoolName = '<a href="%data%" target="_blank">%data%';

    ns.HTMLschoolDegree = ' -- %data%</a>';

    ns.HTMLschoolDates = '<div class="date-text">%data%</div>';

    ns.HTMLschoolLocation = '<div class="location-text">%data%</div>';

    ns.HTMLschoolMajor = '<em><br>Major: %data%</em>';

    ns.HTMLonlineClasses = '<h3>Online Classes</h3>';

    ns.HTMLonlineTitle = '<a href="%data%" target="_blank">%data%';

    ns.HTMLonlineSchool = ' - %data%</a>';

    ns.HTMLonlineDates = '<div class="date-text">%data%</div>';

    ns.HTMLonlineURL = '<br><a href="%data%" target="_blank">%data%</a>';

    ns.googleMap = '<div id="map"></div>';

    /*
     The next few lines about clicks are for the Collecting Click Locations.
     */

    var clickLocations = [];

    function logClicks(x, y) {
        clickLocations.push(
            {
                x: x,
                y: y
            }
        );
        console.log('x location: ' + x + '; y location: ' + y);
    }

    $(document).click(function (loc) {
        var x = loc.pageX;
        var y = loc.pageY;

        logClicks(x, y);
    });


    /*
     The custom Google Map for the website with pins for all the locations in the resume is generated here.
     See the documentation below for more details.
     https://developers.google.com/maps/documentation/javascript/reference
     */
    var map;    // declares a global map variable

    /*
     Start here! initializeMap() is called when page is loaded.
     */
    function initializeMap() {

        var locations;

        var mapOptions = {
            disableDefaultUI: true,
            scaleControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DEFAULT,
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.SATELLITE
                ],
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        };

        // This next line makes `map` a new Google Map JavaScript Object and attaches it to
        // <div id="map">, which is appended as part of an exercise late in the course.
        map = new google.maps.Map(document.querySelector('#map'), mapOptions);


        /*
         locationFinder() returns an array of every location string from the JSONs
         written for bio, education, and work.
         */
        function locationFinder() {

            // initializes an empty array
            var locations = [];

            // adds the single location property from bio to the locations array
            locations.push(ns.bio.contacts.location);

            var i;

            // iterates through school locations and appends each location to
            // the locations array
            for (i = 0; i < ns.education.schools.length; i++) {
                locations.push(ns.education.schools[i].location);
            }

            // iterates through work locations and appends each location to
            // the locations array
            for (i = 0; i < ns.work.jobs.length; i++) {
                locations.push(ns.work.jobs[i].location);
            }

            // iterates through project locations and appends each location to
            // the locations array
            for (i = 0; i < ns.projects.projects.length; i++) {
                locations.push(ns.projects.projects[i].location);
            }

            return locations;
        }

        /*
         getDescriptionContent(placeName) returns the description of the corresponding location that was clicked
         from the locationDetails object available in resumeBuilder.js
         */
        function getDescriptionContent(placeName) {

            var propertyName = (placeName.split(",")[0]).toLowerCase();
            console.log(propertyName);

            return ns.locationDetails[propertyName];
        }

        /*
         createMapMarker(placeData) reads Google Places search results to create map pins.
         placeData is the object returned from search results containing information
         about a single location.
         */
        function createMapMarker(placeData) {

            // The next lines save location data from the search result object to local variables
            var lat = placeData.geometry.location.lat();  // latitude from the place service
            var lon = placeData.geometry.location.lng();  // longitude from the place service
            var name = placeData.formatted_address;   // name of the place from the place service
            var bounds = window.mapBounds;   // current boundaries of the map window
            var pinImage = {
                url: "images/redpin.png"//,
            };


            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
                map: map,
                position: placeData.geometry.location,
                title: name,
                icon: pinImage
            });

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            var infoWindow = new google.maps.InfoWindow({
                content: name
            });

            // add a 'mouse over' event to display a pop-up containing information about the pin
            google.maps.event.addListener(marker, 'mouseover', function () {
                infoWindow.open(map, marker);
            });

            // add a 'mouse out' event to close the pop-up when the mouse moves away from the pin
            google.maps.event.addListener(marker, 'mouseout', function () {
                infoWindow.close(map, marker);
            });

            // add a 'click' event to zoom in to the location when a pin is clicked and then
            // zoom back out after 10 seconds
            google.maps.event.addListener(marker, 'click', function () {

                infoWindow.close(map, marker); // Close the info window showing the name of the location

                // getting content for the description info window that is displayed when the map is zoomed in
                var contentString = getDescriptionContent(name);

                // new description window to show a short description of the location with a 'wikipedia' link
                var detailInfoWindow = new google.maps.InfoWindow({
                    content: contentString
                });

                // setting a 10 second timeout after which the map zooms out to show all the pins and
                // closes the description info window
                window.setTimeout(function () {
                    map.setZoom(2);
                    map.setCenter({lat: 35, lng: 340});
                    detailInfoWindow.close(map, marker);
                }, 10000);

                // opens the description info window and zooms in to the location of the pin that was clicked
                detailInfoWindow.open(map, marker);
                map.setZoom(12);
                map.setCenter(marker.getPosition());

            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
        }

        /*
         callback(results, status) makes sure the search returned results for a location.
         If so, it creates a new map marker for that location.
         */
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        /*
         pinPoster(locations) takes in the array of locations created by locationFinder()
         and fires off Google place searches for each location
         */
        function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);

            // Iterates through the array of locations, creates a search object for each location
            for (var i = 0; i < locations.length; i++) {

                // the search request object
                var request = {
                    query: locations[i]
                };

                // Actually searches the Google Maps API for location data and runs the callback
                // function with the search results after each search.
                service.textSearch(request, callback);

            }
        }

        // Sets the boundaries of the map based on pin locations
        window.mapBounds = new google.maps.LatLngBounds();

        // locations is an array of location strings returned from locationFinder()
        locations = locationFinder();

        // pinPoster(locations) creates pins on the map for each location in
        // the locations array
        pinPoster(locations);

    }

// Calls the initializeMap() function when the page loads
    window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
    window.addEventListener('resize', function () {
        // Make sure the map bounds get updated on page resize
        map.fitBounds(mapBounds);
    });
})();