import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ResidenceLinks() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto mb-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
        Documentation
      </h3>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Accordion Section */}
        <div className="flex-1 space-y-4">
          {/* Operational Documents */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-blue-600">
                Operational Documents
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Shift Logs
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Daily Progress Notes
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Maintenance and Safety Checklists
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Financial Records
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Routine Logs */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-green-600">
                Routine Logs
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Activity Logs
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Visitation Logs
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Food Tracker
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Select Section */}
        <Accordion type="single" collapsible>
          <AccordionItem value="incident-reports">
            <AccordionTrigger className="text-lg font-semibold text-red-600">
              Incident Reports
            </AccordionTrigger>
            <AccordionContent className="mt-2 space-y-2">
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Behavioral Incident
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Medical Incident
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Medication Error
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Property Damage
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Resident Injury
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Staff Injury
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Emergency Response
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Missing Person
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Safety Hazard
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Policy Violation
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Visitor Incident
              </Button>
              <Button className="w-full bg-red-500 border border-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-500">
                Other
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default ResidenceLinks;
