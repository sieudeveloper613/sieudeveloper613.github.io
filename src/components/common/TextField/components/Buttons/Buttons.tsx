import * as React from 'react';
import { ITextFieldButton, ITextFieldButtonEventData } from '../../types';

import styles from './Buttons.module.scss';

export interface IButtonsProps {
    buttons?: ITextFieldButton[];
    value?: string;
    onChange?: (v: string) => any;
    onBtnFocusClick?: () => any;
}

export default function Buttons(props: IButtonsProps) {
    if (!props.buttons || props.buttons.length === 0) return null;

    const handlerBtnClick = (callback?: (e: ITextFieldButtonEventData) => any) => () => {
        if (callback)
            callback({
                get value() {
                    return props.value || '';
                },
                set value(v: string) {
                    if (props.onChange) props.onChange(v);
                },
                focus() {
                    if (props.onBtnFocusClick) props.onBtnFocusClick();
                },
            });
    };

    const buttonsElmnts = props.buttons.map((item, i) => {
        return (
            <button
                key={`${i}_${item.icon}_${item.iconColor}_${item.backgroundColor}`}
                type='button'
                onClick={handlerBtnClick(item.onClick)}
                style={{
                    color: item.iconColor,
                    backgroundColor: item.backgroundColor,
                }}
            >
                {item.icon}
            </button>
        );
    });

    return <div className={styles['buttons']}>{buttonsElmnts}</div>;
}
