import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { HexColorInput } from "react-colorful";
import { Separator } from "@/components/ui/separator";
import { Download, UserCircle2 as Profile, Menu } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const canvasBackgroundMap = [
  { value: "#ffffff", background: "#ffffff" },
  { value: "#f5faff", background: "#f5faff" },
  { value: "#fffce8", background: "#fffce8" },
  { value: "#fdf8f6", background: "#fdf8f6" },
];

const MenuItemStyle = `
    flex justify-start items-center p-2 mb-1
    cursor-pointer
    border-2 border-transparent
    rounded-xl transition-all duration-200
    hover:bg-[#b5d6fc]
    active:border-1
    active:border-[#0d417c]
    focus:border-1
    focus:border-[#0d417c]
  `;
const CanvaColorButton = `
  rounded-lg h-6 w-6 my-2
  hover:scale-110
  active:scale-95
  transition-transform
  border-2 border-black
  mr-2
  `;

export default function Sidebar() {
  console.log("Sidebar mounted");

  const { CanvaColor, setCanvaColor, OnExportRef } = useWhiteBoard();
  const [showCanvaPicker, setshowCanvaPicker] = useState(false);

  const MenuMap = [
    { label: "Profile", icon: Profile, action: () => {} },
    {
      label: "Export ",
      icon: Download,
      action: () => OnExportRef.current?.("png"),
    },
  ];

  return (
    <div className="relative z-50">
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <div
                className="rounded-2xl w-9 h-9 shadow-md shadow-[#414753] z-50 
                     flex items-center justify-center cursor-pointer
                     hover:bg-accent"
              >
                <Menu size={20} />
              </div>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Menu</TooltipContent>
        </Tooltip>

        <PopoverContent className="h-96 w-56 p-2 mt-1 ml-1">
          {MenuMap.map((val, index) => {
            const Icon = val.icon;
            return (
              <div key={index} className={MenuItemStyle} onClick={val.action}>
                <Icon size={16} />
                <h3 className="text-sm ml-3">{val.label}</h3>
              </div>
            );
          })}

          <div className="flex flex-wrap mb-2 pl-2 relative">
            {canvasBackgroundMap.map((btn, index) => (
              <button
                key={index}
                className={CanvaColorButton}
                style={{ backgroundColor: btn.background }}
                onClick={() => setCanvaColor(btn.value)}
              />
            ))}
            <Separator
              orientation="vertical"
              className="h-6 mx-2 mr-4 mt-2 bg-gray-400 "
            />
            <button
              className={CanvaColorButton}
              onClick={() => {
                setCanvaColor(CanvaColor);
                setshowCanvaPicker((prev) => !prev);
              }}
              style={{
                backgroundColor: CanvaColor,
                height: "26px",
                width: "26px",
              }}
            />
            {showCanvaPicker && (
              <div className="absolute z-50 top-0 left-56 p-2 rounded-xl  shadow-md shadow-black">
                <HexColorInput
                  className="border border-black rounded-md w-[10.5rem] p-1 "
                  placeholder="#ffffff"
                  onChange={(clr) => setCanvaColor(clr)}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
