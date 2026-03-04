import { TooltipProvider } from "@radix-ui/react-tooltip";
import Toolbar from "./Toolbar";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { Stage, Layer, Line } from "react-konva";
import { useRef, useState } from "react";
import UtilsTab from "./UtilityTab";



function HomePage() {
  const {
    Tool,
    Elements,
    setElements,
    isDrawing,
    setisDrawing,
    Color,
  } = useWhiteBoard();

  const stageref = useRef(null);
  const [UtilVisible,setUtilVisible] = useState(false)


  const handleMouseDown = (e) => {
    if (Tool !== "pen" && Tool !== "eraser") return;

    setisDrawing(true);
    const pos = e.target.getStage().getPointerPosition();

    setElements([
      ...Elements,
      {
        Tool: Tool,
        Pointers: [pos.x, pos.y],
        Stroke: Tool === "eraser"  ? '#000000' : Color,
        StrokeWidth:Tool === 'eraser' ? 20 : 5,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing ||( Tool !== "pen" && Tool !== 'eraser')) return;

    const pos = e.target.getStage().getPointerPosition();

    setElements((prevElement) => {
      const otherElements = prevElement.slice(0, -1);
      const lastElement = prevElement[prevElement.length - 1];

      return [
        ...otherElements,
        {
          ...lastElement,
          Pointers: [...lastElement.Pointers, pos.x, pos.y],
        },
      ];
    });
  };

  const handleMouseUp = () => {
    setisDrawing(false);
  };

  return (
    <>
    { 
       Tool && Tool.length > 0 ?
       <UtilVisible/> : '' 
    }
      <div className="h-screen w-screen overflow-hidden">
        <TooltipProvider delayDuration={300}>
          <Toolbar />
        </TooltipProvider>
        <Stage
          height={window.innerHeight}
          width={window.innerWidth}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          ref={stageref}
        >
          <Layer>
            {
              Elements.map((el,i)=>(
                <Line
                  key={i}
                  points={el.Pointers}
                  stroke={el.Stroke}
                  strokeWidth={el.StrokeWidth}
                  tension={0.4}
                  lineCap="round"
                  lineJoin="round"
                  perfectDrawEnabled={false}
                  hitStrokeWidth={10}
                  globalCompositeOperation={el.Tool == "eraser" ? "destination-out" : "source-over"}
                />
              ))
            }
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default HomePage;
