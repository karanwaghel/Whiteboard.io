import { createContext, useContext, useState } from "react";

export const useWhiteBoard = () => {
  return useContext(WhiteboardContext);
};

const WhiteboardContext = createContext();

const WhiteBoardContextProvider = ({ children }) => {
  const [Tool, setTool] = useState("cursor");
  const [Color, setColor] = useState("#000000");
  const [StrokeWidth, setStrokeWidth] = useState(2);
  const [height, setheight] = useState(50);
  const [width, setwidth] = useState(50);
  const [isDrawing, setisDrawing] = useState(false);
  const [Elements, setElements] = useState([]);
  const [EditingText, setEditingText] = useState(null);
  const [backgroundColor, setbackgroundColor] = useState("#ffffff");
  const [Opacity, setOpacity] = useState(1);
  const [FontSize, setFontSize] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const value = {
    Tool,
    setTool,
    Elements,
    setElements,
    Color,
    setColor,
    isDrawing,
    setisDrawing,
    StrokeWidth,
    setStrokeWidth,
    height,
    setheight,
    width,
    setwidth,
    EditingText,
    setEditingText,
    setbackgroundColor,
    backgroundColor,
    Opacity,
    setOpacity,
    FontSize,
    setFontSize,
    selectedIndex,
    setSelectedIndex,
  };
  return (
    <>
      <WhiteboardContext.Provider value={value}>
        {children}
      </WhiteboardContext.Provider>
    </>
  );
};

export default WhiteBoardContextProvider;
