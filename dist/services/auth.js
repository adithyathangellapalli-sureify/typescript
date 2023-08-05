import { UserStatus } from "../types/enum.js";
export class Auth {
    constructor() {
        const usersData = localStorage.getItem('users');
        this.userArray = usersData ? JSON.parse(usersData) : [];
        this.uid = +(localStorage.getItem('uid') || -1);
    }
    saveToDB() {
        localStorage.setItem('users', JSON.stringify(this.userArray));
    }
    // retrivefromDB() {
    //     this.userArray = JSON.parse(localStorage.getItem('users') || '');
    // }
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
