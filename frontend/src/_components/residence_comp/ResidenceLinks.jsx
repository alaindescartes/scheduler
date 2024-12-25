import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import OperationBtn from './OperationBtn';
import { useNavigate, useParams } from 'react-router-dom';

function ResidenceLinks() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('id:', id);

  const handleNavigation = (type) => {
    console.log(`Navigating to: /homepage/documentation/${type}`);
    if (!id) {
      console.error('Error: No id provided in URL.');
      return;
    }
    navigate(`/homepage/documentation/${type}`);
  };
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
                <OperationBtn
                  label="Shift Logs"
                  color="blue"
                  onClick={() => handleNavigation('shift-logs')}
                />
                <OperationBtn label="Daily Progress Notes" color="blue" />
                <OperationBtn
                  label="Maintenance and Safety Checklists"
                  color="blue"
                />
                <OperationBtn label="Financial Records" color="blue" />
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
                <OperationBtn label="Activity Logs" color="green" />
                <OperationBtn label="Visitation Logs" color="green" />
                <OperationBtn label="Food Tracker" color="green" />
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
              <OperationBtn label="Behavioral Incident" color="red" />
              <OperationBtn label="Medical Incident" color="red" />
              <OperationBtn label="Medication Error" color="red" />
              <OperationBtn label="Property Damage" color="red" />
              <OperationBtn label="Resident Injury" color="red" />
              <OperationBtn label="Staff Injury" color="red" />
              <OperationBtn label="Emergency Response" color="red" />
              <OperationBtn label="Missing Person" color="red" />
              <OperationBtn label="Safety Hazard" color="red" />
              <OperationBtn label="Policy Violation" color="red" />
              <OperationBtn label="Visitor Incident" color="red" />
              <OperationBtn label="Other" color="red" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default ResidenceLinks;
