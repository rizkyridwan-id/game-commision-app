export interface UserLoginInterFace {
  access_token?: string;
  level?: string;
  refresh_token?: string;
  user_id?: string;
  user_name?: string;
  password?: string;
}

export interface RefresTokenInterFace {
  access_token: string;
  refresh_token: string;
}
