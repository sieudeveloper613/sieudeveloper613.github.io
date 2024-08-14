import * as React from 'react';
import make from '../../../../../../../utils/make';
import { IWindowFormButton } from '../../WindowForm';
import styles from './Footer.module.scss';

export interface IFooterProps {
    buttons?: IWindowFormButton[];
    featch?: any;
}

export default function Footer(props: IFooterProps) {
    const buttonsElmnts = make.result(() => {
        if (!props.buttons || props.buttons.length === 0) return null;

        return props.buttons.map((item, i) => {
            if (i !== 0 && !props.featch) {
                return (
                    <button
                        key={`${i}_${item.label}`}
                        type='button'
                        style={{
                            color: item.color,
                            backgroundColor: item.backgroundColor,
                        }}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                );
            } else if (i == 2) {
                return (
                    <button
                        key={`${i}_${item.label}`}
                        type='button'
                        style={{
                            color: item.color,
                            backgroundColor: item.backgroundColor,
                        }}
                    >
                        Loading ...
                    </button>
                );
            }
        });
    });

    return <div className={styles['footer']}>{buttonsElmnts}</div>;
}
