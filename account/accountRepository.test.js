const { hash } = require("bcrypt");
const accountRepository = require('./accountRepository');

describe('Account Repository', () => {
    let account1, account2, accounts;

    beforeEach(async () => {
        const hashedPassword = await hash('pass1234', 15);

        account1 = await accountRepository.add({
            firstName: "Juan",
            lastName: "De Jesus",
            username: "jdejesus",
            password: hashedPassword
        });

        account2 = await accountRepository.add({
            firstName: "Nathan",
            lastName: "Ramirez",
            username: "nramirez",
            password: hashedPassword
        });

        accounts = await accountRepository.get();
    });

    it('should get two users', () => {
        expect(accounts.length).toBeEqual(2);
    });
});