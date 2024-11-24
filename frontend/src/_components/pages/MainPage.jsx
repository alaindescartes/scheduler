import { Button } from "@/components/ui/button"
import React from "react"
import { Link } from "react-router-dom"

function MainPage() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-screen p-4 bg-slate-100">
      {/* Quick Links Section */}
      <section className="bg-blue-200 p-6 rounded-lg shadow-lg flex flex-col justify-between lg:col-span-1">
        <div className="text-center">
          <h3 className="text-blue-500 font-bold underline text-2xl mb-4">
            Quick Links
          </h3>
          <ol className="list-disc font-medium text-lg text-slate-800 space-y-3 ml-6">
            <li>
              <Link
                to="#"
                className="hover:text-blue-500 hover:underline transition duration-200"
              >
                View/Make Timesheet
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-blue-500 hover:underline transition duration-200"
              >
                View Schedule
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-blue-500 hover:underline transition duration-200"
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-blue-500 hover:underline transition duration-200"
              >
                About Me
              </Link>
            </li>
          </ol>
        </div>
        <Button className="mt-6 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg">
          CLOCK IN
        </Button>
      </section>

      {/* Right Half Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-4 gap-4">
        <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h3 className="text-slate-700 font-bold text-xl mb-4">
            Interface Refresher
          </h3>
          <p className="text-slate-600">
            Quick tips and guidance for using the platform effectively.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h3 className="text-slate-700 font-bold text-xl mb-4">
            Upcoming Shifts
          </h3>
          <p className="text-slate-600">
            Check your scheduled shifts and events here.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h3 className="text-slate-700 font-bold text-xl mb-4">
            Things To Do
          </h3>
          <p className="text-slate-600">
            A list of pending tasks and reminders.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h3 className="text-slate-700 font-bold text-xl mb-4">Resources</h3>
          <p className="text-slate-600">
            Helpful documents and links for your daily tasks.
          </p>
        </section>
      </div>
    </main>
  )
}

export default MainPage
