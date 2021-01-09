const accountRepository = require("./accountRepository");
const accountController = require("./accountController");
const { hash } = require("bcrypt");

const seedAccounts = async () => {
    try {
        const hashedPassword = await hash('pass1234', 15);
    
        const accounts = [
            {
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                fullName: "John Doe",
                username: "jdoe",
                password: hashedPassword
            },
            {
                avatar: "https://randomuser.me/api/portraits/women/45.jpg",
                fullName: "Linda Ackerman",
                username: "lAckerman",
                password: hashedPassword
            }
        ];
        
        const result = await accountRepository.loadAccounts(accounts);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

seedAccounts();

module.exports = {
    accountRepository,
    accountController
};