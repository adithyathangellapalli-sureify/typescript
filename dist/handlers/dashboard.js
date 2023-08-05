import { changeRoute } from "../routes/routes.js";
import { Auth } from "../services/auth.js";
export function logoutUser() {
    let authService = new Auth();
    authService.saveUidToDB(-1);
    changeRoute('/login');
}
export function getUserDetails() {
    var _a;
    let authService = new Auth();
    const userlabel = document.getElementById("usernamelabel");
    let index = +(localStorage.getItem('uid') || -1);
    if (index >= 0) {
        userlabel.innerHTML = ((_a = authService.userArray[index]) === null || _a === void 0 ? void 0 : _a.mail) || '';
    }
    ;
}
