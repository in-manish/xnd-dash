import React from 'react';
import EditorialHeader from './components/EditorialHeader';
import StatsGrid from './components/StatsGrid';
import EditorialPipeline from './components/EditorialPipeline';
import NewsroomFeed from './components/NewsroomFeed';

const Dashboard = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-3 py-4 md:px-6 md:py-6">
      <EditorialHeader />
      
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <StatsGrid />
        <EditorialPipeline />
        <NewsroomFeed />
      </div>
    </div>
  );
};

export default Dashboard;
