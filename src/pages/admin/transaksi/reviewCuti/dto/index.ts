export interface ReviewCutiDto {
  _id: string;
  kode_pegawai: string;
  nama_pegawai: string;
  leave_description: string;
  status_validasi: "REJECT" | "APPROVE" | "OPEN";
  reject_description: string;
}
