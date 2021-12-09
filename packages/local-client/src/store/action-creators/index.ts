import { ActionTypes } from '../action-types';
import { DirectionTypes, CellTypes, Cell } from '../cell';
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Actions,
} from '../actions';
import { RootState } from '../reducers';
import bundle from '../../bundler';
import { Dispatch } from 'redux';
import axios from 'axios';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: {
      id,
    },
  };
};
export const moveCell = (
  id: string,
  direction: DirectionTypes
): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId: cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');
      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLETE,
        payload: { cells: data },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: { error: e.message },
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    const cells = order.map((id) => data[id]);
    try {
      dispatch({ type: ActionTypes.SAVE_CELLS_START });
      await axios.post('/cells', { cells: cells });
      setTimeout(() => {
        dispatch({ type: ActionTypes.SAVE_CELLS_COMPLETE });
      }, 500);
    } catch (e) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: {
          error: e.message,
        },
      });
    }
  };
};
