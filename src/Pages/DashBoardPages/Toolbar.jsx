import {
  Pen,
  EraserIcon,
  Menu,
  Share2,
  Square,
  Diamond,
  Circle,
  MoveRight,
  Minus,
  ALargeSmall,
  MousePointer,
  LogOut as LogOutIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { useAuth } from "@/ComponentProject/Context/AuthContext";

const TOOLS = [
  { value: "cursor", label: "Selection", icon: MousePointer },
  { value: "pen", label: "Pen", icon: Pen },
  { value: "eraser", label: "Eraser", icon: EraserIcon },
  { value: "square", label: "Square", icon: Square },
  { value: "circle", label: "Circle", icon: Circle },
  { value: "diamond", label: "Diamond", icon: Diamond },
  { value: "arrow", label: "Arrow", icon: MoveRight },
  { value: "line", label: "Line", icon: Minus },
  { value: "text", label: "Text", icon: ALargeSmall },
];

export default function Toolbar() {
  const { setTool } = useWhiteBoard();
  const { LogOut } = useAuth();



  const ToolTipButton = ({ children, label }) => (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );

  const itemClasses = `
    w-10 h-10 rounded-xl transition-all duration-200
    border-2 border-transparent

    hover:bg-[#b5d6fc]
    data-[state=on]:bg-[#85baf7]
    data-[state=on]:border-2
    data-[state=on]:border-[#0d417c]
    
  `;

  return (
    
    <div className="h-16 w-full p-4">
      <div className="flex justify-between items-center">
        <ToolTipButton label="Menu">
          <Button
            variant="ghost"
            className="rounded-full w-10 h-10 p-0 shadow-md shadow-[#414753]"
          >
            <Menu size={20} />
          </Button>
        </ToolTipButton>

        <div className="shadow-md shadow-[#414753] rounded-full p-1 px-3 bg-white border">
          <ToggleGroup
            type="single"
            
            onValueChange={(val) => val && setTool(val)}
            className="gap-2"
          >
            {TOOLS.map((tool,index) => (
              <ToggleGroupItem value={tool.value} className={itemClasses} key={index}>
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

        <div className="flex gap-2">
          <ToolTipButton label="Share Board">
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 shadow-md shadow-[#414753]"
            >
              <Share2 size={18} />
            </Button>
          </ToolTipButton>
          <ToolTipButton label="LogOut">
            <Button
              onClick={LogOut}
              variant="destructive"
              className="rounded-full w-10 h-10 p-0 shadow-sm"
            >
              <LogOutIcon size={18} />
            </Button>
          </ToolTipButton>
        </div>
      </div>
    </div>
  );
}
