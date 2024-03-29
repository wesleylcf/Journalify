import { Action } from 'redux';
import { ActionTypes } from '../action-types';
import { CellTypes, DirectionTypes, Cell } from '../cell';

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: DirectionTypes;
  };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: { cells: Cell[] };
}

export interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: {
    error: string;
  };
}

export interface SaveCellsStartAction {
  type: ActionTypes.SAVE_CELLS_START;
}

export interface SaveCellsCompleteAction {
  type: ActionTypes.SAVE_CELLS_COMPLETE;
}

export interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: {
    error: string;
  };
}
export type Actions =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellAfterAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsStartAction
  | SaveCellsCompleteAction
  | SaveCellsErrorAction;
