/*

 -- This file contains objects, each with different properties - 'bio', 'work', 'project' and 'education'.
 -- All of these objects also contain a display function to display the other object members as part of
 -- the online resume.

 -- All statements in this 'js' file are enclosed in a self invoking anonymous function to avoid gloabl variable
 -- declarations. Variables from 'helper.js' are accessed using the global namespace.

 */

"use strict";

(function () {
    var ns = MYRESUMEAPP; // Creating an alias for the global namespace.

    /*
     -- replacePlaceHolder() is a helper function that replaces all the placeholder text in the HTML strings
     -- with the corresponding data from the 'bio, ''work', 'projects' and 'education' objects.
     -- The first argument is the string that needs to be replaced followed by the data that will replace the
     -- placeholder text.
     */
    function replacePlaceholder() {

        var stringToBeReplaced = arguments[0];
        var i = 1;

        while (i < arguments.length) {
            stringToBeReplaced = stringToBeReplaced.replace("%data%", arguments[i]);
            i++;
        }

        return stringToBeReplaced;
    }

    /*
     -- appendToResume(filter, contentArr) is a helper function that appends the contents of the contentArr
     -- to a 'div' in the index.html file specified by the filter.
     */
    function appendToResume(filter, contentArr) {

        for (var i = 0; i < contentArr.length; i++) {
            $(filter).append(contentArr[i]);
        }
    }

    /*
     -- The 'bio' object contains all the personal information that is displayed in the header section of the resume.
     */

    ns.bio = {
        "name": "Savitha Thiyagarajan",
        "role": "Web Developer",
        "contacts": {
            "mobile": "443-756-4022",
            "email": "tsavitha@gmail.com",
            "twitter": "@tsavitha",
            "github": "tsavitha",
            "location": "Raleigh, NC"
        },

        "pictureUrl": "images/savi.jpg",
        "welcomeMessage": "Hello! Welcome to my Online Resume. Thank you for taking the time to review my resume. " +
        "If you like my skill set or find a requirement that matches it and would like to contact me, you can reach me at... ",
        "skills": [
            {"technology": "ASP .NET", "rating": "6"},
            {"technology": "ASP .NET MVC", "rating": "6"},
            {"technology": "JS", "rating": "7"},
            {"technology": "jQuery", "rating": "5"},
            {"technology": "jQuery UI", "rating": "5"},
            {"technology": "jQuery Mobile", "rating": "4"},
            {"technology": "HTML", "rating": "8"},
            {"technology": "CSS", "rating": "8"},
            {"technology": "Bootstrap 3.x", "rating": "8"},
            {"technology": "XML", "rating": "7"}
        ]
    };

    /*
     -- display() function to display personal and contact information including skill set.
     -- The different placeholder text are replaced with the corresponding property values from the 'bio' object
     */

    ns.bio.display = function () {

        ns.HTMLbioPic = replacePlaceholder(ns.HTMLbioPic, ns.bio.pictureUrl);
        appendToResume('#picture', [ns.HTMLbioPic]); // adding picture to Resume

        ns.HTMLheaderName = replacePlaceholder(ns.HTMLheaderName, ns.bio.name);
        ns.HTMLheaderRole = replacePlaceholder(ns.HTMLheaderRole, ns.bio.role);
        appendToResume('#name', [ns.HTMLheaderName + ns.HTMLheaderRole]); // adding name and role to Resume


        ns.HTMLlocation = replacePlaceholder(ns.HTMLlocation, "images/home.png", ns.bio.contacts.location);
        appendToResume('#location', [ns.HTMLlocation]); // adding current location to Resume

        ns.HTMLWelcomeMsg = replacePlaceholder(ns.HTMLWelcomeMsg, ns.bio.welcomeMessage);
        appendToResume("#welcome-msg", [ns.HTMLWelcomeMsg]); // adding a message to Resume

        var headerFilter = "#headerContacts";
        var headerArr = [];

        headerArr.push(replacePlaceholder(ns.HTMLmobile, "images/phone.png", ns.bio.contacts.mobile));
        headerArr.push(replacePlaceholder(ns.HTMLemail, "images/email.png", ns.bio.contacts.email));
        headerArr.push(replacePlaceholder(ns.HTMLgithub, "images/github.png", ns.bio.contacts.github));
        headerArr.push(replacePlaceholder(ns.HTMLtwitter, "images/twitter.png", ns.bio.contacts.twitter));
        appendToResume(headerFilter, headerArr); // adding contact info to Resume header

        var footerFilter = "#footerContacts";
        var footerArr = [];

        footerArr.push(replacePlaceholder(ns.HTMLmobileFooter, "images/phone.png", ns.bio.contacts.mobile));
        footerArr.push(replacePlaceholder(ns.HTMLemailFooter, "images/email.png", ns.bio.contacts.email));
        footerArr.push(replacePlaceholder(ns.HTMLgithubFooter, "images/github.png", ns.bio.contacts.github));
        footerArr.push(replacePlaceholder(ns.HTMLtwitterFooter, "images/twitter.png", ns.bio.contacts.twitter));
        appendToResume(footerFilter, footerArr); // adding contact info to Resume footer


        var skillsFilter = "#skills";
        if (ns.bio.skills.length > 0) {
            appendToResume(skillsFilter, [ns.HTMLskillsStart]);
            var skillsArr = [];

            for (var i = 0; i < ns.bio.skills.length; i++) {
                skillsArr.push(replacePlaceholder(ns.HTMLskills, ns.bio.skills[i].rating, ns.bio.skills[i].technology));
            }
            appendToResume(skillsFilter, skillsArr); // adding skill set to Resume
        }

    };

    /*
     -- The 'work' object contains an array of current and past jobs.
     -- Each element of the array is an object that contains the job details.
     */

    ns.work = {
        "jobs": [
            {
                "employer": "Highbrow Technology Inc",
                "title": "Software Consultant",
                "location": "Raleigh, NC",
                "dates": "April 2011 - present",
                "description": "Working as a Software Consultant with 3 plus years of experience in ASP .NET technologies and Front-end Web " +
                "Development including JavaScript, jQuery and HTML/CSS."
            }
        ]
    };

    /*
     -- display() function to display Work details.
     -- The different placeholder text are replaced with the corresponding property values from the 'work' object
     */

    ns.work.display = function () {
        if (ns.work.jobs.length > 0) {
            for (var i = 0; i < ns.work.jobs.length; i++) {

                appendToResume('#work-content', [ns.HTMLworkStart]);

                var workEntryFilter = ".work-entry:last";
                var workArr = [];
                var formattedEmployer = replacePlaceholder(ns.HTMLworkEmployer, ns.work.jobs[i].employer);
                var formattedTitle = replacePlaceholder(ns.HTMLworkTitle, ns.work.jobs[i].title);

                workArr.push(formattedEmployer + formattedTitle);

                var formattedLocation = replacePlaceholder(ns.HTMLworkLocation, ns.work.jobs[i].location);
                var formattedDates = replacePlaceholder(ns.HTMLworkDates, ns.work.jobs[i].dates);
                var formattedDescription = replacePlaceholder(ns.HTMLworkDescription, ns.work.jobs[i].description);

                workArr.push(formattedDates + formattedLocation + formattedDescription);

                appendToResume(workEntryFilter, workArr); // adding work info to Resume
            }
        }

    };

    /*
     -- The 'projects' object contains an array of the different projects.
     -- Each element of the array is an object that contains the project details.
     */

    ns.projects = {
        "projects": [
            {
                "title": "Dominion Maps",
                "client": "Quanta Technology",
                "location": "Raleigh, NC",
                "dates": "Feb 2013 - present",
                "url": "http://quanta-technology.com/",
                "description": "Dominion Maps is an interactive mapping application developed in Silverlight for the Dominion power company. " +
                "It helps to visualize the live power loads and status of the substations in real time. The backend for the application was " +
                "housed in OpenPDC server. Infragistics mapping software components were used to display the shapefiles in the Silverlight " +
                "dashboard. Voltage, frequency and phasor magnitude of each substation was updated every second. The application was used by " +
                "the power station technicians in a giant panel of screens (120”)."
            },
            {
                "title": "Business Associates and Dealers Portal (BADP)",
                "client": "Independent Health",
                "location": "New York City, NY",
                "dates": "Jan 2012 - Feb 2013",
                "url": "https://www.independenthealth.com/",
                "description": "Independence Health is one of the nation's largest health care services companies. Its primary operations " +
                "include health insurance products for employer groups and Medicare beneficiaries. This project goal was to create a portal " +
                "for managing business associates and dealers for the management. It facilitates the business to instantly get information " +
                "from different data sources."
            },
            {
                "title": "E-Signature",
                "client": "Direct Mortgage Corporation",
                "location": "Midvale, UT",
                "dates": "April 2011 - Dec 2011",
                "url": "https://www.directcorp.com/",
                "description": "E-Signature is a DMC process to sign the PDF documents by the loan officer. The PDF documents are converted to " +
                "image format and sent to the browser for signing. The documents are verified page by page with watermark on it. The documents " +
                "which are not signed are sent back to the borrower for modification/ resubmission. A 50 page document can be easily loaded " +
                "asynchronously and can be signed page by page."
            }

        ]
    };

    /*
     -- display() function to display Project details.
     -- The different placeholder text are replaced with the corresponding property values from the 'project' object
     */

    ns.projects.display = function () {
        for (var i = 0; i < ns.projects.projects.length; i++) {

            appendToResume('#project-content', [ns.HTMLprojectStart]);

            var projectTitle = ns.projects.projects[i].title + " - " + ns.projects.projects[i].client + ", " + ns.projects.projects[i].location;
            var formattedTitle = replacePlaceholder(ns.HTMLprojectTitle, ns.projects.projects[i].url, projectTitle);
            var formattedDates = replacePlaceholder(ns.HTMLprojectDates, ns.projects.projects[i].dates);
            var formattedDescription = replacePlaceholder(ns.HTMLprojectDescription, ns.projects.projects[i].description);

            // adding a short description of the different projects to Resume
            appendToResume('.project-entry:last', [formattedTitle + formattedDates + formattedDescription]);

        }
    };

    /*
     -- The 'education' object contains a 'schools' array and an 'onlineCourses' array.
     -- Each of these array elements is an object that contains the details of the schools and online courses.
     */

    ns.education = {
        "schools": [
            {
                "name": "Johns Hopkins University",
                "location": "Baltimore, MD",
                "dates": "2000-2001",
                "degree": "MS",
                "major": "Computer Science",
                "url": "http://www.jhu.edu"
            },
            {
                "name": "Sri Venkateswara College of Engg",
                "location": "Chennai, India",
                "dates": "1994-1998",
                "degree": "BE",
                "major": "Computer Science and Engineering",
                "url": "http://www.svce.ac.in/"
            }
        ],
        "onlineCourses": [
            {
                "title": "Front-end Web Developer Nanodegree",
                "school": "Udacity",
                "dates": "December 2014",
                "url": "https://www.udacity.com/course/nd001"
            }
        ]
    };

    /*
     -- display() function to display Education details.
     -- The different placeholder text are replaced with the corresponding property values from the 'education' object.
     */

    ns.education.display = function () {

        for (var i = 0; i < ns.education.schools.length; i++) {

            appendToResume('#education-content', [ns.HTMLschoolStart]);

            var educationEntryFilter = ".education-entry:last";
            var formattedName = replacePlaceholder(ns.HTMLschoolName, ns.education.schools[i].url, ns.education.schools[i].name);
            var formattedDegree = replacePlaceholder(ns.HTMLschoolDegree, ns.education.schools[i].degree);
            var educationArr = [];

            educationArr.push(formattedName + formattedDegree);
            educationArr.push(replacePlaceholder(ns.HTMLschoolDates, ns.education.schools[i].dates));
            educationArr.push(replacePlaceholder(ns.HTMLschoolLocation, ns.education.schools[i].location));
            educationArr.push(replacePlaceholder(ns.HTMLschoolMajor, ns.education.schools[i].major));
            appendToResume(educationEntryFilter, educationArr); // adding school info to Resume
        }

        if (ns.education.onlineCourses.length > 0) {

            $(educationEntryFilter).append(ns.HTMLonlineClasses);

            for (i = 0; i < ns.education.onlineCourses.length; i++) {

                var formattedTitle = replacePlaceholder(ns.HTMLonlineTitle, ns.education.onlineCourses[i].url, ns.education.onlineCourses[i].title);
                var formattedSchool = replacePlaceholder(ns.HTMLonlineSchool, ns.education.onlineCourses[i].school);
                var formattedOnlineDates = replacePlaceholder(ns.HTMLonlineDates, ns.education.onlineCourses[i].dates);
                var formattedURL = replacePlaceholder(ns.HTMLonlineURL, ns.education.onlineCourses[i].url, ns.education.onlineCourses[i].url);
                var courseArr = [];

                courseArr.push(formattedTitle + formattedSchool);
                courseArr.push(formattedOnlineDates);
                courseArr.push(formattedURL);
                appendToResume(educationEntryFilter, courseArr); // adding online course info to Resume, if any
            }
        }
    };

    // locationDetails object has a property corresponding to each pin displayed on the map.
    // The value of the property is a short description of the corresponding location with a picture
    ns.locationDetails = {

        "chennai": '<div class="col-lg-8 col-md-8"><h1>City of Chennai</h1><hr><p>Chennai is the capital city of the ' +
        'Indian state of Tamil Nadu. Located on the Coromandel Coast off the Bay of Bengal, it is the biggest industrial ' +
        'and commercial centre in South India, and a major cultural, economic and educational centre. ' +
        '<a href="http://en.wikipedia.org/wiki/Chennai" target="_blank">Wikipedia</a> </p></div>' +
        '<div class="col-lg-4 col-md-4"><img class="desImage" src="images/chennai.jpg"></div>',

        "new york": '<div class="col-lg-8 col-md-8"><h1>New York City</h1><hr><p>New York – often called New York City or' +
        ' the City of New York to distinguish it from the State of New York, of which it is a part – is the most populous ' +
        'city in the United States and the center of the New York metropolitan area, the premier gateway for legal ' +
        'immigration to the United States. <a href="http://en.wikipedia.org/wiki/New_York_City" target="_blank">Wikipedia' +
        '</a></p></div><div class="col-lg-4 col-md-4"><img class="desImage" src="images/newyork.jpg"></div>',

        "raleigh": '<div class="col-lg-8 col-md-8"><h1>City of Raleigh</h1><hr><p> Raleigh is the capital of the state of' +
        ' North Carolina as well as the seat of Wake County in the United States. Raleigh is known as the "City of Oaks" ' +
        'for its many oak trees, which line the streets in the heart of the city. ' +
        '<a href="http://en.wikipedia.org/wiki/Raleigh,_North_Carolina" target="_blank">Wikipedia</a></p></div>' +
        '<div class="col-lg-4 col-md-4"><img class="desImage" src="images/raleigh.jpg"></div>',

        "baltimore": '<div class="col-lg-8 col-md-8"><h1>City of Baltimore</h1><hr><p>Baltimore is the largest city in ' +
        'the State of Maryland, the largest independent city in the United States, and the 26th-most populous city in ' +
        'the country. <a href="http://en.wikipedia.org/wiki/Baltimore" target="_blank">Wikipedia</a></p></div>' +
        '<div class="col-lg-4 col-md-4"><img class="desImage" src="images/baltimore.jpeg"></div>',

        "midvale": '<div class="col-lg-8 col-md-8"><h1>City of Midvale</h1><hr><p>Midvale is a city in Salt Lake County, ' +
        'Utah, United States. It is part of the Salt Lake City, Utah Metropolitan Statistical Area. The population was ' +
        '27,964 at the 2010 census. <a href="http://en.wikipedia.org/wiki/Midvale,_Utah" target="_blank">Wikipedia</a>' +
        '</p></div><div class="col-lg-4 col-md-4"><img class="desImage" src="images/midvale.jpg"></div>'
    };

    // Calling the display functions for each section of the resume.
    ns.bio.display();
    ns.work.display();
    ns.projects.display();
    ns.education.display();

    // Adding Google map with pins on locations in the resume
    $('#mapDiv').append(ns.googleMap);

})();