export interface IData {
    name: string; // Tên nguyên liệu
    process :IProcess[]
}
export interface IDataUpdate {
    process :IProcess[]
}
export interface IProcess {
    processId: string,
    name: string
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}
