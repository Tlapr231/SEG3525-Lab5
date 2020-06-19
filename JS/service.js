// J'ai utiliser le code de départ donner par "carolinebarriere" : https://github.com/carolinebarriere/carolinebarriere.github.io/blob/master/SEG3125-Module5-ValidatedService/scripts/service.js

// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;

    //this filter asked for (###)-###-#### or (###) ### #### (or diferent variation of the space or -)
    var filter = /^[(]{1}(\d{3})[)]{1}[ ,-]{0,1}(\d{3})[ ,-]{1}(\d{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCardNumber(card) {
    var a = document.getElementById(card).value;

    //this filter asked for #### #### #### #### or ####-####-####-#### (or diferent variation of the space or -)
    var filter = /^\d{4}[ ,-]\d{4}[ ,-]\d{4}[ ,-]\d{4}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCardExpiry(expiry) {
    var a = document.getElementById(expiry).value;

    //this filter asked for ##/##
    var filter = /^(\d{2})(\/)(\d{2})$/;
    var numbers = filter.exec(a);

    if (filter.test(a)) {
        if (parseInt(numbers[3]) > 12) { //if month is greater then 12
            return false;
        } else {
            return true;
        }
    }
    else {
        return false;
    }
}

function validateCardCCV(ccv) {
    var a = document.getElementById(ccv).value;

    //this filter asked for ### or ####
    var filter = /^\d{3,4}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateZip(zip) {
    var a = document.getElementById(zip).value;

    if (a.length <=5 ){
        //this filter asked for ##### (THIS IS THE AMERICAN FILTER)
        var filter = /^(\d{5})$/;
    } else {
        //this filter asked for W#W#W# or W#W #W# (THIS IS THE CANADIAN FILTER)
        var filter = /^(\w{1})(\d{1})(\w{1})( {0,1})(\d{1})(\w{1})(\d{1})$/;

    }
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = []
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0)
        return [false];
    if (date.getDay() == 6)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [unavailableDates.indexOf(string) == -1]
}

function disableDatesBySpecialist(date) {
    erwind = document.getElementById("Erwind").checked;
    conor = document.getElementById("Conor").checked;
    //Ellie works all days so she isnt needed here
    kody = document.getElementById("Kody").checked;

    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0 || date.getDay() == 6)
        return [false];

    if (erwind) {
        if (date.getDay() == 2 || date.getDay() == 4)
            return [false];
    }
    if (conor) {
        if (date.getDay() == 3 || date.getDay() == 5)
            return [false];
    }
    if (kody) {
        if (date.getDay() == 1)
            return [false];
    }

    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [unavailableDates.indexOf(string) == -1]
}

function isSubmitable() {
    //If no services are checked
    if (!document.getElementById("truing").checked && !document.getElementById("relpacement").checked && !document.getElementById("brake").checked && !document.getElementById("regular").checked && !document.getElementById("major").checked && !document.getElementById("clean").checked) {
        console.log("No services are Selected");
        return false;
    }
    //if a field in personal information is empty
    if (document.getElementById("inputFNamel4") === "" || document.getElementById("inputLName4") === "" || document.getElementById("inputTelephone4") === "" || document.getElementById("inputEmail4") === "" || document.getElementById("inputAddress") === "" || document.getElementById("inputCity") === "" || document.getElementById("inputZip") === "" || document.getElementById("inputProvince") === "Choose...") {
        console.log("Not all fields are filled out in the Personal Information tab");
        return false;
    }
    //if a field in Payment information is empty
    if (document.getElementById("inputCardNumber") === "" || document.getElementById("inputExpiry") === "" || document.getElementById("inputCardName") === "" || document.getElementById("inputCCV") === "") {
        console.log("Not all fields are filled out in the Personal Information tab");
        return false;
    }
    return true;
}

// HERE, JQuery "LISTENING" starts
$(document).ready(function () {

    // phone validation, it calls validatePhone
    $("#inputTelephone4").on("change", function () {
        if (!validatePhone("inputTelephone4")) {
            alert("Invalid phone number");
            $("#inputTelephone4").val("");
            $("#inputTelephone4").removeClass("bg-light");
            $("#inputTelephone4").addClass("bg-danger");
        }
        else {
            $("#inputTelephone4").removeClass("bg-danger");
            $("#inputTelephone4").addClass("bg-light");
        }
    });

    // zip validation, it calls validateZip
    $("#inputZip").on("change", function () {
        if (!validateZip("inputZip")) {
            alert("Invalid zip code");
            $("#inputZip").val("");
            $("#inputZip").removeClass("bg-light");
            $("#inputZip").addClass("bg-danger");
        }
        else {
            $("#inputZip").removeClass("bg-danger");
            $("#inputZip").addClass("bg-light");
        }
    });

    // Card Number Validation, it calls validateCardNumber
    $("#inputCardNumber").on("change", function () {
        if (!validateCardNumber("inputCardNumber")) {
            alert("Invalid card number");
            $("#inputCardNumber").val("");
            $("#inputCardNumber").removeClass("bg-light");
            $("#inputCardNumber").addClass("bg-danger");

        }
        else {
            $("#inputCardNumber").removeClass("bg-danger");
            $("#inputCardNumber").addClass("bg-light");
        }
    });

    // Card Expiry Validation, it calls validateCardExpiry
    $("#inputExpiry").on("change", function () {
        if (!validateCardExpiry("inputExpiry")) {
            alert("Invalid card expiry date");
            $("#inputExpiry").val("");
            $("#inputExpiry").removeClass("bg-light");
            $("#inputExpiry").addClass("bg-danger");

        }
        else {
            $("#inputExpiry").removeClass("bg-danger");
            $("#inputExpiry").addClass("bg-light");
        }
    });

    // Card Expiry Validation, it calls validateCardCCV
    $("#inputCCV").on("change", function () {
        if (!validateCardCCV("inputCCV")) {
            alert("Invalid card CCV");
            $("#inputCCV").val("");
            $("#inputCCV").removeClass("bg-light");
            $("#inputCCV").addClass("bg-danger");
        }
        else {
            $("#inputCCV").removeClass("bg-danger");
            $("#inputCCV").addClass("bg-light");
        }
    });

    //Filter the Calendar in the check hours section early in the website
    $("#dateInput").datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );

    //Filter the calender inside the schedule appointment
    $("#dateTimeInput").datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDatesBySpecialist
        }
    );

    // Accordian-Payment ToolTip activation
    $("#accordianPayment").on("mouseenter", function () {
        $("#accordianPayment").addClass("showInput");
    });

    $("#accordianPayment").on("mouseleave", function () {
        $("#accordianPayment").removeClass("showInput");
    });

    $("#accordianPayment").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    // Accordian-Specialist ToolTip activation
    $("#accordianSpec").on("mouseenter", function () {
        $("#accordianSpec").addClass("showInput");
    });

    $("#accordianSpec").on("mouseleave", function () {
        $("#accordianSpec").removeClass("showInput");
    });

    $("#accordianSpec").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    // Accordian-Payment-CCV Number ToolTip activation
    $("#ccvtooltip").on("mouseenter", function () {
        $("#ccvtooltip").addClass("showInput");
    });

    $("#ccvtooltip").on("mouseleave", function () {
        $("#ccvtooltip").removeClass("showInput");
    });

    $("#ccvtooltip").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#submitbtn").on("click", function () {
        if (!isSubmitable()) {
            alert("There is missing information");
        } else {
            alert("Your appointment has been successfully registered");
        }
    });


});