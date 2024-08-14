import * as React from 'react';
import TCSSProperties from '../../../../../core/styles/TCSSProperties';
import make from '../../../../../utils/make';
import { ITextFieldButton } from '../../types';
import Buttons from '../Buttons';

import styles from './Input.module.scss';

export interface IInputProps {
    buttons?: ITextFieldButton[];
    readonly?: boolean;
    nonButton?: number;
    touched?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (v: string) => any;
}

export default function Input(props: IInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState<Boolean>(true);
    const handlerBtnFocusClick = React.useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }, []);

    const handlerInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const v = e.currentTarget.value;
        if (props.onChange) {
            props.onChange(v);
            setFocus(false);
        }
    };

    React.useEffect(() => {
        if (props.touched && focus) {
            setTimeout(() => {
                handlerBtnFocusClick();
            }, 2000);
        } else {
            return;
        }
    }, [focus]);

    return (
        <div
            className={make.className(
                [
                    'input', //==
                    props.readonly && 'readonly', //==
                ],
                styles,
            )}
            style={
                {
                    '--buttons-length': props.buttons?.length || props.nonButton,
                } as TCSSProperties
            }
        //==
        >
            <input
                type={'text'}
                placeholder={props.placeholder}
                ref={inputRef}
                value={props.value}
                readOnly={props.readonly}
                //==
                onChange={
                    //==
                    Boolean(props.readonly) //==
                        ? undefined
                        : handlerInputChange
                }
            />
            <Buttons
                buttons={props.buttons}
                value={props.value}
                //==
                onBtnFocusClick={handlerBtnFocusClick}
                onChange={props.onChange}
            />
        </div>
    );
}
