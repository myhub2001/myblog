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
				<br>
                <p>${post.body.slice(0,200)}</p>
				<div class="readmore">
				<small><a  href="details-in.html?id=${id}">...Read More</a></small>
				</div>
				<br>
                
                 
                <div class="post-stats">
                    
                   
                </div>
                <div class="post-activity">
                  <div>
                       <small> <span>${post.likes} likes &middot; ${post.comments} comments &middot; 40 shares</span></small>
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


 


 