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
  Transformer,
} from "react-konva";
import { useRef, useEffect } from "react";
import UtilsTab from "./UtilityTab";
import { Tools_config } from "@/ComponentProject/config/ToolsConfig";

function HomePage() {
  const {
    Tool,
    setColor,
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
    setFontSize,
    selectedIndex,
    setSelectedIndex,
    setStrokeWidth,
    setOpacity,
    setbackgroundColor,
    setToggleTextutils,
    Edges,
  } = useWhiteBoard();

  const stageref = useRef(null);
  const newTextIndexRef = useRef(null);
  const groupRef = useRef({});
  const transformerRef = useRef(null);
  const ActiveTool = Tools_config[Tool];
  const ElementsRef = useRef(Elements);

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
        cornerRadius={el.edges}
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
      <Line
        points={el.Points}
        stroke={el.Color}
        strokeWidth={el.StrokeWidth}
        opacity={el.Opacity}
      />
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

  useEffect(() => {
    ElementsRef.current = Elements;
  }, [Elements]);

  useEffect(() => {
    if (!transformerRef.current) return;

    const pointBasedTools = ["pen", "arrow", "line"];

    if (selectedIndex !== null) {
      const selectedEl = Elements.current[selectedIndex];

      if (selectedEl && pointBasedTools.includes(selectedEl.Tool)) {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer()?.batchDraw();
        return;
      }

      const selectedNode = groupRef.current[selectedIndex];
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIndex]);

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
          StrokeWidth: Tool === "eraser" ? 30 : StrokeWidth,
          backgroundColor: backgroundColor,
          Opacity: Tool === "eraser" ? 1 : Opacity,
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
            height: 0,
            Points: [pos.x, pos.y, pos.x, pos.y],
            Color,
            backgroundColor,
            Opacity,
            StrokeWidth,
            FontSize,
            text: "",
            edges: Edges,
          },
        ];
      });

      if (Tool === "text") {
        setTimeout(() => {
          setEditingText({
            text: "",
            x: pos.x,
            y: pos.y,
            index: newTextIndexRef.current,
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

      {(Tool !== "cursor" && Tool !== "eraser") || selectedIndex !== null ? (
        <UtilsTab config={ActiveTool} />
      ) : null}

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
            fontSize: FontSize,
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
            onClick={() => setSelectedIndex(null)}
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
                ref={(node) => {
                  groupRef.current[realIndex] = node;
                }}
                onClick={() => {
                  if (Tool === "cursor") {
                    if (el.Tool === "text") {
                      setToggleTextutils(true);
                    } else {
                      setToggleTextutils(false);
                    }
                    setSelectedIndex(realIndex);
                    setFontSize(el.FontSize);
                    setColor(el.Color);
                    setbackgroundColor(el.backgroundColor);
                    setOpacity(el.Opacity);
                    setStrokeWidth(el.StrokeWidth);
                  }
                }}
                draggable={Tool === "cursor"}
                x={
                  ["pen", "arrow", "line"].includes(el.Tool)
                    ? 0
                    : (el.x || 0) + (el.width || 0) / 2
                }
                y={
                  ["pen", "arrow", "line"].includes(el.Tool)
                    ? 0
                    : (el.y || 0) + (el.height || 0) / 2
                }
                offsetX={(el.width || 0) / 2}
                offsetY={(el.height || 0) / 2}
                rotation={el.rotation || 0}
                onDragEnd={(e) => {
                  const node = e.target;
                  setElements((prev) =>
                    prev.map((Item, index) =>
                      index === realIndex
                        ? {
                            ...Item,
                            x: node.x() - (Item.width || 0) / 2,
                            y: node.y() - (Item.height || 0) / 2,
                            rotation: node.rotation(),
                          }
                        : Item,
                    ),
                  );
                }}
              >
                {ToolsMap[el.Tool]?.(el)}
              </Group>
            );
          })}

          {/* {transformer} */}

          {Tool !== "eraser" && (
            <Transformer
              ref={transformerRef}
              borderStroke="#4A90E2"
              borderStrokeWidth={1}
              anchorStroke="#4A90E2"
              anchorFill="white"
              anchorSize={8}
              anchorCornerRadius={5}
              rotateEnabled={true}
              onTransformEnd={(e) => {
                const node = groupRef.current[selectedIndex];
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                const rotation = node.rotation();

                node.scaleX(1);
                node.scaleY(1);

                setElements((prev) =>
                  prev.map((el, index) => {
                    if (index !== selectedIndex) return el;

                    const newWidth = el.width * scaleX;
                    const newHeight = el.height * scaleY;

                    const updatedPoints =
                      el.Points && ["arrow", "line", "pen"].includes(el.Tool)
                        ? el.Points.map((p, i) =>
                            i % 2 === 0 ? p * scaleX : p * scaleY,
                          )
                        : el.Points;

                    return {
                      ...el,
                      x: node.x() - newWidth / 2,
                      y: node.y() - newHeight / 2,
                      width: newWidth,
                      height: newHeight,
                      offsetX: newWidth / 2,
                      offsetY: newHeight / 2,
                      rotation,
                      Points: updatedPoints,
                    };
                  }),
                );
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default HomePage;
