export interface ParameterLemburInterFace {
  _id: string;
  kode_toko: string;
  jam_awal: string;
  jam_akhir: string;
  total: number;
  input_by: string;
  modified_by?: string;
  modified_date?: Date;
  status_aktif: boolean;
}
