import React from 'react';
import { Helmet } from 'react-helmet-async';

const Settings: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Settings - Donezo</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your settings here.</p>
      </div>
    </>
  );
};

export default Settings;
