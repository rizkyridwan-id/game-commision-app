import { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<any>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onRender={() => console.log("Rendered")}
    />
  );
};

export default KeyboardWrapper;

// const [input, setInput] = useState("");
// const keyboard = useRef(null);
// <input
// value={input}
// placeholder={"Tap on the virtual keyboard to start"}
// />
// <KeyboardWrapper keyboardRef={keyboard} onChange={setInput} />
