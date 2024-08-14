import * as React from 'react';
import { IValidateResult } from '../../../core/types';
export interface ITextFieldProviderProps {}

export const TextFieldContext = React.createContext<{
    setValidResult: React.Dispatch<React.SetStateAction<IValidateResult>>;
    validResult: IValidateResult;
}>({} as any);

export default function TextFieldProvider(props: React.PropsWithChildren<ITextFieldProviderProps>) {
    const [validResult, setValidResult] = React.useState<IValidateResult>({
        status: 'valid',
    });

    return (
        <TextFieldContext.Provider
            value={{
                validResult,
                setValidResult,
            }}
        >
            {props.children}
        </TextFieldContext.Provider>
    );
}
