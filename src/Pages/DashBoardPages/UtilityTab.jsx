import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

function UtilsTab() {
  const [showPicker, setshowpicker] = useState(false);
  const { Color, setColor } = useWhiteBoard();

  return (
    <>
      <div className=" mt-2 absolute top-[15%] left-4 w-44 h-60 transition-all duration-300000 z-10">
        <div className="shadow-md shadow-black rounded-md p-2 flex items-start justify-center w-full h-full">
          <div className="w-full flex ">
            <label className="text-[12px] w-full">Stroke</label>
            <button className="rounded-full h-5 w-5 my-2 hover:scale-110 active:scale-95 transition-transform bg-red-500"/>
            <button className="rounded-full h-5 w-5 my-2 hover:scale-110 active:scale-95 transition-transform bg-green-500"/>
            <button className="rounded-full h-5 w-5 my-2 hover:scale-110 active:scale-95 transition-transform bg-blue-500"/>
            <button
              className="rounded-full h-5 w-5 my-2 hover:scale-110 active:scale-95 transition-transform"
              onClick={() => setshowpicker((prev) => !prev)}
              style={{ backgroundColor: Color }}
            />
          </div>
        </div>

        {showPicker && (
          <div>
            <HexColorPicker color={Color} onChange={setColor} />
          </div>
        )}
      </div>
    </>
  );
}

export default UtilsTab;
