import { useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import Sidebar from './Sidebar';
import ResourceView from './ResourceView';
import BuildingView from './BuildingView';
import NotificationToast from './NotificationToast';

export default function Dashboard() {
  // Start the core game loop
  useGameLoop();

  const [activeTab, setActiveTab] = useState('resources');

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-auto p-6 bg-gray-800 shadow-inner">
        <header className="mb-6 flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex gap-4">
            <span className="text-sm text-gray-400">Space Company v1.0.0 (Web Port)</span>
          </div>
        </header>

        <div className="grid gap-6">
          {activeTab === 'resources' && <ResourceView />}
          {activeTab === 'buildings' && <BuildingView />}
          {/* Add more tabs like science, interstellar etc here */}
        </div>
      </main>

      <NotificationToast />
    </div>
  );
}