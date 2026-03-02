interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'resources', label: 'Resources' },
    { id: 'buildings', label: 'Buildings' },
    { id: 'science', label: 'Science' },
    { id: 'interstellar', label: 'Interstellar' },
  ];

  return (
    <aside className="w-64 flex-none border-r border-gray-700 bg-gray-800 flex flex-col h-full shadow-lg">
      <div className="p-6 pb-4">
        <h2 className="text-xl font-bold tracking-wider text-blue-400">Space Company</h2>
      </div>

      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-2 px-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 text-xs text-center text-gray-500">
        React + Vite + TS Port
      </div>
    </aside>
  );
}