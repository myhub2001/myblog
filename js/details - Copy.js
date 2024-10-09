const content = document.querySelector('.content');
const delPost = document.querySelector('#delete');
const id = new URLSearchParams(window.location.search).get('id');

const getPost = async ()=>{
    await db.collection('posts').doc(id).get().then(snap=>{
        const post = snap.data();
        content.innerHTML = `
        <div class="post">
            <h2>${post.title}</h2>
			
            <small>${post.likes} likes</small>
            <p>${post.body}</p>
        </div>
        `

        delPost.classList.add('active');
     })
}

window.addEventListener('DOMContentLoaded',getPost)
////


document.getElementById('commentForm').addEventListener('submit', postComment);

function postComment(event) {
  event.preventDefault();
  const commentText = document.getElementById('commentInput').value;

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
    postId: id, // Replace with the actual post ID
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
    // Clear the input field
    document.getElementById("commentInput").value = "";
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
	 let list = '<ul>';
      snapshot.forEach(doc => {
        const comment = doc.data();
        
		 list += `<li><p> ${comment.text}</p></li>`;
      });
	   list += '</ul>';
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
    
    window.location.replace('index.html')
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