import { create } from 'zustand';
import { GameState, processTick, calculateResourceGeneration, calculateEnergyOutput } from '../lib/engine';
import { RESOURCES, ResourceState } from '../lib/resources';

interface StoreState extends GameState {
  tick: (delta: number) => void;
  buyBuilding: (id: string, cost: Record<string, number>) => void;
  unlockResource: (id: string) => void;
}

const initialResources: Record<string, ResourceState> = {};
for (const [key, data] of Object.entries(RESOURCES)) {
  initialResources[key] = {
    count: 0,
    capacity: data.baseCapacity,
    unlocked: data.unlocked,
    productionRate: 0,
  };
}

export const useGameStore = create<StoreState>((set) => ({
  resources: initialResources,
  buildings: {},

  tick: (delta: number) => {
    set((state) => {
      const nextState = processTick(state, delta);

      // Update production rates for UI
      const gains = calculateResourceGeneration(nextState, 1);

      for (const [id, gain] of Object.entries(gains)) {
        if (nextState.resources[id]) {
           nextState.resources[id] = {
             ...nextState.resources[id],
             productionRate: gain as number,
           };
        }
      }

      // Energy production is handled specially
      const energyOutput = calculateEnergyOutput(nextState, 1);
      if (nextState.resources.energy) {
         nextState.resources.energy = {
           ...nextState.resources.energy,
           productionRate: energyOutput,
         };
      }

      return nextState;
    });
  },

  buyBuilding: (id: string, costs: Record<string, number>) => {
    set((state) => {
      // Check if we can afford it
      for (const [resId, cost] of Object.entries(costs)) {
        if (!state.resources[resId] || state.resources[resId].count < cost) {
          return state; // Can't afford
        }
      }

      // Deduct costs
      const newResources = { ...state.resources };
      for (const [resId, cost] of Object.entries(costs)) {
        newResources[resId] = {
          ...newResources[resId],
          count: newResources[resId].count - cost,
        };
      }

      // Add building
      return {
        ...state,
        resources: newResources,
        buildings: {
          ...state.buildings,
          [id]: (state.buildings[id] || 0) + 1,
        },
      };
    });
  },

  unlockResource: (id: string) => {
    set((state) => {
      if (!state.resources[id]) return state;
      return {
        ...state,
        resources: {
          ...state.resources,
          [id]: {
            ...state.resources[id],
            unlocked: true,
          }
        }
      };
    });
  }
}));