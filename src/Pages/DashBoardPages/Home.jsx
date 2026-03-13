import { TooltipProvider } from "@radix-ui/react-tooltip";
import Toolbar from "./Toolbar";
import { useWhiteBoard } from "@/ComponentProject/Context/DashBoardContext";
import {
  Stage,
  Layer,
  Line,
  Group,
  Rect,
  Circle,
  Text,
  Arrow,
} from "react-konva";
import { useRef } from "react";
import UtilsTab from "./UtilityTab";
import { Tools_config } from "@/ComponentProject/config/ToolsConfig";

function HomePage() {
  const {
    Tool,
    setTool,
    Elements,
    setElements,
    isDrawing,
    setisDrawing,
    Color,
    StrokeWidth,
    EditingText,
    setEditingText,
    backgroundColor,
    Opacity,
    FontSize,
    setSelectedIndex,
  } = useWhiteBoard();

  const stageref = useRef(null);
  const newTextIndexRef = useRef(null);
  const ActiveTool = Tools_config[Tool];

  const cursorMap = {
    pen: "crosshair",
    square: "crosshair",
    circle: "crosshair",
    arrow: "crosshair",
    line: "crosshair",
    eraser: "cell",
    text: "text",
    cursor: "move",
  };

  const ToolsMap = {
    pen: (el) => (
      <Line
        points={el.Points}
        stroke={el.Color}
        strokeWidth={el.StrokeWidth}
        lineCap="round"
        lineJoin="round"
        opacity={el.Opacity}
        globalCompositeOperation="source-over"
      />
    ),
    square: (el) => (
      <Rect
        x={0}
        y={0}
        width={el.width}
        height={el.height}
        stroke={el.Color}
        strokeWidth={el.StrokeWidth}
        fillEnabled={true}
        fill={el.backgroundColor}
        fillAfterStrokeEnabled={true}
        cornerRadius={22}
        opacity={el.Opacity}
      />
    ),
    circle: (el) => (
      <Circle
        x={0}
        y={0}
        radius={Math.abs(el.width / 2)}
        stroke={el.Color}
        strokeWidth={el.StrokeWidth}
        fillEnabled={true}
        fill={el.backgroundColor}
        fillAfterStrokeEnabled={true}
        opacity={el.Opacity}
      />
    ),
    arrow: (el) => (
      <Arrow
        points={el.Points}
        stroke={el.Color}
        strokeWidth={el.StrokeWidth}
        opacity={el.Opacity}
      />
    ),
    line: (el) => (
      <Line points={el.Points} stroke={el.Color} strokeWidth={el.StrokeWidth} opacity={el.Opacity} />
    ),
    text: (el) => (
      <Text
        x={0}
        y={0}
        text={el.text}
        fill={el.Color}
        fontSize={el.FontSize}
        fillEnabled={true}
        opacity={el.Opacity}
        fillAfterStrokeEnabled={true}
      />
    ),
  };

  const handleMouseDown = (e) => {
    if (Tool === "cursor") return;
    if (EditingText) return;

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
          backgroundColor:backgroundColor,
          Opacity:Tool === "eraser" ? 1 : Opacity,
        },
      ]);
    } else {
      setElements((prev) => {
        const newIndex = prev.length;
        newTextIndexRef.current = newIndex;
        return [
          ...prev,
          {
            Tool,
            x: pos.x,
            y: pos.y,
            width: 0,
            height:0,
            Points: [pos.x, pos.y, pos.x, pos.y],
            Color,
            backgroundColor,
            Opacity,
            StrokeWidth,
            FontSize,
            text: "",
          },
        ];
      });

      if (Tool === "text") {
        setTimeout(() => {
          setEditingText({
            text: "",
            x: pos.x,
            y: pos.y,
            index:newTextIndexRef.current,
          });
        }, 0);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || Tool === "cursor" || Tool === "text") return;

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
    if (Tool !== "text") setTool("cursor");
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      onMouseDown={() => {
        if (EditingText) return;
      }}
    >
      <TooltipProvider delayDuration={300}>
        <Toolbar />
      </TooltipProvider>

      {ActiveTool && (ActiveTool.hasStroke || ActiveTool.hasColor) && (
        <UtilsTab config={ActiveTool} />
      )}

      {EditingText && (
        <input
          autoFocus
          value={EditingText.text}
          onChange={(e) =>
            setEditingText({ ...EditingText, text: e.target.value })
          }
          onBlur={(e) => {
            setElements((prev) =>
              prev.map((el, index) =>
                index === EditingText.index
                  ? { ...el, text: e.target.value }
                  : el,
              ),
            );
            setEditingText(null);
            setTool("cursor");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
            if (e.key === "Escape") {
              setEditingText(null);
              setTool("cursor");
            }
          }}
          style={{
            position: "absolute",
            left: EditingText.x,
            top: EditingText.y,
            outline: "none",
            color: Color,
            fontSize:FontSize,
            zIndex: 100,
            minWidth: "100px",
            background: "transparent",
            pointerEvents: "all",
          }}
        />
      )}

      <Stage
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor: cursorMap[Tool] || "default",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: EditingText ? "none" : "all",
        }}
        ref={stageref}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="white"
            onClick={()=>setSelectedIndex(null)}
          />

          {Elements.map((el, realIndex) => {
            if (el.Tool === "eraser")
              return (
                <Line
                  key={realIndex}
                  points={el.Points}
                  stroke={el.Color}
                  strokeWidth={el.StrokeWidth}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation="destination-out"
                />
              );
            return (
              <Group
                key={realIndex}
                onClick={()=>{if(Tool == "cursor") setSelectedIndex(realIndex)}}
                draggable={Tool === "cursor"}
                x={el.x || 0}
                y={el.y || 0}
                onDragEnd={(e) => {
                  const { x, y } = e.target.position();
                  setElements((prev) =>
                    prev.map((Item, index) =>
                      index === realIndex ? { ...Item, x, y } : Item,
                    ),
                  );
                }}
              >
                {ToolsMap[el.Tool]?.(el)}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default HomePage;
