export interface IData {
    code: string;
    ingredientId: string;
    ingredientName: string;
    processNames: string[],
}

export interface IUpdateProcess {
    processes: {
        id: string,
        times: Date[]
    }[]
}

export interface ICreate extends IData { }

export interface IUpdate extends IData { }

export const dataKeys = Object.freeze(['code'] as (keyof IData)[]);
