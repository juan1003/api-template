import AccountRepository from "../repositories/accountRepository";

export default class AccountService {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    return this;
  }

  async login(username: string, password: string): Promise<string> {
    return this.accountRepository.login(username, password);
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<string> {
    return this.accountRepository.register(email, username, password);
  }
}
