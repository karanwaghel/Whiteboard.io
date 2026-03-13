import {
  Pen,
  EraserIcon,
  Menu,
  Square,
  Trash2Icon,
  Circle,
  MoveRight,
  Minus,
  ALargeSmall,
  MousePointer,
  LogOut as LogOutIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useAuth } from "@/ComponentProject/Context/AuthContext";
import { Separator } from "@/components/ui/separator";

const TOOLS = [
  { value: "cursor", label: "Selection", icon: MousePointer },
  { value: "pen", label: "Pen", icon: Pen },
  { value: "eraser", label: "Eraser", icon: EraserIcon },
  { value: "square", label: "Square", icon: Square },
  { value: "circle", label: "Circle", icon: Circle },
  { value: "arrow", label: "Arrow", icon: MoveRight },
  { value: "line", label: "Line", icon: Minus },
  { value: "text", label: "Text", icon: ALargeSmall },
];

export default function Toolbar() {
  const { setTool, Tool, setElements,selectedIndex} = useWhiteBoard();
  const { LogOut } = useAuth();

  const ToolTipButton = ({ children, label }) => (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );

  const ResetCanvas = () => {
    setElements([]);
  };

  const itemClasses = `
    w-10 h-10 rounded-xl transition-all duration-200
    border-2 border-transparent
    hover:bg-[#b5d6fc]
    data-[state=on]:bg-[#85baf7]
    data-[state=on]:border-2
    data-[state=on]:border-[#0d417c]
    
  `;

  return (
    <div className="h-16 w-full p-2 absolute top-0 left-0 ">
      <div className="flex justify-between items-center">
        <ToolTipButton label="Menu">
          <Button
            variant="ghost"
            className="rounded-2xl w-10 h-10  shadow-md shadow-[#414753] z-50"
          >
            <Menu size={20} />
          </Button>
        </ToolTipButton>

        <div className="shadow-md shadow-[#414753] rounded-full p-1 px-6 mt-2 bg-white border z-50">
          <ToggleGroup
            type="single"
            value={Tool}
            onValueChange={(val) => val && setTool(val)}
            className="gap-2"
            defaultValue="cursor"
          >
            {TOOLS.map((tool, index) => (
              <ToggleGroupItem
                value={tool.value}
                className={itemClasses}
                key={index}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-full h-full">
                      <tool.icon size={18} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{tool.label}</TooltipContent>
                </Tooltip>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex gap-2 z-50">
          <Dialog>
            <ToolTipButton label="Reset Canvas">
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-2xl w-10 h-10 shadow-md shadow-[#414753]"
                >
                  <Trash2Icon size={18} />
                </Button>
              </DialogTrigger>
            </ToolTipButton>
            <DialogContent className="!p-8">
              <DialogHeader>
                <DialogTitle className="text-lg">Reset Canvas</DialogTitle>
                <Separator className="!mt-2 !mb-4"/>
                <DialogDescription >
                  Are you sure you want to reset the canvas?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose
                  asChild
                >
                  <Button onClick={ResetCanvas} variant="destructive" className="ml-8">
                    Reset
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <ToolTipButton label="LogOut">
            <Button
              onClick={LogOut}
              variant="destructive"
              className="rounded-2xl w-10 h-10 p-0 shadow-sm"
            >
              <LogOutIcon size={18} />
            </Button>
          </ToolTipButton>
        </div>
      </div>
    </div>
  );
}
