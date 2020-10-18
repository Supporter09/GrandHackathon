const sign_in_btn = document.querySelector("#signin")
//SOMETHING AT INDEX.HTML
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   var displayName = user.displayName;
      var email = user.email;
      var sign_up_btn = document.querySelector("#sign_up");
      sign_up_btn.innerHTML="Sign Out";
      sign_up_btn.setAttribute('href',"#");
      sign_up_btn.addEventListener('click',()=>{
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log("User SIGN OUT")
        }).catch(function(error) {
          // An error happened.
        });
      })
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
      // ...
    //   window.location.href = "index.html"
    var nav_list = document.querySelector("#main-menu")
    let user_name = document.createElement("li");
    let user_name_a = document.createElement("a");
    user_name_a.setAttribute("id","user_name");
    user_name_a.innerHTML = "Hello, "+ email + " !";
    user_name.appendChild(user_name_a)
    nav_list.appendChild(user_name);
    console.log("User Sign IN")
    } else {
      // User is signed out.
      // ...
      var sign_up_btn = document.querySelector("#sign_up");
      sign_up_btn.innerHTML="Sign In";
      sign_up_btn.setAttribute('href',"./sign_in");
      // var nav_list = document.querySelector("#main-menu");
      var user_name = document.querySelector("#user_name");
      user_name.remove()
      // nav_list.removeChild(user_name)
      
    }
  });

sign_in_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let your_mail = document.querySelector("#your_mail").value;
    let your_pass = document.querySelector("#your_pass").value;

    if (your_mail != "" && your_pass != "") {
        firebase.auth().signInWithEmailAndPassword(your_mail, your_pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorCode)
            // ...
          });
    }else{
        alert("You haven't typed your data yet!")
    }

    
}).then(
  window.location.href ="./"
)

//yến nhi, trang trần, thư