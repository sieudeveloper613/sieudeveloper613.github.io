import * as React from 'react';
import make from '../../../../../../../utils/make';
import { IWindowFormButton } from '../../WindowForm';
import styles from './Header.module.scss';

export interface IHeaderProps {
    title?: string;
    buttons?: IWindowFormButton[];
}

export default function Header(props: IHeaderProps) {
    const buttonsElmnts = make.result(() => {
        if (!props.buttons || props.buttons.length === 0) return null;

        return props.buttons.map((item, i) => {
            if (i === 0) {
                return (
                    <button
                        key={`${i}_${item.label}`}
                        type='button'
                        onClick={item.onClick}
                        style={{
                            width: item.width,
                            fontFamily: item.fontFamily
                        }}>
                        {item.label}
                    </button>
                );
            }
        });
    });

    return (
        <div className={styles['header']}>
            <strong>{props.title}</strong>
            <div className={styles['button-close']}>{buttonsElmnts}</div>
        </div>
    );
}
