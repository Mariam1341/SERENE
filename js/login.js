    let form = document.getElementById("loginForm")
      form.addEventListener("submit",function(e){
      e.preventDefault();
      let email=document.getElementById("email").value
      let password=document.getElementById("password").value
       let emailError = document.getElementById("email_error");
        let passwordError = document.getElementById("password_error");
        emailError.textContent = "";
        passwordError.textContent = "";
        let isValid = true;

        if (email.trim() === "") {
          emailError.textContent = "Email is required";
          isValid = false;
        } else if (!email.includes("@") || !email.includes(".")) {
          emailError.textContent = "Email format is not valid";
          isValid = false;
        }
        if (password.trim() === "") {
          passwordError.textContent = "Password is required";
          isValid = false;
        } else if (password.length < 8) {
          passwordError.textContent = "Password must be at least 8 characters";
          isValid = false;
        }
          if (!isValid) return;
          
          if (email === "admin@gmail.com" && password==="admin123"){
           window.location.href="adminDashboard.html"
          }
        
          let users=JSON.parse(localStorage.getItem("users")) || []

          let foundUser = null;

          for(let i=0;i<users.length;i++){
              if(users[i].email.toLowerCase()===email.toLowerCase()){
                foundUser=users[i]
                break;
              }
          }
          if(!foundUser){
            emailError.textContent="Email not registered";
          }
          else if(foundUser.password!== password){
            passwordError.textContent="Wrong password";
          }
          else{
            localStorage.setItem("currentUser",foundUser.email);
            localStorage.setItem("isLoggedIn", "true")
            form.reset();
            window.location.href="home.html"

          }
    })
    