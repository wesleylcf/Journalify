import React, { Fragment, useEffect } from 'react';
import Cell from '../../components/Cell/Cell';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import AddCell from '../../components/AddCell/AddCellBar';
import SaveStatus from '../../components/SaveStatus/SaveStatus';
import './cellList.css';
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });
  const saving = useTypedSelector(({ cells: { saving } }) => saving);

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line
  }, []);
  console.log('cells', cells);
  let child = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <Cell cell={cell} />
        <AddCell prevId={cell.id} />
      </Fragment>
    );
  });
  return (
    <div className={`CellList`}>
      <SaveStatus saving={saving} />
      <AddCell forceVisible={cells.length === 0 ? true : false} prevId={null} />
      {child}
    </div>
  );
};

export default CellList;
