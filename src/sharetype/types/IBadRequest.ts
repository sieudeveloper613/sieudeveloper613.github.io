export interface IBadRequestError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

export default interface IBadRequest {
    error: IBadRequestError[];
}
