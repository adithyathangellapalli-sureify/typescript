// test.ts
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Auth } from "../services/auth.js";


const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};


beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
        value: localStorageMock,
    });
});


describe('login', () => {
    
    afterEach(() => {
        localStorageMock.setItem.mockClear();
        localStorageMock.getItem.mockClear();
    });
    test('validate a user with correct email and password', () => {
        const auth = new Auth();
        expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
        expect(localStorageMock.getItem).toHaveBeenCalledWith("users");
        expect(localStorageMock.getItem).toHaveBeenCalledWith("uid");

        let email = 'admin@gamil.com';
        let pass = '123456789';
        expect(auth.userArray.length).toBe(0);
        expect(auth.register(email, pass)).toBe(true);
        expect(auth.userArray.length).toBe(1);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("users", JSON.stringify([{ "uid": 0, "mail": "admin@gamil.com", "password": "123456789", "status": 0 }]));
        
        
        const result = auth.validate(email, pass);
        expect(result).toBe(true);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("uid", '0');

    });
    test('should not validate a user with incorrect email or password', () => {
        const auth = new Auth();
        expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
        expect(localStorageMock.getItem).toHaveBeenCalledWith("users");
        expect(localStorageMock.getItem).toHaveBeenCalledWith("uid");

        let email = 'admin@gamil.com';
        let pass = '123456789';
        expect(auth.userArray.length).toBe(0);
        expect(auth.register(email, pass)).toBe(true);
        expect(auth.userArray.length).toBe(1);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("users", JSON.stringify([{ "uid": 0, "mail": "admin@gamil.com", "password": "123456789", "status": 0 }]));
        


        const result1 = auth.validate(email, '1234567890');
        const result2 = auth.validate('admin123@gamil.com', pass);
        expect(result1).toBe(false);
        expect(result2).toBe(false);

    });
})