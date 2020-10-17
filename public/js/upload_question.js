const btn = document.querySelector("#submit_button");
btn.addEventListener('click', (e)=>{
    // e.preventDefault();
    // let file_input = document.querySelector("#file")
    const file = document.querySelector('input[type=file]').files[0];
    const metadata = { contentType: 'image/jpeg' }; // or whatever you want
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`images/${file.name}`).put(file, metadata);
    
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      // If you want to show upload progress, do whatever you want with progress...
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, error => {
      console.log(error);
    }, () => {
      // upload finished with success, you can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(downloadURL);
        db.collection('images').add({
            img:downloadURL,
            id:specific_id
          });
    
      });
    });
    
  })