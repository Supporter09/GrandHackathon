const register_btn = document.querySelector("#signup");

register_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#pass").value;
    let re_pass = document.querySelector("#re_pass").value;
    let error = document.querySelector("#error");
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(re_pass);
    if (password == re_pass && name != "" && password != "") {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage)
        // ...
        });
        db.collection('user').add({
            name: name,
            email: email,
            image: ""
        })
    }else{
        error.innerHTML = "Your re_pass is diffrent from your pass !"
    }
    


})


