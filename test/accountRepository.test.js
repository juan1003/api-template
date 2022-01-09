const { hash } = require("bcrypt");
const accountRepository = require('../account/accountRepository');

describe('Account Repository', () => {
    let accounts;

    beforeEach(async () => {
        const hashedPassword = await hash('pass1234', 15);

        await accountRepository.add({
            firstName: "Juan",
            lastName: "De Jesus",
            username: "jdejesus",
            password: hashedPassword
        });

        await accountRepository.add({
            firstName: "Nathan",
            lastName: "Ramirez",
            username: "nramirez",
            password: hashedPassword
        });

        accounts = await accountRepository.get();
    });

    it('should get two users', () => {
        expect(accounts.length).toEqual(2);
    });
});