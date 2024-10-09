        firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("login-in.html")
    }else{
        document.getElementById("user").innerHTML = user.email
		document.getElementById("user2").innerHTML = user.email
		//console.log(user.uid)
		const Cuser = firebase.auth().currentUser;
		console.log(Cuser.email)
    }
})



function logout(){
    firebase.auth().signOut()
}

		
		

const content = document.querySelector('.content');
const delPost = document.querySelector('#delete');
const id = new URLSearchParams(window.location.search).get('id');

   
db.collection("comments").where("postId", "==", id)
    .onSnapshot((snapshot) => {
		 db.collection("posts").doc(id).update({comments: snapshot.size});
       
    });

const getPost = async ()=>{
    await db.collection('posts').doc(id).get().then(snap=>{
        const post = snap.data();
		var timestamp = (new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds/1000000)).toDateString()
        content.innerHTML = `
		<div class="post">
        <div class="post-author">
                    <img src="img-in/user-3.png" alt="">
                    <div>
                        <h2>${post.title}</h2>
                        <small>${timestamp}</small>
                        <small>${post.Uemail}</small>
						
                    </div>
                </div>
				<div Style="border-bottom: 1px solid #ccc;">
				</div>
                <p>${post.body}</p>
				
                <img src="img-in/post-image-1.png" width="100%">

                <div class="post-stats">
                    <div>
                        <img src="img-in/thumbsup.png">
                        <img src="img-in/love.png">
                        <img src="img-in/clap.png">
                        <span class="liked-user">Abhinav Mishra and 75 others</span>
                    </div>
                    <div>
                        <span id="poststs">${post.likes} likes &middot; ${post.comments}  comments &middot; 40 shares</span>
                    </div>
                </div>
                <div class="post-activity">
                    <div>
                        <img src="img-in/user-1.png" class="post-activity-user-icon">
                        <img src="img-in/down-arrow.png" class="post-activity-arrow-icon">
                    </div>

                    <div class="post-activity-link">
                         <i onclick="myLikeFunction(this)" class="thumbsup fa fa-thumbs-up"></i>
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
        `

        delPost.classList.add('active');
     })
}

window.addEventListener('DOMContentLoaded',getPost)
////

       

//var timestamp = firebase.firestore.FieldValue.serverTimestamp();
 var Uemail  ;

firebase.auth().onAuthStateChanged((user)=>{
    Uemail=user.email;
	
    
})    

function postComment( ) {
 // event.preventDefault();
  const commentText = editorData;
 // var commentime = firebase.firestore.FieldValue.serverTimestamp();  
  //var timestamp2 = new Date(commentime.seconds * 1000 + commentime.nanoseconds/1000000)
  // Get the current user
  //const user = firebase.auth().currentUser;

  //if (user && commentText) {
	  if (commentText) {
    // Store the comment in Firestore
    const commentRef = db.collection("comments");
    commentRef.add({
    //author: user.displayName,
    //authorId: user.uid,
    text: commentText,
    email: Uemail, // Replace with the actual post ID
	postId: id,
    timestamp:firebase.firestore.FieldValue.serverTimestamp() ,
    })
    .then(() => {
    // Clear the input field
 //  CKEDITOR.instances.editor1.setData() = "";
    // Display a success message or refresh the comments section
    })
   .catch(error => {
   console.error("Error adding comment: ", error);
   // Display an error message
   });
  }
   const updatePost = async ()=>{
				
			  await db.collection('posts').doc(id).get().then(snap=>{
				const post = snap.data();
				document.getElementById("poststs").innerHTML = `${post.likes} likes &middot; ${post.comments} comments &middot; 40 shares`
				
				})
			 }
   updatePost ()
}
//
function fetchComments(postId) {
  const commentsList = document.getElementById("comments-list");

  db.collection("comments")
    .where("postId", "==", postId)
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
     // commentsList.innerHTML = "";
	 //console.log(snapshot.size)
	  let list = ' ';
      snapshot.forEach(doc => {
        const comment = doc.data();
		if (comment.timestamp!=null){
        var timestamp2 = (new Date(comment.timestamp.seconds * 1000 + comment.timestamp.nanoseconds/1000000)).toDateString()
		 list += `<br>
		          <div class="post">
                   <div class="post-author">
                    <img src="img-in/user-3.png" alt="">
                    <div>
                        
                        <small>time : ${timestamp2}</small>
                        <small>${comment.email}</small>
						
                    </div>
                </div>
				<div Style="border-bottom: 1px solid #ccc;">
				</div>
                <p>${comment.text}</p>
				
                <img src="img-in/post-image-1.png" width="100%">

                <div class="post-stats">
                    <div>
                        <img src="img-in/thumbsup.png">
                        <img src="img-in/love.png">
                        <img src="img-in/clap.png">
                        <span class="liked-user">Abhinav Mishra and 75 others</span>
                    </div>
                    <div>
                        <span>100 likes &middot; 22 comments &middot; 40 shares</span>
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
      });
	  // list += '</ul>';
  commentsList.innerHTML = list;
    });
}

// Call the fetchComments function for the desired post
fetchComments(id);


//post likedby 
function postLikes(){
        //console.log(user.uid)
		const Cuser = firebase.auth().currentUser;
		console.log(Cuser)	
	
}
postLikes()
//detele post
function myLikeFunction(x) {
  x.classList.toggle("active");
  if (x.classList.contains('active')) { 
               
			   const updatePost = async ()=>{
				 await  db.collection("posts").doc(id).update({likes: firebase.firestore.FieldValue.increment(1)});
			    await db.collection('posts').doc(id).get().then(snap=>{
				const post = snap.data();
				document.getElementById("poststs").innerHTML = `${post.likes} likes &middot; ${post.comments} comments &middot; 40 shares`
				console.log(post.likes)
				})
			   }
			 updatePost () 
            } else { 
             
			 const updatePost = async ()=>{
				await db.collection("posts").doc(id).update({likes: firebase.firestore.FieldValue.increment(-1)});
			  await db.collection('posts').doc(id).get().then(snap=>{
				const post = snap.data();
				document.getElementById("poststs").innerHTML = `${post.likes} likes &middot; ${post.comments} comments &middot; 40 shares`
				console.log(post.likes)
				})
			 }
			 updatePost ()
            } 
}



const del = async () =>{
    await db.collection('posts').doc(id).delete().then(()=>{
        console.log('deleted')
    })
    
    window.location.replace('blog-in.html')
}

const del2 = async () =>{
    
    let batch = db.batch();

            const querySnapshot = await db.collection("comments").where("postId", "==", id).get();

            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit();
    
}
delPost.addEventListener('click',del);
delPost.addEventListener('click',del2);




		 
		 


          
