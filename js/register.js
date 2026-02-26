      let form = document.getElementById("registerForm");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmpassword").value;
        let nameError = document.getElementById("username_error");
        let emailError = document.getElementById("email_error");
        let passwordError = document.getElementById("password_error");
        let confirmpasswordError=document.getElementById("confirm_password_error")
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmpasswordError.textContent = "";
        let isValid = true;
        if (name.trim() === "") {
          nameError.textContent = "Username is required";
          isValid = false;
        } else if (name.length < 3) {
          nameError.textContent = "Username must be at leat 3 characters";
          isValid = false;
        }

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
        else if(confirmPassword!=password){
          confirmpasswordError.textContent ="Passwords does'nt match";
          isValid = false;
        }
        

        
        if (isValid) {
          let users=JSON.parse(localStorage.getItem("users")) || []
          
          let user={
            username:name,
            email:email,
            password:password
            };
            let emailExists=false
            for(let i=0;i<users.length;i++){
              if(users[i].email.toLowerCase()===user.email.toLowerCase()){
                emailExists=true
                break;
              }
            }
            if(emailExists==true){
              emailError.textContent ="Email already registered";
            }else{users.push(user)
              localStorage.setItem("users", JSON.stringify(users));
              alert("Registered successfully!");
            form.reset();
            }
            
            console.log(users)
            
            }
          
            });