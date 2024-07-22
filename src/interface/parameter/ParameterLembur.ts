export interface ParameterLemburInterFace {
  _id: string;
  kode_toko: string;
  jam_awal: string;
  jam_akhir: string;
  total_rp: number;
  input_by: string;
  modified_by?: string;
  modified_date?: Date;
  status_aktif: boolean;
}
