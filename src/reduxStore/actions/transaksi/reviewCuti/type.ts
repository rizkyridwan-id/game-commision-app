import { PengajuanCutiInterFace } from "@/interface";

export enum ReviewPengajuanCutiType {
  GET_REVIEW_DATA_CUTI = "GET_REVIEW_DATA_CUTI",
}

export interface getReviewPengajuanCutiActionType {
  type: ReviewPengajuanCutiType.GET_REVIEW_DATA_CUTI;
  payload: {
    data: PengajuanCutiInterFace[];
    total: number;
  };
}

export interface ReviewPengajuanCutiState {
  data: PengajuanCutiInterFace[];
  total: number;
}
export type ReviewPengajuanCutiAction = getReviewPengajuanCutiActionType;
