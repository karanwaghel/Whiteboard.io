import React from "react";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";

const FontButtonStyle = `
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
function FontButtons() {
  const { setFontSize, FontSize } = useWhiteBoard();

  return (
    <>
      {/* <div className="w-full mb-1">
            <label className="text-[12px] w-full block">Font Family</label>
            <div className="flex items-center">
              <button
                className={FontButtonStyle}
                style={{ backgroundColor: "red" }}
                onClick={() => setColor("red")}
              />
              <button
                className={FontButtonStyle}
                style={{ backgroundColor: "blue" }}
                onClick={() => setColor("blue")}
              />
              <button
                className={FontButtonStyle}
                style={{ backgroundColor: "green" }}
                onClick={() => setColor("green")}
              />
              <Separator
                orientation="vertical"
                className="h-6 mx-2 bg-gray-400 mr-4"
              />
              <button
                className={FontButtonStyle}
                onClick={() => setshowpicker((prev) => !prev)}
                style={{
                  backgroundColor: Color,
                }}
              />
            </div>
          </div> */}

      {/* {Font size} */}

      <div>
        <div className="w-full mb-1">
          <label className="text-[12px] w-full block">Font Size</label>
          <div className="flex items-center">
            <button className={FontButtonStyle} style={{backgroundColor:FontSize === 10 ? "#85baf7" : null}} onClick={() => setFontSize(10)}>
              <h1>S</h1>
            </button>

            <button className={FontButtonStyle} onClick={() => setFontSize(14)}>
              <h1>M</h1>
            </button>
            <button className={FontButtonStyle} onClick={() => setFontSize(20)}>
              <h1>L</h1>
            </button>

            <button className={FontButtonStyle} onClick={() => setFontSize(26)}>
              <h1>Xl</h1>
            </button>
          </div>
        </div>
      </div>

      {/* text align*/}
      {/* <div style={{ display: Tool === "text" ? "none" : "visible" }}>
        <div className="w-full mb-1">
          <label className="text-[12px] w-full block">Text align</label>
          <div className="flex items-center">
            <button
              className={FontButtonStyle}
              onClick={() => setStrokeWidth(2)}
              style={{ background: StrokeWidth === 2 ? "#85baf7" : null }}
            >
              <Minus size={8} />
            </button>

            <button
              className={FontButtonStyle}
              onClick={() => setStrokeWidth(8)}
            >
              <Minus size={14} />
            </button>

            <button
              className={FontButtonStyle}
              onClick={() => setStrokeWidth(14)}
            >
              <Minus size={20} />
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default FontButtons;
