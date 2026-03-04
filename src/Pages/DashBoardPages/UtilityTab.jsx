import { Button } from "@/components/ui/button"
import { ToggleGroup,ToggleGroupItem } from "@/components/ui/toggle-group";
import { HexColorPicker, HexColorInput } from "react-colorful";




function UtilsTab() {
  return (
    <div className="absolute top-[15%] left-3 border border-black max-w-56" >
      <ToggleGroup type="single">
        <ToggleGroupItem>
          <button>color</button>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default UtilsTab
