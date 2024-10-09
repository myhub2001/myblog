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





const blogs = document.querySelector('.blogs');
const searchForm = document.querySelector('#search');

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
	   var timestamp = new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds/1000000)
    templete = `
   <div class="posts" data-id="${id}">
       <h2>${post.title}</h2>
       <small>${post.likes} likes</small><br>
	   
	   <small>timestamp ${timestamp}</small><br>
	   
	   <small>user email ${post.Uemail}</small>
       <p>${post.body.slice(0,200)}</p>
       <a href="details.html?id=${id}">Read more</a>
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
