import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentationDisplay from '../residence_comp/DocumentationDisplay';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

function DocumentationOutlet({ children }) {
  const navigate = useNavigate();
  const goToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div className="relative p-6">
      <Button
        onClick={() => goToPreviousPage()}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition z-10"
      >
        Back
      </Button>
      <div className="mt-12">
        <DocumentationDisplay />
      </div>
    </div>
  );
}

export default DocumentationOutlet;
