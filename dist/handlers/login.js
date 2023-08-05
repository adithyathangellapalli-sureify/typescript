import { changeRoute } from "../routes/routes.js";
import { Auth } from "../services/auth.js";
export function authenticateUser() {
    let authService = new Auth();
    const email = document.getElementById("username");
    const password = document.getElementById("password");
    if (email.value && password.value && authService.validate(email.value, password.value)) {
        changeRoute('/dashboard');
    }
    else {
        alert('Invalid Credentials or User not Registered');
    }
}
