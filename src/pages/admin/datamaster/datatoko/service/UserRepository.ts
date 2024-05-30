import { DataTokoInterFace } from "@/interface";
import BaseRepository from "@/shared/BaseRepository";
import { urlApi } from "@/utils";

export class UserRepository extends BaseRepository<DataTokoInterFace> {
  constructor() {
    super();
    console.log("UserRepository");
  }

  public async getData() {
    // console.log("login");
    const data = await this.get(urlApi.dataMaster.toko);
    console.log(data);
    return data;
  }
}
