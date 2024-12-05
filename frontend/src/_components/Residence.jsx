import React from "react"
import { Button } from "../components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

function Residence() {
  const imageAddrress =
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D"

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 rounded-lg shadow-lg p-6 gap-6 m-3">
      {/* Residence Image */}
      <div className="w-full md:w-[450px]">
        <img
          src={imageAddrress}
          alt="photo of residence"
          loading="lazy"
          className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        />
      </div>

      {/* Residence Info */}
      <div className="flex-1 text-left space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Grouphome 20</h2>
        {/* TODO:make the address interactive interactive */}
        <p className="text-gray-600">1234 Elm Street, Edmonton, AB, Canada</p>
        <p className="text-gray-500 text-sm">
          This residence provides supportive living for individuals requiring
          additional care and resources.
        </p>
      </div>

      {/* Admin Controls */}
      <div className="flex flex-row space-x-4">
        <Button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
          <FontAwesomeIcon icon={faPen} className="mr-2" />
          Edit
        </Button>
        <Button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Residence
