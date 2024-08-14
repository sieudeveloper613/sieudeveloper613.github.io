import * as React from 'react';
import { IValidateResult } from '../../../core/types';
export interface IImageFieldProviderProps { }

export const ImageFieldContext = React.createContext<{
    setValidResult: React.Dispatch<React.SetStateAction<IValidateResult>>;
    validResult: IValidateResult;
}>({} as any);

export default function ImageFieldProvider(props: React.PropsWithChildren<IImageFieldProviderProps>) {
    const [validResult, setValidResult] = React.useState<IValidateResult>({
        status: 'valid',
    });

    return (
        <ImageFieldContext.Provider
            value={{
                validResult,
                setValidResult,
            }}
        >
            {props.children}
        </ImageFieldContext.Provider>
    );
}
