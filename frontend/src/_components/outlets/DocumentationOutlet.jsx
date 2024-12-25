import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentationDisplay from '../residence_comp/DocumentationDisplay';

function DocumentationOutlet({ children }) {
  return (
    <div>
      <DocumentationDisplay />
      <div>Hey there in this</div>
    </div>
  );
}

export default DocumentationOutlet;
