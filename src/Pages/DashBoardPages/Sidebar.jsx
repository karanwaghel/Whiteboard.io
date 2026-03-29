import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { HexColorInput } from "react-colorful";
import { Toaster, toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Download, UserCircle2 as Profile, Menu, Save } from "lucide-react";
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
import { useAuth } from "@/ComponentProject/Context/AuthContext";
import AddBoard from "@/ComponentProject/Services/firestore";

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
  const { CanvaColor, setCanvaColor, OnExportRef, Elements } = useWhiteBoard();
  const [showCanvaPicker, setshowCanvaPicker] = useState(false);
  const [showUser, setshowUser] = useState(false);
  const { CurrentUser } = useAuth();

  const handelAddBoard = async () => {
    const ToastId = toast.loading("Saving...");
    try {
      await AddBoard(CurrentUser.uid, Elements, CanvaColor);

      toast.success("Saved Successfully!", {
        id: ToastId,
      });
    } catch (error) {
      toast.error("Error, Cannot Save!", {
        id: ToastId,
      });
    }
  };

  const MenuMap = [
    {
      label: "Profile",
      icon: Profile,
      action: () => {
        setshowUser((prev) => !prev);
        console.log(CurrentUser);
      },
    },
    {
      label: "Export ",
      icon: Download,
      action: () => OnExportRef.current?.("png"),
    },
    {
      label: "Save",
      icon: Save,
      action: handelAddBoard,
    },
  ];

  return (
    <div className="relative z-50 pl-2">
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            setshowCanvaPicker(false);
            setshowUser(false);
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <div
                className="rounded-2xl w-9 h-9 shadow-md shadow-[#414753] z-50 
                     flex items-center justify-center cursor-pointer
                     hover:bg-accent bg-white"
              >
                <Menu size={20} />
              </div>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Menu</TooltipContent>
        </Tooltip>

        <PopoverContent className="h-96 w-56 p-2 mt-1 ml-1 relative">
          {MenuMap.map((val, index) => {
            const Icon = val.icon;
            return (
              <div key={index} className={MenuItemStyle} onClick={val.action}>
                <Icon size={16} />
                <h3 className="text-sm ml-3">{val.label}</h3>
              </div>
            );
          })}

          {/* {userBlock} */}

          {showUser && (
            <div className=" w-56 absolute z-50 top-3 left-56 p-3 ml-2 rounded-xl  shadow-md shadow-black">
              <h4 className="text-xs flex flex-wrap">
                Email: {CurrentUser.email}
              </h4>
            </div>
          )}

          <Separator className=" w-44 ml-2 my-2" />

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
              <div className="absolute z-50 top-0 left-56 p-2 rounded-xl  shadow-md shadow-black bg-white">
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
