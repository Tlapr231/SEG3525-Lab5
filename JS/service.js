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

    //this filter asked for 
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

    //this filter asked for 
    var filter = /^(\d{2})(\/)(\d{2})$/;
    var numbers = filter.exec(a);

  

    if (filter.test(a)) {
        if (parseInt(numbers[3]) > 12){ //if month is greater then 12
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

    //this filter asked for 
    var filter = /^\d{3,4}$/;
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
    return [ unavailableDates.indexOf(string) == -1 ]
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
        if(date.getDay() == 3 || date.getDay() == 5)
            return [false];
    }
    if (kody) {
        if(date.getDay() == 1)
            return [false];
    }

    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) == -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#inputTelephone4").on("change", function(){
        if (!validatePhone("inputTelephone4")){
            alert("Invalid phone number");
            $("#inputTelephone4").val("");
            $("#inputTelephone4").addClass("error");
        }
        else {
            $("#inputTelephone4").removeClass("error");
        }
    });

    // Card Number Validation, it calls validateCardNumber
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#inputCardNumber").on("change", function(){
        if (!validateCardNumber("inputCardNumber")){
            alert("Invalid card number");
            $("#inputCardNumber").val("");
            $("#inputCardNumber").addClass("error");
        }
        else {
            $("#inputCardNumber").removeClass("error");
        }
    });

    // Card Expiry Validation, it calls validateCardExpiry
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#inputExpiry").on("change", function(){
        if (!validateCardExpiry("inputExpiry")){
            alert("Invalid card expiry date");
            $("#inputExpiry").val("");
            $("#inputExpiry").addClass("error");
        }
        else {
            $("#inputExpiry").removeClass("error");
        }
    });

    // Card Expiry Validation, it calls validateCardCCV
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#inputCCV").on("change", function(){
        if (!validateCardCCV("inputCCV")){
            alert("Invalid card CCV");
            $("#inputCCV").val("");
            $("#inputCCV").addClass("error");
        }
        else {
            $("#inputCCV").removeClass("error");
        }
    });
    
    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#dateInput" ).datepicker(
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

    $( "#dateTimeInput" ).datepicker(
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


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });
  
    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
          "ui-tooltip": "highlight"
        }
      });


});