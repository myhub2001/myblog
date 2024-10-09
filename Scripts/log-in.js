
document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})




firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("blog-in.html")
    }
})

function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function googleSignIn(){
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
      console.log(result);
      alert("Signed in with google");
      window.location = 'blog-in.html';
    }).catch(function(err){
      console.log(err);
      alert("Failed");
    });
  }




function forgotPass(){
    const email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}