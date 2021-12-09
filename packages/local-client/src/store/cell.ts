export type CellTypes = 'code' | 'markdown';

export type DirectionTypes = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
