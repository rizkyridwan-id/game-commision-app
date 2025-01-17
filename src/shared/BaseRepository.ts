import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import logger from "./logger"; // Import logger global
import { VITE_APP_BE, generateSignature, getItem } from "@/utils";
import { ApiResponse, UserLoginInterFace } from "@/interface";

class BaseRepository {
  protected http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: VITE_APP_BE,
    });
  }

  private getConfig(params?: any): AxiosRequestConfig {
    const userData: UserLoginInterFace =
      getItem<UserLoginInterFace>("userdata");
    const timestamp = new Date().toISOString();
    const signature = generateSignature(timestamp);

    const config: AxiosRequestConfig = {
      headers: {
        timestamp: timestamp,
        signature: signature,
        Accept: "application/json",
        Authorization: userData.access_token
          ? `Bearer ${userData.access_token}`
          : undefined,
      },
      params: params,
    };

    return config;
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, number | string | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    try {
      const config = this.getConfig(params);
      const response = await this.http.get(endpoint, config);
      logger.log(`GET ${endpoint} berhasil`);
      return response.data;
    } catch (error) {
      logger.error(`Kesalahan dalam GET ${endpoint}: ${error}`);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: T): Promise<ApiResponse<T>> {
    try {
      const response = await this.http.post(endpoint, data);
      logger.log(`POST ${endpoint} berhasil`);
      return response.data;
    } catch (error) {
      logger.error(`Kesalahan dalam POST ${endpoint}: ${error}`);
      throw error;
    }
  }

  // Tambahkan metode lainnya sesuai kebutuhan
}

export default BaseRepository;
