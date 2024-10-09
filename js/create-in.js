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

	  	
var Uemail  ;
var uid ;
firebase.auth().onAuthStateChanged((user)=>{
    Uemail=user.email;
	uid =user.uid;
	
    
})
var timestamp = firebase.firestore.FieldValue.serverTimestamp();

const form = document.querySelector('form#create');
const createPost = async ()=>{
    const data = {
        title: form.title.value,
        body: editorData,
        likes: 0,
		comments: 0,
		Uemail : Uemail,
		timestamp: timestamp,
		uid :uid,
    }
    console.log('called')
    await db.collection('posts').add(data).then(()=>{
        console.log('added');
    }).catch(err=>console.log(err));

    window.location.replace('blog-in.html')

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    createPost();
});