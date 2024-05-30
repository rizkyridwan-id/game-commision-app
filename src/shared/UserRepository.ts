import BaseRepository from "@/shared/BaseRepository";
import { urlApi } from "@/utils";
import { FromDataUserDto } from "./FormDto";
export interface IUserRepository {
  getData(): Promise<any>;
  saveData(data: FromDataUserDto): Promise<any>;
}

export class UserRepository extends BaseRepository implements IUserRepository {
  public async getData() {
    return await this.get(urlApi.dataMaster.toko);
  }
  public async saveData(data: FromDataUserDto) {
    return await this.post<FromDataUserDto>(urlApi.dataMaster.toko, data);
  }
}
