import { TooltipProvider } from "@radix-ui/react-tooltip";
import Toolbar from "./Toolbar";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import { Stage, Layer, Line, Group, Rect, Circle, Text, Arrow } from "react-konva";
import { useRef } from "react";
import UtilsTab from "./UtilityTab";
import { Tools_config } from "@/ComponentProject/config/ToolsConfig";

function HomePage() {
  const {
    Tool, setTool, Elements, setElements,
    isDrawing, setisDrawing, Color, StrokeWidth,
  } = useWhiteBoard();

  const stageref = useRef(null);
  const ActiveTool = Tools_config[Tool];

  const cursorMap = {
    pen: "crosshair", square: "crosshair", circle: "crosshair",
    arrow: "crosshair", line: "crosshair", eraser: "cell",
    text: "text", cursor: "move",
  };

  const ToolsMap = {
    pen: (el) => (
      <Line points={el.Points} stroke={el.Color} strokeWidth={el.StrokeWidth}
        lineCap="round" lineJoin="round" globalCompositeOperation="source-over" />
    ),
    square: (el) => (
      <Rect x={el.x} y={el.y} width={el.width} height={el.height}
        stroke={el.Color} strokeWidth={el.StrokeWidth} cornerRadius={12} fill={el.Color} fillAfterStrokeEnabled={true} fillEnabled={true} />
    ),
    circle: (el) => (
      <Circle x={el.x} y={el.y} radius={Math.abs(el.width / 2)}
        stroke={el.Color} strokeWidth={el.StrokeWidth} fill={el.Color} fillAfterStrokeEnabled={true} fillEnabled={true}/>
    ),
    arrow: (el) => (
      <Arrow points={el.Points} stroke={el.Color} strokeWidth={el.StrokeWidth} />
    ),
    line: (el) => (
      <Line points={el.Points} stroke={el.Color} strokeWidth={el.StrokeWidth} />
    ),
    text: (el) => (
      <Text x={el.x} y={el.y} text={el.text} fill={el.Color} fontSize={20} />
    ),
  };

  const handleMouseDown = (e) => {
    if (Tool === "cursor") return;

    setisDrawing(true);
    const pos = e.target.getStage().getPointerPosition();

    if (Tool === "pen" || Tool === "eraser") {
      setElements((prev) => [
        ...prev,
        {
          Tool,
          Points: [pos.x, pos.y],
          Color: Tool === "eraser" ? "#000000" : Color,
          StrokeWidth: Tool === "eraser" ? 20 : StrokeWidth,
        },
      ]);
    } else {
      setElements((prev) => [
        ...prev,
        {
          Tool,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          Points: [pos.x, pos.y, pos.x, pos.y],
          Color,
          StrokeWidth,
          text: "Text",
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || Tool === "cursor") return;

    const pos = e.target.getStage().getPointerPosition();

    if (Tool === "pen" || Tool === "eraser") {
      setElements((prev) => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          { ...last, Points: [...last.Points, pos.x, pos.y] },
        ];
      });
    } else {
      setElements((prev) => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            width: pos.x - last.x,
            height: pos.y - last.y,
            Points: [last.x, last.y, pos.x, pos.y],
          },
        ];
      });
    }
  };

  const handleMouseUp = () => {
    setisDrawing(false);
    setTool("cursor");
  };

  return (
    <>
      {ActiveTool && (ActiveTool.hasStroke || ActiveTool.hasColor) && (
        <UtilsTab config={ActiveTool} />
      )}
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
          style={{ cursor: cursorMap[Tool] || "default" }}
          ref={stageref}
        >
          <Layer>
            {Elements.filter(el=>el.Tool !== 'eraser').map((el, i) => (
              <Group
                key={i}
                draggable={Tool === "cursor"}
                x={el.x || 0}
                y={el.y || 0}
                onDragEnd={(e) => {
                  const { x, y } = e.target.position();
                  setElements((prev) =>
                    prev.map((Item, index) =>
                      index === i ? { ...Item, x, y } : Item
                    )
                  );
                }}
              >
                {ToolsMap[el.Tool]?.(el)}
              </Group>
            ))}
          </Layer>

          <Layer listening={false}>
            {Elements.filter(el=>el.Tool === "eraser").map((el, i) => (
              <Line
                key={i}>
                {ToolsMap[el.Tool]?.(el)}
              </Line>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default HomePage;