export interface IProps {
  prepareRow: Function;
  getTableBodyProps: Function;
  height?: string;
  rows: rows[];
  onClickHandler?: Function;
  loading?: boolean;
}

interface rows {
  getRowProps: Function;
  original: Object;
  cells: {
    render: Function;
    getCellProps: Function;
    column?: any;
  }[];
}
