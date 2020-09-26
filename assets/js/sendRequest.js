function sendMail(requestForm){
    
    emailjs.send('gmail', 'template_ehew76m', {
               
        "tShirt_request": requestForm.innerText,
        "from_name": requestForm.name.value,
        "from_email": requestForm.emailaddress.value,
        
        })          
        
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            $("#ordering-message").html(`<div class="ordering-message--success">SUCCESS!, Thank you for ordering!</div>`);
            }, function(error) {
            console.log('FAILED...', error);
            $("#ordering-message").html(`<div class="ordering-message--fail">Failed!, Sorry we did not receive your order!</div>`);
            });

            return false;
}