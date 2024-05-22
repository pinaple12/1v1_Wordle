import React from 'react';


// let myIdentity = undefined;

// async function loadIdentity(){
//     let identity_div = document.getElementById("identity_div");

//     try{
//         let identityInfo = await fetch(`/api/user/myIdentity`)
        
//         if(identityInfo.status == "loggedin"){
//             myIdentity = identityInfo.userInfo.username;
//             identity_div.innerHTML = `
//             <a href="/userInfo.html?user=${encodeURIComponent(identityInfo.userInfo.username)}">${identityInfo.userInfo.name} (${identityInfo.userInfo.username})</a>
//             <a href="signout" class="btn btn-danger" role="button">Log out</a>`;
//             if(document.getElementById("make_post_div")){
//                 document.getElementById("make_post_div").classList.remove("d-none");
//             }
//             Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.remove("d-none"))
//             Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.remove("d-none"));
//         } else { //logged out
//             myIdentity = undefined;
//             identity_div.innerHTML = `
//             <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
//             if(document.getElementById("make_post_div")){
//                 document.getElementById("make_post_div").classList.add("d-none");
//             }
//             Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.add("d-none"))
//             Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.add("d-none"));
//         }
//     } catch(error){
//         myIdentity = undefined;
//         identity_div.innerHTML = `<div>
//         <button onclick="loadIdentity()">retry</button>
//         Error loading identity: <span id="identity_error_span"></span>
//         </div>`;
//         document.getElementById("identity_error_span").innerText = error;
//         if(document.getElementById("make_post_div")){
//             document.getElementById("make_post_div").classList.add("d-none");
//         }
//         Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.add("d-none"));
//         Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.add("d-none"));
//     }
// }

const Login = () => {
  return (
    <div className="login-page">
    <h1>Login</h1>
    <div className="azure-auth-interface">
    <a href="http://localhost:3000/signin" >Log in</a>`
    </div>
  </div>
  )

};

export default Login;


// import React from 'react';
// import c useNavigate } from 'react-router-dom';

// const Login = ({ setUser }) => {
//     const navigate = useNavigate();

//     const loadIdentity = async () => {
//         try {
//             const response = await fetch(`/user/myIdentity`);
//             const identityInfo = await response.json();

//             if (identityInfo.status === "loggedin") {
//                 setUser(identityInfo.userInfo);
//                 navigate('/');
//             } else {
//                 setUser(null);
//                 alert("Login failed. Please try again.");
//             }
//         } catch (error) {
//             console.error('Error loading identity:', error);
//             setUser(null);
//             alert("An error occurred. Please try again.");
//         }
//     };

//     const handleLogin = async () => {
//         await loadIdentity();
//     };

//     return (
//         <div className="login-page">
//             <h1>Login</h1>
//             <div className="azure-auth-interface">
//                 <a href="/signin" className="btn btn-primary">Log in with Azure</a>
//             </div>
//         </div>
//     );
// };

// export default Login;

