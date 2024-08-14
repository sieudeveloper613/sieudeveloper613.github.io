export const properties = {
    _id: 1,
    code: 1,
    ingredientId: 1,
    ingredientName: 1,
    processes: 1,
    isImported: 1,
    isDeclared: 1,
    createdAt: 1,
};

export interface IDatas {
    name: string,
    times: Date[],
}

export interface IProcess {
    data: IDatas[],
    isReset: boolean,
    createdAt?: Date,
}

export interface IData {
    _id: string;
    code: string;
    ingredientId: string;
    ingredientName: string;
    isDeclared: boolean,
    isImported: boolean,
    processes: IProcess[];
    createdAt: string;
}

export interface ICreate extends IData { }

export interface IUpdate extends IData { }

export interface IDelete {
    _id: string;
}
