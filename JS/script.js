function getDayOfWeek() {
    var date = document.getElementById("dateInput").value;
    var badge = document.getElementById("day");
    var dayOfWeek ;

    if (date.length > 0){
        dayOfWeek = new Date(date);
        
        // I refred to the following web site for documentation on getDay() :: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay 
        if (dayOfWeek.getDay() > 0 && dayOfWeek.getDay() < 6) {
            badge.classList = "badge badge-pill p-2 m-1 badge-success";
            badge.innerText = "Available 8:00am - 4:00pm";
        } else {
            badge.classList = "badge badge-pill p-2 m-1 badge-warning";
            badge.innerText = "Closed";
        }
    } else {
        badge.classList = "badge badge-pill p-2 m-1 badge-secondary";
        badge.innerText = "Waiting...";
    }
}




// scroll tracking idea from https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
// When the user scrolls the page, execute myFunction
window.onscroll = function() {activateNavBar()};

function activateNavBar() {
    //curent scroll height of window
    var height = document.body.scrollTop || document.documentElement.scrollTop;

    //heigt of anchor elements
    var serviceHeight = document.getElementById("service").offsetTop - 2;
    var calendarHeight = document.getElementById("calendar").offsetTop - 2;
    var paymentHeight = document.getElementById("payment").offsetTop - 2;
    var locationHeight = document.getElementById("location").offsetTop - 2;
    var bookHeight = document.getElementById("book").offsetTop - 2;

    //navbar elements
    var service = document.getElementById("navService");
    var calendar = document.getElementById("navCalendar");
    var payment = document.getElementById("navPayment");
    var location = document.getElementById("navLocation"); 
    var book = document.getElementById("navBook");

    if (height >= bookHeight) {
        clearActive('b');
        if(!book.classList.contains("active")){
            book.classList.toggle("active");
        }
    } else if (height >= locationHeight){
        clearActive('l');
        if(!location.classList.contains("active")){
            location.classList.toggle("active");
        }
    } else if (height >= paymentHeight){
        clearActive('p');
        if(!payment.classList.contains("active")){
            payment.classList.toggle("active");
        }
    } else if (height >= calendarHeight){
        clearActive('c');
        if(!calendar.classList.contains("active")){
            calendar.classList.toggle("active");
        }
    } else if (height >= serviceHeight){
        clearActive('s');
        if(!service.classList.contains("active")){
            service.classList.toggle("active");
        }
    }
}

// the @char represents the tab I am on with one caracter (first letter of the tab name)
function clearActive(char) {

    var service = document.getElementById("navService");
    var calendar = document.getElementById("navCalendar");
    var payment = document.getElementById("navPayment");
    var location = document.getElementById("navLocation"); 
    var book = document.getElementById("navBook");

    //if I am not on the tab and the nav bar contains active, then i remove it (for all ifs here except for different tabs)
    if (service.classList.contains("active") && char !== 's'){
        service.classList = service.classList.toggle("active");
    }
    if (calendar.classList.contains("active") && char !== 'c'){
        calendar.classList = calendar.classList.toggle("active");
    }
    if (payment.classList.contains("active") && char !== 'p'){
        payment.classList = payment.classList.toggle("active");
    }
    if (location.classList.contains("active") && char !== 'l'){
        location.classList = location.classList.toggle("active");
    }
    if (book.classList.contains("active") && char !== 'b'){
        book.classList = book.classList.toggle("active");
    }

}
