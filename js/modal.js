/*
Modal.js
Project specific - launching and closing the contact modal, sending the api post
Author: Zach Moore - Zach@NerdVenture.net
*/ 

(function(){

    // Get the modal
    var modal = document.getElementById("contact-modal");

    // Get the button(s) that opens the modal
    var btns = document.getElementsByClassName('email-btn');

    // get the close button
    var closeBtn = modal.getElementsByClassName('close-btn')[0];

    // get the contact form
    var cform = document.getElementById('contact-form');

    // get the modal-content
    var modalContent = document.getElementById('modal-body');

    // this prevents accidental clicks that close the modal
    // like selecting and dragging outside the input to the background
    modalContent.addEventListener('click', function(event){
        event.stopPropagation();
    })

    // set onclick for each btn - to open the dialog
    var x = 0; //index
    for(x in btns){
        var btn = btns[x];
        btn.onclick = function(){
            modal.style.zIndex = 1;
            modal.style.opacity = 1;
            cform.reset();
        }
    }

    // When the user clicks on the close button, close the modal
    closeBtn.onclick = function() {
        modal.style.opacity = 0;
        modal.style.zIndex = -1;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = 0;
        modal.style.zIndex = -1;
    }
    }

    // sending email

    // get the send mail button
    // var sendMailBtn = document.getElementById('sendBtn');

    // on submit
    cform.addEventListener('submit', function(event){
        // prevent the default behavior of reloading the page
        event.preventDefault(); 

        // get the url from the hidden form input
        var url = document.getElementById('endpoint-url').value;

        // get the from email address
        var email = document.getElementById('email-input');

        // get the message
        var msg = document.getElementById('msg-input');

        // create the ajax request
        var xhttp = new XMLHttpRequest(); //AJAX

        // get the csrf token
        // var csrf = document.querySelector('meta[name="_csrf"]').content;
        console.log(document.querySelector('meta[name="_csrf"]').content);
        var csrftoken = Cookies.get('csrftoken');
        
        // data to send
        var data = {
            email : String(email),
            message: String(msg),
        };
      
        // AJAX
        //open async post request at endpoint
        try{
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.setRequestHeader('Accepts', 'application/json');
            xhttp.setRequestHeader("X-CSRFToken", csrftoken);
            xhttp.send(JSON.stringify(data));
      
            // loader.classList.remove('d-none');
            cform.setAttribute('disabled', true);
        }catch(e){
            console.log(e);
        }

        // once the ajax request has finished
        xhttp.addEventListener('load', function(event){
            cform.reset();
            cform.setAttribute('disabled', false);
            console.log(event);
        });

    });

    

})();