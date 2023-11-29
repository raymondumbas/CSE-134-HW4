document.addEventListener("DOMContentLoaded", init);
let validName = false;
let validEmail = false;
let validComment = false;
//Initialize Home Page
function init(){
    let form_errors= [];
    const form = document.querySelector('form');
    const formSubmitted = document.getElementById("formSubmitted");
    form.setAttribute('novalidate',true);

    //Name Validation
    const onlyLetters = /^[a-zA-Z]+$/;
    const name = document.getElementById("name");
    const nameError = document.getElementById("formNameError");

    name.addEventListener("input", (event) => {
        formSubmitted.innerHTML = "";
        let nameValue = name.value.trim(); 
        if(nameValue === ""){
            validName = false;
            name.setCustomValidity("Please fill this out.");
            nameError.innerHTML = "Please fill this out.";

            form_errors.push({
                "field": "name",
                "error": "Value Missing"
            })
        }
        //Check RegEx
        else {
            if(!onlyLetters.test(nameValue)){
                validName = false;
                name.setCustomValidity("Please only use letters.");
                nameError.innerHTML = "Please only use letters.";

                form_errors.push({
                    "field": "name",
                    "error": "Unallowed characters"
                })
            }
            else{
                validName = true;
                name.setCustomValidity("");
                nameError.innerHTML = "";
            }
        }
    });

    //Email Validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("formEmailError");

    email.addEventListener("input", (event) => {
        formSubmitted.innerHTML = "";
        if(email.validity.valueMissing){
            validEmail = false;
            email.setCustomValidity("Please fill this out.");
            emailError.innerHTML = "Please fill this out.";

            form_errors.push({
                "field": "email",
                "error": "Value Missing"
            })
        }
        else if (email.validity.typeMismatch) {
            validEmail = false;
            email.setCustomValidity("Please give a valid email address.");
            emailError.innerHTML = "Please give a valid email address.";

            form_errors.push({
                "field": "email",
                "error": "Type Mismatch"
            })

        } else {
            validEmail= true;
            email.setCustomValidity("");
            emailError.innerHTML = "";
        }
    });

    //Comment Validation
    const comment = document.getElementById("comment");
    const commentError = document.getElementById("formCommentError");
    const commentInfo = document.getElementById("formCommentInfo");
    let currentRemaining = 0;
    comment.addEventListener("input", (event) => {
        formSubmitted.innerHTML = "";

        if(comment.validity.valueMissing){
            validComment = false;
            name.setCustomValidity("Please fill this out.");
            commentError.innerHTML= "Please fill this out.";

            form_errors.push({
                "field": "comment",
                "error": "Value Missing"
            })
        }
        else {
            validComment = true;
            comment.setCustomValidity("");
            currentRemaining = 361 - comment.value.length;
            commentInfo.innerHTML = "" + currentRemaining + " characters remaining.";
            if(361 - comment.value.length<50){
                commentError.innerHTML = "Approaching character limit.";
            }
            else{
                commentError.innerHTML = "";
            }
            
        }
    });
    //Submit Validation
    form.addEventListener("submit",function(event){
        event.preventDefault();
       
        
        const formErrorsJSON = JSON.stringify(form_errors);

        // Create FormData to send both form data and error data
        const formData = new FormData(this);
        formData.append('form-errors', formErrorsJSON);
      
        fetch(this.getAttribute('action'), {
          method: 'POST',
          body: formData
        })
          .then(response => {
          })
          .catch(error => {
          });

          //Reset form and set confirmation
          form.reset();
          formSubmitted.innerHTML = "Thank you for reaching out! I'll respond to you soon!"
          form_errors = [];
      });
     

}