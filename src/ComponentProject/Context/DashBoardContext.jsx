import { createContext, useContext, useState } from "react";

export const useWhiteBoard = () => {
  return useContext(WhiteboardContext);
};

const WhiteboardContext = createContext();

const WhiteBoardContextProvider = ({ children }) => {
  const [Tool, setTool] = useState("");
  const [Color, setColor] = useState("#000000");
  const [isDrawing, setisDrawing] = useState(false);
  const [Elements, setElements] = useState([]);

  const value = {
    Tool,
    setTool,
    Elements,
    setElements,
    Color,
    setColor,
    isDrawing,
    setisDrawing,
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
