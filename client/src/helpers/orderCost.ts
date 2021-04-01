const HOUR_COST = 10;

export const orderCostBySize = (size: string): number => +size * HOUR_COST;