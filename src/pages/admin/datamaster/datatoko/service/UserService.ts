import { UserRepository } from "./UserRepository";

export class UserService {
  // inject userRepository
  constructor(private readonly userRepository: UserRepository) {
    console.log("UserService");
  }

  public async getData() {
    const data = await this.userRepository.getData();
    // const userData = await this.userRepository.getUser();

    console.log(data);
    // return userData;
  }
}
