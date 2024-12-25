import React from 'react';
import { useParams } from 'react-router-dom';
import Shift_Daily_Logs from './forms/Shift_Daily_Logs';

function DocumentationDisplay() {
  const { type } = useParams();

  console.log('type is:', type);

  // Logic to render different components based on `type`
  const renderContent = () => {
    switch (type) {
      case 'shift-logs':
        return <Shift_Daily_Logs />;
      case 'daily-progress-notes':
        return <div>Daily Progress Notes Content</div>;
      case 'maintenance-checklists':
        return <div>Maintenance and Safety Checklists Content</div>;
      case 'financial-records':
        return <div>Financial Records Content</div>;
      case 'activity-logs':
        return <div>Activity Logs Content</div>;
      case 'visitation-logs':
        return <div>Visitation Logs Content</div>;
      case 'food-tracker':
        return <div>Food Tracker Content</div>;
      default:
        return <div>No matching documentation found.</div>;
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Documentation: {type.replace(/-/g, ' ')}
      </h1>
      <div>{renderContent()}</div>
    </div>
  );
}

export default DocumentationDisplay;
