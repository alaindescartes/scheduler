import React from "react"
import { Button } from "../../components/ui/button.jsx"
import Residence from "../Residence.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ResidenceForm from "../residence_comp/ResidenceForm.jsx"

import { useSelector } from "react-redux"
import axios from "axios"

function Residences() {
  //   const userRole =
  //      useSelector((state) => state?.user?.user?.details?.role) || "caregiver"
  const userRole = "admin"
  return (
    <div className="flex flex-col gap-2 ">
      {userRole === "admin" && (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-400 w-[300px] text-center m-auto mt-3 hover:bg-blue-500">
              ADD RESIDENCES
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <ResidenceForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {/* list of residences */}
      <div>
        <Residence />
      </div>
    </div>
  )
}

export default Residences
