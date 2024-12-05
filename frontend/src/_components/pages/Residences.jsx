import React from "react"
import { Button } from "../../components/ui/button.jsx"
import Residence from "../Residence.jsx"
function Residences() {
  return (
    <div className="flex flex-col gap-2 ">
      <Button className="bg-blue-400 w-[300px] text-center m-auto mt-3 hover:bg-blue-500">
        ADD RESIDENCES
      </Button>
      {/* list of residences */}
      <div>
        <Residence />
      </div>
    </div>
  )
}

export default Residences
