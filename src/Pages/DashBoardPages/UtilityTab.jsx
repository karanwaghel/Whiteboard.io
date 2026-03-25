import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Separator } from "@/components/ui/separator";
import { Minus, SquareRoundCorner, Square } from "lucide-react";
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

const EdgesButtonStyle = `
  rounded-lg h-6 w-7 my-2
  bg-sky-50
  hover:scale-110
  hover:bg-[#b5d6fc]
  active:scale-95
  transition-transform
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
    Edges,
    setEdges,
    Elements,
  } = useWhiteBoard();

  const SelectedEl = selectedIndex !== null ? Elements[selectedIndex] : null;
  const SelectedTool = SelectedEl ? SelectedEl.Tool : null;

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

  const handleEdgesChange = (Edges) => {
    setEdges(Edges);
    patchSelected({ Edges: Edges });
  };

  const StrokeButtomMap = [
    { value: "#ff0000", bgColor: "#ff0000" },
    { value: "#00ff00", bgColor: "#00ff00" },
    { value: "#0000ff", bgColor: "#0000ff" },
  ];

  const BackGroundButtomMap = [
    { value: "#db8383", bgColor: "#db8383" },
    { value: "#7d60f2", bgColor: "#7d60f2" },
    { value: "#a1edaa", bgColor: "#a1edaa" },
  ];

  const StrokeWidthButtomMap = [
    { value: 2, iconSize: 8 },
    { value: 8, iconSize: 14 },
    { value: 14, iconSize: 20 },
    { value: 22, iconSize: 26 },
  ];

  const EdgesButtonMap = [
    { value: 0, icon: Square },
    { value: 22, icon: SquareRoundCorner },
  ];

  return (
    <>
      <div className="absolute top-[15%] left-4 w-44 h-80 transition-all duration-500 z-50">
        <div className="shadow-md shadow-black rounded-md p-2 flex flex-col items-start justify-start w-full h-full">
          {/* Stroke */}
          <div className="w-full mb-1">
            <label className="text-[12px] w-full block">Stroke</label>
            <div className="flex items-center">
              {StrokeButtomMap.map((btn, index) => (
                <button
                  key={index}
                  className={colorButtonStyle}
                  style={{ backgroundColor: btn.bgColor }}
                  onClick={() => handleColorChange(btn.value)}
                />
              ))}
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
                style={{ backgroundColor: Color,height:'26px', width:'26px'}}
              />
            </div>
          </div>

          {Tool === "text" || SelectedTool === "text" ? (
            <FontButtons />
          ) : (
            <div>
              {/* Background */}
              <div className="w-full mb-1">
                <label className="text-[12px] w-full block">Background</label>
                <div className="flex items-center">
                  {BackGroundButtomMap.map((btn, index) => (
                    <button
                      key={index}
                      className={colorButtonStyle}
                      style={{ backgroundColor: btn.bgColor}}
                      onClick={() => handleBgColorChange(btn.value)}
                    />
                  ))}
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
                    style={{ backgroundColor: backgroundColor,height:'26px', width:'26px'}}
                  />
                </div>
              </div>

              {/* Stroke Width */}
              <div className="w-full mb-1">
                <label className="text-[12px] w-full block">Stroke Width</label>
                <div className="flex items-center">
                  {StrokeWidthButtomMap.map((btn, index) => (
                    <button
                      key={index}
                      className={WidthsButtonStyle}
                      onClick={() => handleStrokeWidth(btn.value)}
                      style={{
                        background:
                          StrokeWidth === btn.value ? "#85baf7" : null,
                      }}
                    >
                      <Minus size={btn.iconSize} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* {Edges} */}
          <div>
            {(Tool === "square" || SelectedTool === "square") && (
              <div>
                <label className="text-[12px] w-full block">Edges</label>
                <div className="flex items-center">
                  {EdgesButtonMap.map((btn, index) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={index}
                        className={EdgesButtonStyle}
                        onClick={() => handleEdgesChange(btn.value)}
                        style={{
                          background: Edges === btn.value ? "#85baf7" : null,
                        }}
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
