// Prepare for render comments

db.collection("Posts").orderBy('Time').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderBlog(change.doc);
      } else if (change.type == "removed") {
        let li = blog_post_list.querySelector("[data-id=" + change.doc.id + "]");
        blog_post_list.removeChild(li);
      }
    });
  });


// Post Comment

let post_comment = document.querySelector("#form-submit");

post_comment.addEventListener('click',()=>{
    let name = document.querySelector("#name");
    let email =document.querySelector("email");
    let content = document.querySelector("#content");
    var date = new Date(Date.now());
    db.collection('Posts').add({
      Name: name.value,
      Email: email.value,
      Likes:0,
      Content : content.value,
      Time : date,
      id:specific_id
    });
    alert('Posted!')

})