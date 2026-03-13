import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Separator } from "@/components/ui/separator";
import { Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import FontButtons from "./UtilsButtons/FontButtons";

const colorButtonStyle = `
  rounded-lg h-6 w-6 my-2
  hover:scale-110
  active:scale-95
  transition-transform
  border-2 border-black
  mr-2
  `;

const WidthsButtonStyle = `
  rounded-lg h-6 w-6 my-2
  bg-sky-50
  hover:scale-110
  hover:bg-[#b5d6fc]
  active:scale-95
  transition-transform
  border-2 border-black
  mr-3
  active:bg-[#85baf7]
  focus:bg-[#85baf7]
  flex items-center justify-center
  `;

function UtilsTab() {
  const [showPicker, setshowpicker] = useState(false);
  const [showBgColorPicker, setshowBgColorPicker] = useState(false);
  const {
    Color,
    setColor,
    Tool,
    backgroundColor,
    setbackgroundColor,
    StrokeWidth,
    setStrokeWidth,
    Opacity,
    setOpacity,
    selectedIndex,
    setElements,
  } = useWhiteBoard();

  const patchSelected = (patch) => {
    if (selectedIndex !== null) {
      setElements((prev) =>
        prev.map((el, i) => (i === selectedIndex ? { ...el, ...patch } : el)),
      );
    }
  };

  const handleColorChange = (color) => {
    setColor(color);
    patchSelected({ Color: color });
  };

  const handleBgColorChange = (color) => {
    setbackgroundColor(color);
    patchSelected({ backgroundColor: color });
  };

  const handleOpacityChange = (value) => {
    setOpacity(value);
    patchSelected({ Opacity: value });
  };

  const handleStrokeWidth = (width) => {
    setStrokeWidth(width);
    patchSelected({ StrokeWidth: width });
  };

  return (
    <>
      <div
        className="absolute top-[15%] left-4 w-44 h-80 transition-all duration-500 z-50"
        style={{
          display:
            Tool === "eraser" || (Tool === "cursor" && selectedIndex === null)
              ? "none"
              : null,
        }}
      >
        <div className="shadow-md shadow-black rounded-md p-2 flex flex-col items-start justify-start w-full h-full">
          {/* Stroke */}
          <div className="w-full mb-1">
            <label className="text-[12px] w-full block">Stroke</label>
            <div className="flex items-center">
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "red" }}
                onClick={() => handleColorChange("#ff0000")}
              />
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "blue" }}
                onClick={() => handleColorChange("#0000ff")}
              />
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "#00ff00" }}
                onClick={() => handleColorChange("#00ff00")}
              />
              <Separator
                orientation="vertical"
                className="h-6 mx-2 bg-gray-400 mr-4"
              />
              <button
                className={colorButtonStyle}
                onClick={() => {
                  setshowpicker((prev) => !prev);
                  if (showBgColorPicker) setshowBgColorPicker(false);
                }}
                style={{ backgroundColor: Color }}
              />
            </div>
          </div>

          {Tool === "text" ? (
            <FontButtons />
          ) : (
            <div>
              {/* Background */}
              <div className="w-full mb-1">
                <label className="text-[12px] w-full block">Background</label>
                <div className="flex items-center">
                  <button
                    className={colorButtonStyle}
                    style={{ backgroundColor: "#db8383" }}
                    onClick={() => handleBgColorChange("#db8383")}
                  />
                  <button
                    className={colorButtonStyle}
                    style={{ backgroundColor: "#7d60f2" }}
                    onClick={() => handleBgColorChange("#7d60f2")}
                  />
                  <button
                    className={colorButtonStyle}
                    style={{ backgroundColor: "#a1edaa" }}
                    onClick={() => handleBgColorChange("#a1edaa")}
                  />
                  <Separator
                    orientation="vertical"
                    className="h-6 mx-2 bg-gray-400 mr-4"
                  />
                  <button
                    className={colorButtonStyle}
                    onClick={() => {
                      setshowBgColorPicker((prev) => !prev);
                      if (showPicker) setshowpicker(false);
                    }}
                    style={{ backgroundColor: backgroundColor }}
                  />
                </div>
              </div>

              {/* Stroke Width */}
              <div className="w-full mb-1">
                <label className="text-[12px] w-full block">Stroke Width</label>
                <div className="flex items-center">
                  <button
                    className={WidthsButtonStyle}
                    onClick={() => handleStrokeWidth(2)}
                    style={{ background: StrokeWidth === 2 ? "#85baf7" : null }}
                  >
                    <Minus size={8} />
                  </button>
                  <button
                    className={WidthsButtonStyle}
                    onClick={() => handleStrokeWidth(8)}
                    style={{ background: StrokeWidth === 8 ? "#85baf7" : null }}
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={WidthsButtonStyle}
                    onClick={() => handleStrokeWidth(14)}
                    style={{
                      background: StrokeWidth === 14 ? "#85baf7" : null,
                    }}
                  >
                    <Minus size={20} />
                  </button>
                  <button
                    className={WidthsButtonStyle}
                    onClick={() => handleStrokeWidth(22)}
                    style={{
                      background: StrokeWidth === 22 ? "#85baf7" : null,
                    }}
                  >
                    <Minus size={26} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Opacity */}
          <div className="w-full">
            <label className="text-[12px] w-full block mb-3">Opacity</label>
            <Slider
              value={[Opacity]}
              max={1}
              step={0.1}
              onValueChange={(value) => handleOpacityChange(value[0])}
            />
            <div className="flex justify-between pt-[3px]">
              <label className="text-[12px]">0</label>
              <label className="text-[12px]">100</label>
            </div>
          </div>
        </div>
      </div>

      {showPicker && (
        <div className="absolute z-10 top-36 left-52 p-4 rounded-2xl rounded-tl-none shadow-md shadow-black">
          <HexColorPicker color={Color} onChange={handleColorChange} />
        </div>
      )}

      {showBgColorPicker && (
        <div className="absolute z-10 top-52 left-52 p-4 rounded-2xl rounded-tl-none shadow-md shadow-black">
          <HexColorPicker
            color={backgroundColor}
            onChange={handleBgColorChange}
          />
          <HexColorInput
            className="border border-black rounded-md w-[10.5rem] mt-3 p-1"
            color={backgroundColor}
            placeholder="#ffffff"
            onChange={handleBgColorChange}
          />
        </div>
      )}
    </>
  );
}

export default UtilsTab;
