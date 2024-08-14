export interface ICreateSupplier {
    name: string;
}

// export interface IUpdateSupplier {
//     _id: string;
//     name: string;
// }

export interface ICreate {
    name: string;
    createSuppliers: ICreateSupplier[];
}

export interface IUpdate {
    createSuppliers: ICreateSupplier[];
    // updateSuppliers: IUpdateSupplier[];
    removeSuppliers: string[];
}
