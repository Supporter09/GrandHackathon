// window.onload = () => {
//   db.collection("Posts").orderBy('Time').onSnapshot((snapshot) => {
//     let changes = snapshot.docChanges();
//     changes.forEach((change) => {
//       if (change.type == "added") {
//         renderBlog(change.doc);
//       } else if (change.type == "removed") {
//         let li = blog_post_list.querySelector("[data-id=" + change.doc.id + "]");
//         blog_post_list.removeChild(li);
//       }
//     });
//   });


// // Post Comment

// let post_comment = $('#comment-form');

// $('#comment').submit((event)=>{
//     event.preventDefault();
//     let name = document.querySelector("#name");
//     let email =document.querySelector("email");
//     let content = document.querySelector("#content");
//     var date = new Date(Date.now());
//     db.collection('Posts').add({
//       name: name.value,
//       email: email.value,
//       likes:0,
//       content : content.value,
//       time : date,
//       // id:specific_id
//     }).then(() => {
//       alert('Posted!')
//     window.location.reload();
//     })
    
// })
// }
// // Prepare for render comments

