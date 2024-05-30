import { IUserRepository } from "./UserRepository";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async getDataUser() {
    return await this.userRepository.getData();
  }
  public async storeDataToko() {
    return await this.userRepository.saveData({
      kode_toko: "123",
      nama_toko: "21312",
    });
  }
}
