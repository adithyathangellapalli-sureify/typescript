"use strict";
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["ACTIVE"] = 0] = "ACTIVE";
    UserStatus[UserStatus["INACTIVE"] = 1] = "INACTIVE";
    UserStatus[UserStatus["BLOCK"] = 2] = "BLOCK";
})(UserStatus || (UserStatus = {}));
localStorage.setItem('users', JSON.stringify([]));
localStorage.setItem('uid', '-1');
changeRoute('/');
class Auth {
    constructor() {
        this.userArray = JSON.parse(localStorage.getItem('users') || '');
        this.uid = +(localStorage.getItem('uid') || -1);
        // this.userArray = [];
    }
    saveToDB() {
        localStorage.setItem('users', JSON.stringify(this.userArray));
    }
    retrivefromDB() {
        this.userArray = JSON.parse(localStorage.getItem('users') || '');
    }
    saveUidToDB(uid) {
        localStorage.setItem('uid', uid.toString());
    }
    validate(email, pass) {
        const result = this.userArray.find(({ mail, password }) => (mail === email && password === pass));
        if (!result) {
            return false;
        }
        this.saveUidToDB(result.uid);
        return true;
    }
    register(email, pass) {
        if (!this.validate(email, pass)) {
            let userid = this.userArray.length;
            this.userArray.push({ uid: userid, mail: email, password: pass, status: UserStatus.ACTIVE });
            this.saveToDB();
            return true;
        }
        return false;
    }
}
function authenticateUser() {
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
function getUserDetails() {
    let authService = new Auth();
    const userlabel = document.getElementById("usernamelabel");
    let index = +(localStorage.getItem('uid') || -1);
    if (index >= 0) {
        userlabel.innerHTML = authService.userArray[index].mail;
    }
    ;
}
function logoutUser() {
    let authService = new Auth();
    authService.saveUidToDB(-1);
    changeRoute('/login');
}
function registerUser() {
    let authService = new Auth();
    const email = document.getElementById("registerusername");
    const password = document.getElementById("registerpassword");
    const cpassword = document.getElementById("registercpassword");
    if (email.value && password.value && password.value === cpassword.value && authService.register(email.value, password.value)) {
        alert('Registration successfully login again to confirm');
        changeRoute('/login');
    }
    else {
        alert('Invalid Credentials or User not Registered');
    }
}
function renderPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
        var contentDiv = document.getElementById('main-content');
        contentDiv.innerHTML = data;
    })
        .catch(error => {
        console.error('Error loading page:', error);
    });
}
function changeRoute(path) {
    switch (path) {
        case '/':
            renderPage('login.html');
            break;
        case '/register':
            renderPage('register.html');
            break;
        case '/login':
            renderPage('login.html');
            break;
        case '/dashboard':
            renderPage('dashboard.html');
            break;
        default:
            renderPage('login.html');
            break;
    }
}
