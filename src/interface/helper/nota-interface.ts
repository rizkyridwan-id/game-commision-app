export interface NotaInterFace {
  isi: string;
  name: string;
  value: string;
  jenis: string;
  position_y: number;
  position_x: number;
  width: number;
  height: number;
  rotate: number;
  status?: boolean;
  is_show: boolean;
  type?: string;
  font_size?: number;
  font_family?: string;
  font_style?: string;
  is_deletable?: boolean;
}
