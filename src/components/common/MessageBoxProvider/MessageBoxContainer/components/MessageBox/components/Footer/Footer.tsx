import * as React from 'react';
import { IMessageBoxButton } from '../../../../../../../../hooks/useMessageBox';
import makeResult from '../../../../../../../../utils/make/makeResult';

import styles from './Footer.module.scss';

export interface IFooterProps {
    buttons?: IMessageBoxButton[];
    onClose?: () => any;
}

export default function Footer(props: IFooterProps) {
    const handlerButtonClick = (callback?: () => any) => () => {
        if (callback) callback();
        if (props.onClose) props.onClose();
    };

    const buttonsElmnts = makeResult(() => {
        if (!props.buttons || props.buttons.length === 0) return null;

        return props.buttons.map((item, i) => {
            return (
                <button key={i} type='button' onClick={handlerButtonClick(item.onClick)}>
                    {item.label}
                </button>
            );
        });
    });
    return <div className={styles['footer']}>{buttonsElmnts}</div>;
}
