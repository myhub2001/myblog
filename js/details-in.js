        var thisuser ;
		firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("login-in.html")
    }else{
        document.getElementById("user").innerHTML = user.email
		document.getElementById("user2").innerHTML = user.email
		//console.log(user.uid)
		 thisuser = firebase.auth().currentUser;
		//console.log(Cuser.email)
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
				<br>
                <div>${post.body}</div>
				
                

                <div class="post-stats">
                    <div>
                        
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
                   <div class="post-activity-link">
                        <img src="img-in/delete.png">
                        <button onclick="del(); del2();" id="delete" class="comment_del">Delete</button>
                    </div>
                </div>
            </div>
        `
       if(thisuser.uid != post.uid){
        document.getElementById("delete").setAttribute('disabled', true);
		document.getElementById("delete").classList.remove("comment_del");
		console.log(thisuser.uid)
		console.log(post.uid)
	   }
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
    authorId: thisuser.uid,
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
		console.log(doc.id)
		var myid =doc.id
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
				<br>
                <div>${comment.text}</div>
				
                

                <div class="post-stats">
                    <div>
                        
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
					<div class="post-activity-link">
                        <img src="img-in/delete.png">
                        <button id="delete2" value="${myid}" onclick="del_single_comment(this.value);"  class="comment_del">Delete</button>
                    </div>

                </div>
            </div>
		 `
		 if(thisuser.uid != comment.authorId){
        document.getElementById("delete2").setAttribute('disabled', true);
		document.getElementById("delete2").classList.remove("comment_del");
		console.log(thisuser.uid)
		console.log(post.uid)
	   };
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
   firebase.auth().onAuthStateChanged((user)=>{
    
		
	const cuser = firebase.auth().currentUser;
	const commentRef = db.collection("postslikes");
    commentRef.add({
    
    likeid: cuser.uid,
    
	postId: id,
    timestamp:firebase.firestore.FieldValue.serverTimestamp() ,
    })
    .then(() => {
    
    })
   .catch(error => {
   console.error("Error adding comment: ", error);
   // Display an error message
   });
		
		
    
})     
}

var cuser ;
 firebase.auth().onAuthStateChanged((user)=>{
    
		
  cuser = firebase.auth().currentUser;
 
 
 })

  async function del_single_comment(comment_id){
	
	 
	  await db.collection('comments').doc(comment_id).delete().then(()=>{
        //console.log(comment_id)
    }) 
}

const delike = async () =>{
	
	  console.log(cuser.uid)
	  let batch = db.batch();

      const querySnapshot = await db.collection("postslikes").where("postId", "==", id).where("likeid", "==", cuser.uid).get();

            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit();   
}

const likests = async () =>{
	
	  
	  

      const querySnapshot = await db.collection("postslikes").where("postId", "==", id).get();

            querySnapshot.forEach((doc) => {
              console.log(doc.data().likeid)  
			   console.log(cuser.uid)
			   if(doc.data().likeid==cuser.uid){
			   const likeicon = document.querySelector('.thumbsup');
			   likeicon.classList.toggle("active");
			}
            });

          
}
window.addEventListener('DOMContentLoaded',likests)
//detele post
function myLikeFunction(x) {
  x.classList.toggle("active");
  if (x.classList.contains('active')) { 
               postLikes();
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
             delike();
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





		 
		 


          
