export interface PotonganLainInterFace {
  _id: string;
  kode_toko: string;
  tgl_system: string;
  nama_pegawai: string;
  kode_pegawai: string;
  total_rp: number;
  cicil_rp: number;
  saldo_rp: number;
  qty_cicil_bulan: number;
  alasan: string;
  status: string;
  is_deleted: boolean;
  delete_by?: string;
  delete_date?: Date;
  input_by: string;
  input_date: Date;
}
