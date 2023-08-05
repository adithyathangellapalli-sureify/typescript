import { changeRoute } from "../routes/routes.js";
import { Auth } from "../services/auth.js";

export function logoutUser() {
    let authService = new Auth();
    authService.saveUidToDB(-1);
    changeRoute('/login');
}


export function getUserDetails() {
    let authService = new Auth();
    const userlabel = document.getElementById("usernamelabel") as HTMLLabelElement;
    let index = +(localStorage.getItem('uid') || -1);
    if (index >= 0) {
        userlabel.innerHTML = authService.userArray[index]?.mail || '';
    };

}