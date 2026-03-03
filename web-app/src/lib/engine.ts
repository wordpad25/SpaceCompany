import { ResourceState } from './resources';

export interface GameState {
  resources: Record<string, ResourceState>;
  buildings: Record<string, number>;
}

export function calculateEnergyOutput(state: GameState, delta: number): number {
  let output = 0;

  // Basic charcoal engine
  const charcoalEngines = state.buildings.charcoalEngine || 0;
  if (state.resources.charcoal?.count >= charcoalEngines * 1 * delta) {
    output += charcoalEngines * 2;
  }

  // Basic solar panel
  const solarPanels = state.buildings.solarPanel || 0;
  output += solarPanels * 1.5;

  return output;
}

export function calculateResourceGeneration(state: GameState, delta: number): Partial<Record<string, number>> {
  const gains: Partial<Record<string, number>> = {};

  // Calculate gains for each resource based on buildings
  // E.g., Pumpjack generates 1 Oil per second
  const pumpjacks = state.buildings.pumpjack || 0;
  gains.oil = (gains.oil || 0) + (pumpjacks * 1 * delta);

  const miners = state.buildings.miner || 0;
  gains.metal = (gains.metal || 0) + (miners * 1 * delta);

  const woodcutters = state.buildings.woodcutter || 0;
  gains.wood = (gains.wood || 0) + (woodcutters * 1 * delta);

  // Consume resources for energy
  const charcoalEngines = state.buildings.charcoalEngine || 0;
  if (state.resources.charcoal?.count >= charcoalEngines * 1 * delta) {
    gains.charcoal = (gains.charcoal || 0) - (charcoalEngines * 1 * delta);
  }

  return gains;
}

export function processTick(state: GameState, delta: number): GameState {
  const newState = { ...state, resources: { ...state.resources } };

  const gains = calculateResourceGeneration(newState, delta);

  for (const [id, gain] of Object.entries(gains)) {
    if (newState.resources[id]) {
      const res = newState.resources[id];
      newState.resources[id] = {
        ...res,
        count: Math.min(res.capacity, Math.max(0, res.count + gain)),
      };
    }
  }

  // Energy logic
  const energyOutput = calculateEnergyOutput(newState, delta);
  if (newState.resources.energy) {
    const res = newState.resources.energy;
    // Energy is an instantaneous rate, or cap at capacity
    newState.resources.energy = {
      ...res,
      count: Math.min(res.capacity, Math.max(0, res.count + energyOutput)),
    };
  }

  return newState;
}