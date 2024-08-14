import * as React from 'react';
import TCSSProperties from '../../../../../core/styles/TCSSProperties';
import make from '../../../../../utils/make';

import styles from './Input.module.scss';

export interface IInputProps {
    touched?: boolean;
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
                ],
                styles,
            )}
        //==
        >
            <input
                type={'file'}
                ref={inputRef}
                value={props.value}
                //==
                onChange={handlerInputChange}
            />
        </div>
    );
}
