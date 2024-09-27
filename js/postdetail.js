        firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email
    }
})



function logout(){
    firebase.auth().signOut()
}

		
		

const content = document.querySelector('.content');
const delPost = document.querySelector('#delete');
const id = new URLSearchParams(window.location.search).get('id');

const getPost = async ()=>{
    await db.collection('posts').doc(id).get().then(snap=>{
        const post = snap.data();
		var timestamp = new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds/1000000)
        content.innerHTML = `
         <div class="detail" style="background:#f2f6fa">
                            
                            <div class="post-cat mt-5" >
                                <a href="#" class="btn">post category </a>
                                
                                <div class="meta mt-3 ">
                                    <a class="profile" href="#"><i class="fas fa-user ml-2"></i>
									  <br><small> ${post.Uemail}</small><br>
                                       
                                    </a> 
                                    <small>${timestamp}</small>
									
									<h1>${post.title}</h1>
                               <small>${post.likes} likes</small>
							   <hr>
                                </div>
                            </div>
                            <div class="article mt-3">
                                
                              <p>${post.body}</p>

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
}
//
function fetchComments(postId) {
  const commentsList = document.getElementById("comments-list");

  db.collection("comments")
    .where("postId", "==", postId)
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
     // commentsList.innerHTML = "";
	  let list = ' ';
      snapshot.forEach(doc => {
        const comment = doc.data();
		if (comment.timestamp!=null){
        var timestamp2 = new Date(comment.timestamp.seconds * 1000 + comment.timestamp.nanoseconds/1000000)
		 list += `
		 <br>
						 <li class="single_comment_area">
                                        <!-- Comment Content -->
                                        <div class="comment-content" style="background:#f2f6fa">
                                            <!-- Comment Meta -->
                                            <div class=" d-flex align-items-center justify-content-between">
                                                <p>
                                                    <i class="fas fa-user "></i> <a class="profile" href="#">
                                                        ${comment.email}</a><br>
														<small href="#" class="post-date"> ${timestamp2}</small>
														
                                                </p>
                                                <a href="#" class="comment-reply btn world-btn">Reply</a>
                                            </div>
											<hr>
                                            <p> ${comment.text}</p>
                                        </div>
                                    </li>
		 `;
		}
      });
	  // list += '</ul>';
  commentsList.innerHTML = list;
    });
}

// Call the fetchComments function for the desired post
fetchComments(id);
//detele post

const del = async () =>{
    await db.collection('posts').doc(id).delete().then(()=>{
        console.log('deleted')
    })
    
    window.location.replace('allposts.html')
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




                            
						 
									
									
									

		 
		