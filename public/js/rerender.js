// const { del } = require("request");

async function wait(sec) {
    await delay(sec);
}
$('#form-submit').click(() => {$.ajax({
    url: '/',
    type: 'POST',
    contentType: 'application/json',
    success: function (data) {
        setTimeout(() => { 
            alert('Your comment has been posted successfully, please reload window');
        }, 5000);
        // window.location.reload(true);
    }
});
return false;
});