const accountRepository = require("./accountRepository.js");
const { hash } = require("bcrypt");

const seeder = async () => {
  const hashedPassword = await hash('pass1234', 15);

  const users = [
    {
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      fullName: "John Doe",
      username: "jdoe",
      password: hashedPassword
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      fullName: "Linda Ackerman",
      username: "lackerman",
      password: hashedPassword
    }
  ]

  const result = await accountRepository.loadAccounts(users);
  console.log("Accounts that had been seeded: " + users);
}

seeder();
