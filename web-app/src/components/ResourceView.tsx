import { useGameStore } from '../store/gameStore';
import { RESOURCES } from '../lib/resources';

export default function ResourceView() {
  const resources = useGameStore((state) => state.resources);

  // Group by category (simplified for this dashboard)
  const categories = ['earth', 'innerSol', 'outerSol', 'energy'];

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const catResources = Object.keys(resources)
          .filter(
            (key) => RESOURCES[key].category === cat && resources[key].unlocked
          )
          .map((key) => ({ id: key, data: RESOURCES[key], state: resources[key] }));

        if (catResources.length === 0) return null;

        return (
          <section key={cat} className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300 capitalize border-b border-gray-700 pb-2">
              {cat === 'innerSol' ? 'Inner Solar System' : cat === 'outerSol' ? 'Outer Solar System' : cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catResources.map((res) => {
                const percentage = (res.state.count / res.state.capacity) * 100;
                const isFull = percentage >= 100;

                return (
                  <div key={res.id} className="p-4 bg-gray-700 rounded-lg shadow-inner flex flex-col justify-between hover:bg-gray-600 transition-colors">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-medium text-gray-100">{res.data.name}</h3>
                        <span className={`text-sm font-bold ${
                          res.state.productionRate > 0 ? 'text-green-400' : res.state.productionRate < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {res.state.productionRate > 0 ? '+' : ''}
                          {res.state.productionRate.toFixed(2)}/s
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{res.data.desc}</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>{Math.floor(res.state.count).toLocaleString()}</span>
                        <span>{res.state.capacity.toLocaleString()} max</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2.5 overflow-hidden border border-gray-800">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            isFull ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}