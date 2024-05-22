import { FunctionComponent, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface IProps {
  onChange: (input: string) => void;
  onKeyPress: (input: string) => void;
  keyboardRef: MutableRefObject<any>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  onKeyPress,
}) => {
  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      onChange={onChange}
      onKeyPress={onKeyPress}
      layout={{
        default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
      }}
      display={{
        "{bksp}": "⌫",
        "{enter}": "⏎",
      }}
      theme={"hg-theme-default hg-layout-default myTheme"}
      //   onRender={() => console.log("Rendered")}
    />
  );
};

export default KeyboardWrapper;
