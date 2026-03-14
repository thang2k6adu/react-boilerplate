import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pages.dashboard.title')} - Flow</title>
      </Helmet>

      <div className="flex h-full w-full items-center justify-center p-8 text-center text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome to Dashboard
          </h2>
          <p>This is a clean boilerplate dashboard.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
