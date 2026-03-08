import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Separator } from "@/components/ui/separator";

const colorButtonStyle = `
  rounded-lg h-6 w-6 my-3
  hover:scale-110
  active:scale-95
  transition-transform
  border-2 border-black
  mr-2
  `;

function UtilsTab() {
  const [showPicker, setshowpicker] = useState(false);
  const { Color, setColor, Tool, backgroundColor, setbackgroundColor } =
    useWhiteBoard();

  return (
    <>
      <div
        className="absolute top-[15%] left-4 w-44 h-60 transition-all duration-500 z-50"
        style={{ display: Tool === "eraser" ? "none" : null }}
      >
        <div className="shadow-md shadow-black rounded-md p-2 flex flex-col items-start justify-start w-full h-full">
          {/* {Color} */}
          <div className="w-full ">
            <label className="text-[12px] w-full block">Stroke</label>
            <div className="flex items-center">
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "red" }}
                onClick={() => setColor("red")}
              />
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "blue" }}
                onClick={() => setColor("blue")}
              />
              <button
                className={colorButtonStyle}
                style={{ backgroundColor: "green" }}
                onClick={() => setColor("green")}
              />
              <Separator
                orientation="vertical"
                className="h-6 mx-2 bg-gray-400 mr-4"
              />
              <button
                className={colorButtonStyle}
                onClick={() => setshowpicker((prev) => !prev)}
                style={{
                  backgroundColor: Color,
                }}
              />
            </div>
          </div>
          {/* {backgroundColor} */}
          <div>
            <div className="w-full">
              <label className="text-[12px] w-full block">Background</label>
              <div className="flex items-center">
                <button
                  className={colorButtonStyle}
                  style={{ backgroundColor: "#db8383" }}
                  onClick={() => setbackgroundColor("#db8383")}
                />
                <button
                  className={colorButtonStyle}
                  style={{ backgroundColor: "#7d60f2" }}
                  onClick={() => setbackgroundColor("#7d60f2")}
                />
                <button
                  className={colorButtonStyle}
                  style={{ backgroundColor: "#a1edaa" }}
                  onClick={() => setbackgroundColor("#a1edaa")}
                />
                <Separator
                  orientation="vertical"
                  className="h-6 mx-2 bg-gray-400 mr-4"
                />
                <button
                  className={colorButtonStyle}
                  style={{
                    backgroundColor: backgroundColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPicker && (
        <div className="absolute z-10 top-36 left-52 p-4 rounded-2xl  rounded-tl-none shadow-md shadow-black">
          <HexColorPicker color={Color} onChange={setColor}  />
        </div>
      )}
    </>
  );
}

export default UtilsTab;
