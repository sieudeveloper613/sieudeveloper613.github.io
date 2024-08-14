import * as React from 'react';
import make from '../../../../../../../../utils/make';

import styles from './Header.module.scss';

export interface IHeaderProps {
    title?: string;
    disableCloseButton?: boolean;

    onButtonCloseClick?: () => any;
}

export default function Header(props: IHeaderProps) {
    const title = make.result(() => {
        if (props.title === undefined) return 'Thông báo';
        return props.title;
    });

    const buttonsElmnts = make.result(() => {
        if (props.disableCloseButton) return null;

        return (
            <button type='button' onClick={props.onButtonCloseClick}>
                close
            </button>
        );
    });

    return (
        <div className={styles['header']}>
            <div className={styles['title']}>{title}</div>
            <div className={styles['buttons']}>{buttonsElmnts}</div>
        </div>
    );
}
