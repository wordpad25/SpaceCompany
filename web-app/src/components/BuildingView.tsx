import { useGameStore } from '../store/gameStore';

export default function BuildingView() {
  const buyBuilding = useGameStore((state) => state.buyBuilding);
  const buildings = useGameStore((state) => state.buildings);
  const resources = useGameStore((state) => state.resources);

  const buildingList = [
    {
      id: 'miner',
      name: 'Miner',
      desc: 'Mines metal from the earth.',
      cost: { metal: 10 },
    },
    {
      id: 'pumpjack',
      name: 'Pumpjack',
      desc: 'Pumps oil out of the ground.',
      cost: { metal: 20 },
    },
    {
      id: 'woodcutter',
      name: 'Woodcutter',
      desc: 'Chops down trees for wood.',
      cost: { metal: 10 },
    },
    {
      id: 'charcoalEngine',
      name: 'Charcoal Engine',
      desc: 'Burns charcoal for energy.',
      cost: { metal: 50, gem: 25 },
    },
    {
      id: 'solarPanel',
      name: 'Solar Panel',
      desc: 'Generates free energy from the sun.',
      cost: { metal: 30, gem: 35 },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buildingList.map((building) => {
        // Compute if we can afford it based on current resource counts
        const canAfford = Object.entries(building.cost).every(
          ([res, cost]) => (resources[res]?.count || 0) >= cost
        );

        return (
          <div key={building.id} className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-100">{building.name}</h3>
                <span className="bg-gray-700 text-blue-300 text-xs font-bold px-2 py-1 rounded">
                  Owned: {buildings[building.id] || 0}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{building.desc}</p>
            </div>

            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Cost</h4>
                <ul className="text-xs space-y-1">
                  {Object.entries(building.cost).map(([res, cost]) => (
                    <li key={res} className="flex justify-between items-center bg-gray-900 p-2 rounded">
                      <span className="capitalize text-gray-300">{res}</span>
                      <span className={`font-mono ${
                        (resources[res]?.count || 0) >= cost ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {cost}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all shadow-md ${
                  canAfford
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600'
                }`}
                disabled={!canAfford}
                onClick={() => buyBuilding(building.id, building.cost)}
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}