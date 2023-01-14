let getdata = localStorage.getItem("userdata");
let dataIntoJson = JSON.parse(getdata);

let loginUserEmail = document.getElementById("loginUserEmail");
let loginUserPass = document.getElementById("loginUserPass");
let loginBtn = document.getElementById("loginBtn");
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

let checkOnline = localStorage.getItem("onlineStatus");
if (checkOnline == 'true') {
  location = 'profile-page/profile.html'  
}

loginBtn.addEventListener("click", () => {
  if (dataIntoJson == null) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Invalid Email",
    });
  }
    let result = dataIntoJson.find((item) => item.Email == loginUserEmail.value);
  result ||
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Invalid Email",
    });
  
  if (loginUserEmail.value == "" || loginUserPass.value == "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "All fields are required",
    });
  } else if (result) {
    if (result.Email == loginUserEmail.value) {
      if (result.Password == loginUserPass.value) {
        localStorage.setItem('userOnline', result.id)
        localStorage.setItem('onlineStatus' , true)
        Swal.fire("Good job!", "Login Successful", "success");
        setTimeout(() => {
          location = 'profile-page/profile.html'
        }, 1200);
      } else {
        Swal.fire("Password Incorrect", "", "warning");
      }
    }
  }
});
