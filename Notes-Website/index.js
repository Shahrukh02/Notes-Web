
let userEmail = document.getElementById("userEmail");
let userName = document.getElementById("userName");
let userPass = document.getElementById("userPass");
let submitBtn = document.getElementById("submitBtn");
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g


let getdata = localStorage.getItem("userdata");
let dataIntoJson = JSON.parse(getdata);


localStorage.setItem('onlineStatus', false)
let checkOnline = localStorage.getItem("onlineStatus");
if (checkOnline == 'true') {
  location = 'profile-page/profile.html'  
}

submitBtn.addEventListener("click", () => {

  if (getdata) {

    let emptyEmailArr = [];
    dataIntoJson.forEach((e) => {
      emptyEmailArr.push(e.Email);
    });
    let checkDuplicateEmail = emptyEmailArr.indexOf(userEmail.value);
    if (checkDuplicateEmail == -1) {
      userCreate();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Email in use',
        
      })
    }
  } else if (
    userName.value == "" ||
    userEmail.value == "" ||
    userPass.value == ""
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'All fields are required',
    })
  } else if(emailRegex.test(userEmail.value))  {
    let obj = [
      {
        id: Date.now(),
        Name: userName.value,
        Email: userEmail.value,
        Password: userPass.value,
      },
    ];

    localStorage.setItem("userdata", JSON.stringify(obj));
    Swal.fire(
      'Good job!',
      'Account Created',
      'success'
    )
    setTimeout(() => {
      location= 'login.html'
    }, 1500);
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please Enter Valid Email Adress',
    })
  }
});


const userCreate = () => {
  if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
    Swal.fire({
  icon: 'error',
  title: 'Error',
  text: 'All fields are required',
})
  } else if(emailRegex.test(userEmail.value)){
    dataIntoJson.push({
      id: Date.now(),
      Name: userName.value,
      Email: userEmail.value,
      Password: userPass.value,
    });
    localStorage.setItem("userdata", JSON.stringify(dataIntoJson));
    Swal.fire(
      'Good job!',
      'Account Created',
      'success'
    )
    setTimeout(() => {
      location= 'login.html'
    }, 1500);
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please Enter Valid Email Adress',
    })
  }
  console.log(dataIntoJson);
};



