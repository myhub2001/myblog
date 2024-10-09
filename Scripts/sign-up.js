



document.getElementById("signupForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("blog-in.html")
    }
})


function signUp(){
    const email = document.getElementById("signupemail").value;
    const password = document.getElementById("signuppassword").value;
    const confirmpassword=document.getElementById("signupConfirmpassword").value;
    console.log(email)
    if(password===confirmpassword){
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res)=>{
            const user = firebase.auth().currentUser;
            // console.log(user)
        })
        .catch((error) => {
            document.getElementById("signuperror").innerHTML = error.message
        });
    }else{
        document.getElementById("signuperror").innerHTML = "Both passwords must match!!!"
    }
}

