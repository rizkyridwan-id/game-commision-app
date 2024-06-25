import { PanelContent } from "@/components";
import { TableDataPegawai } from "../../datamaster";

const CetakMember = () => {
  return (
    <PanelContent title="Cetak Kartu Pegawai">
      <TableDataPegawai form="CetakKartuPegawai" />
    </PanelContent>
  );
};

export default CetakMember;
