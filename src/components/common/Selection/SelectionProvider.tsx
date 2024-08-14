import * as React from 'react';
import { IValidateResult } from '../../../core/types';
import { ISelectionProps } from './Selection';

export const SelectionContext = React.createContext<{
    isFocus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;

    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;

    validResult: IValidateResult;
    setValidResult: React.Dispatch<React.SetStateAction<IValidateResult>>;
}>({} as any);

export default function SelectionProvider(props: React.PropsWithChildren<ISelectionProps>) {
    const [isFocus, setFocus] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [validResult, setValidResult] = React.useState<IValidateResult>({
        status: 'valid',
    });

    return (
        <SelectionContext.Provider
            value={{
                isFocus,
                setFocus,

                inputValue,
                setInputValue,

                validResult,
                setValidResult,
            }}
        >
            {props.children}
        </SelectionContext.Provider>
    );
}
