firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("login-in.html")
    }else{
        document.getElementById("user").innerHTML = user.email
		document.getElementById("user2").innerHTML = user.email
    }
})



function logout(){
    firebase.auth().signOut()
}





const blogs = document.getElementById("blog-in");
//const searchForm = document.querySelector('#search');

const renderPost = async (term) =>{
  await db.collection('posts').onSnapshot(snapshot=>{
      snapshot.docChanges().forEach(change=>{
          const type =  change.type;
          const id = change.doc.id;
          if(type === 'added'){
              showPost(change.doc.data(),id);
          }
      })
      })
  }


window.addEventListener('DOMContentLoaded',(e)=>renderPost());

const showPost = (post,id)=>{
    let templete ="";
   if(post){
	   var timestamp =( new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds/1000000)).toDateString()
    templete = `
   <div class="post">
                <div class="post-author">
                    <img src="img-in/user-3.png" alt="">
                    <div>
                        <h1>${post.title}</h1>
                        <small>${timestamp}</small>
                        <small>${post.Uemail}</small>
						
                    </div>
                </div>
				<div Style="border-bottom: 1px solid #ccc;">
				</div>
                <p>${post.body.slice(0,200)}</p>
				<div class="readmore">
				<small><a  href="details-in.html?id=${id}">...Read More</a></small>
				</div>
				<br>
                <img src="img-in/post-image-1.png" width="100%">
                 <br><br>
                <div class="post-stats">
                    <div>
                        <img src="img-in/thumbsup.png">
                        <img src="img-in/love.png">
                        <img src="img-in/clap.png">
                        <span class="liked-user">Abhinav Mishra and 75 others</span>
                    </div>
                    <div>
                        <span>${post.likes} likes &middot; ${post.comments} comments &middot; 40 shares</span>
                    </div>
                </div>
                <div class="post-activity">
                    <div>
                        <img src="img-in/user-1.png" class="post-activity-user-icon">
                        <img src="img-in/down-arrow.png" class="post-activity-arrow-icon">
                    </div>

                    <div class="post-activity-link">
                        <img src="img-in/like.png">
                        <span>Like</span>
                    </div>
                    <div class="post-activity-link">
                        <img src="img-in/comment.png">
                        <span>Comment</span>
                    </div>
                    <div class="post-activity-link">
                        <img src="img-in/share.png">
                        <span>Share</span>
                    </div>
                    <div class="post-activity-link">
                        <img src="img-in/send.png">
                        <span>Send</span>
                    </div>

                </div>
            </div>
   `;
   }

    blogs.innerHTML += templete;
}

// search will add later

// searchForm.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const term = searchForm.term.value;
//     console.log(term)
//     renderPost(term)
// });


 


 