$('.heart').click(async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    console.log(id);
    var likes = await db.collection('Posts').doc(`${id}`).get();
    likes = likes.data().likes;
	let likeNum = Number($('#likeNumber').html());
	document.getElementById('likeNumber').innerHTML = `${likeNum + 1}`;
    db.collection('Posts')
	    .doc(`${id}`)
	    .update({
		    likes: likes+1
	    })
	    .then(() => {
	    	console.log('likes added');
	    })
})
$('.comment').click(() => {
	$('html, body').animate({
		scrollTop: $(".comment").offset().top
	}, 500);
})
