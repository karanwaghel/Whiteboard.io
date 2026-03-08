import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Separator } from "@/components/ui/separator";

const colorButtonStyle = `
  rounded-full h-6 w-6 my-3
  hover:scale-110
  active:scale-95
  transition-transform
  mr-2
  `;

function UtilsTab() {
  const [showPicker, setshowpicker] = useState(false);
  const { Color, setColor, Tool } = useWhiteBoard();

  return (
    <>
        <div className=" mt-2 absolute top-[15%] left-4 w-44 h-60 transition-all duration-500 z-50 " style={{display:Tool === "eraser" ? "none":null}}>
          <div className="shadow-md shadow-black rounded-md p-2 flex items-start justify-start w-full h-full">
            <div className="w-full">
              <label className="text-[14px] w-full block">Stroke</label>
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
                  style={{ backgroundColor: Color }}
                />
              </div>
            </div>
          </div>
        </div>

      {showPicker && (
        <div className="absolute z-10 top-32 left-52">
          <HexColorPicker color={Color} onChange={setColor} />
        </div>
      )}
    </>
  );
}

export default UtilsTab;
