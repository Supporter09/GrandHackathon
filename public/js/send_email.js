
let user_subcribe_email = document.querySelector(".email-input")
let submit_button = document.querySelector(".submit-btn")
function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "nhatminhtq24@gmail.com",
	Password : "TheCoder2005",
	To : user_subcribe_email.value,
	From : "<nhatminhtq24@gmail.com>",
	Subject : "<Hi, We are Bone Student QnA team!>",
	Body : "<Glad to see you guys!>",
	}).then(
		message => alert("mail sent successfully")
	);
}
submit_button.addEventListener('click',(e)=>{
    e.preventDefault()
    sendEmail()
})
