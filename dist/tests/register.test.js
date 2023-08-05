// test.ts
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Auth } from "../services/auth.js";
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};
beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
        value: localStorageMock,
    });
});
describe('registration', () => {
    afterEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
    });
    test('should register a new user', () => {
        const auth = new Auth();
        let email = 'admin@gamil.com';
        let pass = '123456789';
        expect(auth.userArray.length).toBe(0);
        expect(auth.register(email, pass)).toBe(true);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("users", JSON.stringify([{ "uid": 0, "mail": "admin@gamil.com", "password": "123456789", "status": 0 }]));
    });
    test('should not register, registered user', () => {
        const auth = new Auth();
        let email = 'admin@gamil.com';
        let pass = '123456789';
        expect(auth.userArray.length).toBe(0);
        expect(auth.register(email, pass)).toBe(true);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("users", JSON.stringify([{ "uid": 0, "mail": "admin@gamil.com", "password": "123456789", "status": 0 }]));
        expect(auth.userArray.length).toBe(1);
        expect(auth.register(email, pass)).toBe(false);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
        expect(localStorageMock.setItem).toHaveBeenCalledWith("users", JSON.stringify([{ "uid": 0, "mail": "admin@gamil.com", "password": "123456789", "status": 0 }]));
        expect(auth.userArray.length).toBe(1);
    });
});
