import { useState } from "react";
import { maskText } from "./helpers";
import { toast } from "react-hot-toast";

interface Props {
  text: string;
}
const HiddenText = (props: Props) => {
  const [hidden, setHidden] = useState(true);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copy Success");
      },
      () => {
        // console.error("Failed to copy text: ", err);
        toast.error("Copy Failed");
      }
    );
  };
  return (
    <div
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      onClick={() => copyToClipboard(props.text)}
      style={{ cursor: "pointer" }}
    >
      {hidden ? maskText(props.text) : props.text}
    </div>
  );
};

export default HiddenText;
