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

	  	
var Uemail  ;

firebase.auth().onAuthStateChanged((user)=>{
    Uemail=user.email;
	
    
})
var timestamp = firebase.firestore.FieldValue.serverTimestamp();

const form = document.querySelector('form#create');
const createPost = async ()=>{
    const data = {
        title: form.title.value,
        body: editorData,
        likes: 0,
		Uemail : Uemail,
		timestamp: timestamp,
    }
    console.log('called')
    await db.collection('posts').add(data).then(()=>{
        console.log('added');
    }).catch(err=>console.log(err));

    window.location.replace('allposts.html')

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    createPost();
});