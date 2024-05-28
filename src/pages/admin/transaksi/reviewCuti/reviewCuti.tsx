import { ModalGlobal, PanelContent } from "@/components";

import TableReviewCuti from "./table";
import { useAppSelector } from "@/reduxStore";
import FormReviewCuti from "./form";
const ReviewCuti = () => {
  const utility = useAppSelector((state) => state.utility);

  return (
    <PanelContent title="Review Cuti">
      <TableReviewCuti />
      <ModalGlobal
        namaForm="FormReviewCuti"
        title={`${utility.getModal.title}`}
        width={500}
      >
        <FormReviewCuti />
      </ModalGlobal>
    </PanelContent>
  );
};

export default ReviewCuti;
