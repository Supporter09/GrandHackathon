const sign_in_btn = document.querySelector("#signin")

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   var displayName = user.displayName;
      var email = user.email;
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
      // ...
    //   window.location.href = "index.html"
    console.log("User Sign IN")
    } else {
      // User is signed out.
      // ...
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
            // ...
          });
    }else{
        alert("You haven't typed your data yet!")
    }

    
})