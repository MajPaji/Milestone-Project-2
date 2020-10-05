// using EmailJS service for ordering section.
function sendMail(requestForm){

    // This will run just in case user wants to submit an empty shopping list
    if ($("#basket span:last-child").html() === " (0)"){
        alert("There is nothing in the shopping list!");
        return;
    }
    
    
    emailjs.send('gmail', 'template_ehew76m', {
               
        "tShirt_request": requestForm.innerText,
        "from_name": requestForm.name.value,
        "from_email": requestForm.emailaddress.value,
        
        })          
        
        .then(function(response) {
            $("#ordering-message").html(`<div class="ordering-message--success">SUCCESS!, Order complete. <br> Thank you for ordering!</div>`);
            $("#button-order").detach();
            }, function(error) {
            $("#ordering-message").html(`<div class="ordering-message--fail">Failed!, Sorry we did not receive your order!</div>`);
            });          

            return false;

}