import { useState } from "react";
import Teleprompter from "./components/Teleprompter";
import Controls from "./components/Controls";
import ScriptEditor from "./components/ScriptEditor";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [fontSize, setFontSize] = useState(48);
  const [mirrored, setMirrored] = useState(false);

  const [text, setText] = useState(
    "Good evening.\nThis is your teleprompter.\nEdit me."
  );

  const [offsetY, setOffsetY] = useState(0);

  return (
    <>
      <Teleprompter
        text={text}
        playing={playing}
        speed={speed}
        fontSize={fontSize}
        mirrored={mirrored}
        offsetY={offsetY}
        setOffsetY={setOffsetY}
      />

      <Controls
        playing={playing}
        setPlaying={setPlaying}
        speed={speed}
        setSpeed={setSpeed}
        fontSize={fontSize}
        setFontSize={setFontSize}
        mirrored={mirrored}
        setMirrored={setMirrored}
      />

      <ScriptEditor
        text={text}
        setText={setText}
        visible={!playing}
      />
    </>
  );
}
