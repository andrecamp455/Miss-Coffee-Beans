// Constants for valid login credentials
const validName = "Andre Campbell";
const validEmail = "andrecampbell645@gmail.com";
const validPassword = "andre@999";

//the login form submission
document.getElementById('loginform').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent form submission

    //the values from the form fields
    const enteredName = document.getElementById("name").value;
    const enteredEmail = document.getElementById("email").value;
    const enteredPassword = document.getElementById("password").value;

    // Check if the entered credentials match the valid ones
    if (enteredName === validName && enteredEmail === validEmail && enteredPassword === validPassword) {
        // Redirect to the product page if login is successful
        window.location.href = "Product_page.html";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById("error-message").style.display = "block";
    }
});

