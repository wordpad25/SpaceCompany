export type ResourceCategory = 'earth' | 'innerSol' | 'outerSol' | 'energy' | 'special';

export interface ResourceData {
  id: string;
  name: string;
  desc: string;
  category: ResourceCategory;
  baseCapacity: number;
  unlocked: boolean;
}

export const RESOURCES: Record<string, ResourceData> = {
  plasma: { id: 'plasma', name: 'Plasma', desc: 'The 4th state of matter.', category: 'energy', baseCapacity: 100000, unlocked: false },
  energy: { id: 'energy', name: 'Energy', desc: 'Energy is required for many machines.', category: 'energy', baseCapacity: 100000, unlocked: true },
  uranium: { id: 'uranium', name: 'Uranium', desc: 'Uranium is used for nuclear power.', category: 'energy', baseCapacity: 50, unlocked: false },
  lava: { id: 'lava', name: 'Lava', desc: 'Lava is used for magmatic power.', category: 'energy', baseCapacity: 50, unlocked: false },
  oil: { id: 'oil', name: 'Oil', desc: 'Oil is pumped from the ground.', category: 'earth', baseCapacity: 50, unlocked: true },
  metal: { id: 'metal', name: 'Metal', desc: 'Metal is one of the primary resources.', category: 'earth', baseCapacity: 50, unlocked: true },
  gem: { id: 'gem', name: 'Gem', desc: 'Gems are one of the primary resources.', category: 'earth', baseCapacity: 50, unlocked: true },
  charcoal: { id: 'charcoal', name: 'Charcoal', desc: 'Charcoal is created by burning wood.', category: 'earth', baseCapacity: 50, unlocked: false },
  wood: { id: 'wood', name: 'Wood', desc: 'Wood is one of the primary resources.', category: 'earth', baseCapacity: 50, unlocked: true },
  silicon: { id: 'silicon', name: 'Silicon', desc: 'Silicon is useful for automatic mining.', category: 'earth', baseCapacity: 50, unlocked: false },
  lunarite: { id: 'lunarite', name: 'Lunarite', desc: 'Lunarite is found on the Moon.', category: 'innerSol', baseCapacity: 50, unlocked: false },
  methane: { id: 'methane', name: 'Methane', desc: 'Methane is a gas found on Venus.', category: 'innerSol', baseCapacity: 50, unlocked: false },
  titanium: { id: 'titanium', name: 'Titanium', desc: 'Titanium is a metal found on Mars.', category: 'innerSol', baseCapacity: 50, unlocked: false },
  gold: { id: 'gold', name: 'Gold', desc: 'Gold is found in asteroids.', category: 'innerSol', baseCapacity: 50, unlocked: false },
  silver: { id: 'silver', name: 'Silver', desc: 'Silver is found in the asteroid belt.', category: 'innerSol', baseCapacity: 50, unlocked: false },
  hydrogen: { id: 'hydrogen', name: 'Hydrogen', desc: 'Hydrogen is common on gas giants.', category: 'outerSol', baseCapacity: 50, unlocked: false },
  helium: { id: 'helium', name: 'Helium', desc: 'Helium is common on gas giants.', category: 'outerSol', baseCapacity: 50, unlocked: false },
  ice: { id: 'ice', name: 'Ice', desc: 'Ice is collected on Pluto.', category: 'outerSol', baseCapacity: 50, unlocked: false },
  meteorite: { id: 'meteorite', name: 'Meteorite', desc: 'Creating Meteorite needs Plasma.', category: 'outerSol', baseCapacity: 50, unlocked: false },
  science: { id: 'science', name: 'Science Production', desc: 'Science is used for researching.', category: 'special', baseCapacity: 1000000, unlocked: false },
};

export interface ResourceState {
  count: number;
  capacity: number;
  unlocked: boolean;
  productionRate: number;
}