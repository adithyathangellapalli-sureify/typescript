import { changeRoute } from "./routes/routes.js";

// import { logoutUser, getUserDetails } from "./handlers/dashboard";
// import { authenticateUser } from "./handlers/login.js";
// import { registerUser } from "./handlers/register";

localStorage.setItem('users', JSON.stringify([]));
localStorage.setItem('uid', '-1');
changeRoute('/');


// logoutUser();
// getUserDetails();
// authenticateUser();
// registerUser();