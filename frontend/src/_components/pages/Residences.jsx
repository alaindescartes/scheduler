import React from "react"
import { Button } from "../../components/ui/button.jsx"
import Residence from "../Residence.jsx"
function Residences() {
  return (
    <div className="flex flex-col gap-2">
      {/* list of residences */}
      <div>
        <Residence />
      </div>
    </div>
  )
}

export default Residences
