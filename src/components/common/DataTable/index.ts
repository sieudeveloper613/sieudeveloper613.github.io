import DataTable, { ITableCell } from "./DataTable";

export interface INumberRowConfig {
    step?: number;
    startWith?: number;

    title?: string;
    minWidth?: string;
    
    sortBy?: "ascending" | "descending";
}

export type { ITableCell };
export default DataTable;
