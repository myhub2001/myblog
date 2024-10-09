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





const blogs = document.getElementById("allposts");
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
	   var timestamp = new Date(post.timestamp.seconds * 1000 + post.timestamp.nanoseconds/1000000)
    templete = `
                                          <div>
										  <article class="blog-card">
                                         <div class="blog-img-container" data-id="${id}">
										  
                                          <p class="blog-date">${timestamp}</p>
										  
                                        </div>
										
                                        <!-- blog info -->
                                        <div class="blog-info">
                                            <div class="blog-title">
                                                <a href="#">
                                                    <h4>${post.title}</h4>
													
                                                </a>
												<a href="#">
                                                   
													<h4> ${post.Uemail}</h4>
                                                </a>
                                                <a href="#">
                                                    <p>blog category</p>
                                                </a>
                                            </div>
											
                                            <p>
                                                ${post.body.slice(0,200)}
                                            </p>
                                            <!-- blog footer -->
                                            <div class="blog-footer">
                                                <a href="">
                                                    <p>
                                                        <span><i class="fas fa-user"></i></span> Courses
                                                    </p>
                                                </a>
                                                <a href="#">
                                                    <a  href="postdetail.html?id=${id}">Read More...</a>
                                                </a>
                                            </div>
                                        </div>
                                    </article>
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
                                         