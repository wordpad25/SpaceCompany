import { describe, it, expect } from 'vitest';
import { GameState, calculateResourceGeneration, calculateEnergyOutput, processTick } from './engine';

describe('Game Engine', () => {
  it('should generate resources based on buildings', () => {
    const state: GameState = {
      resources: {
        oil: { count: 0, capacity: 50, unlocked: true, productionRate: 0 }
      },
      buildings: {
        pumpjack: 2 // 2 * 1 oil per second
      }
    };

    const gains = calculateResourceGeneration(state, 1);
    expect(gains.oil).toBe(2);
  });

  it('should calculate energy output for solar panels', () => {
    const state: GameState = {
      resources: {},
      buildings: {
        solarPanel: 4 // 4 * 1.5 energy per second
      }
    };

    const energy = calculateEnergyOutput(state, 1);
    expect(energy).toBe(6);
  });

  it('should process tick and respect capacity limits', () => {
    const state: GameState = {
      resources: {
        wood: { count: 48, capacity: 50, unlocked: true, productionRate: 0 }
      },
      buildings: {
        woodcutter: 5 // should generate 5 wood, but cap is 50
      }
    };

    const newState = processTick(state, 1);
    expect(newState.resources.wood?.count).toBe(50); // Capped at 50
  });

  it('should consume resources for energy production', () => {
    const state: GameState = {
      resources: {
        charcoal: { count: 10, capacity: 50, unlocked: true, productionRate: 0 },
        energy: { count: 0, capacity: 100, unlocked: true, productionRate: 0 }
      },
      buildings: {
        charcoalEngine: 1 // consumes 1 charcoal, produces 2 energy
      }
    };

    const newState = processTick(state, 1);
    // 1 charcoal used
    expect(newState.resources.charcoal?.count).toBe(9);
    // 2 energy produced
    expect(newState.resources.energy?.count).toBe(2);
  });
});