import { changeRoute } from "../routes/routes.js";
import { Auth } from "../services/auth.js";

export function registerUser() {

    const authService = new Auth();
    const email = document.getElementById("registerusername") as HTMLInputElement;
    const password = document.getElementById("registerpassword") as HTMLInputElement;
    const cpassword = document.getElementById("registercpassword") as HTMLInputElement;
    if (email.value && password.value && password.value === cpassword.value && authService.register(email.value, password.value)) {
        alert('Registration successfully login again to confirm');
        changeRoute('/login');
    }
    else {
        alert('Invalid Credentials or User not Registered');
    }
}
