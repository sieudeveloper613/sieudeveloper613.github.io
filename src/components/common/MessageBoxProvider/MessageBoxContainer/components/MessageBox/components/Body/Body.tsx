import * as React from 'react';
import make from '../../../../../../../../utils/make';
import styles from './Body.module.scss';

export interface IBodyProps {
    icon?: string;
    iconColor?: string;
    message: string;
    messageColor?: string;
}

export default function Body(props: IBodyProps) {
    const iconElmnt = make.result(() => {
        if (!props.icon) return null;

        return (
            <div
                className={styles['icon']}
                style={{
                    color: props.iconColor,
                }}
            >
                {props.icon}
            </div>
        );
    });

    return (
        <div className={styles['body']}>
            {iconElmnt}
            <div
                className={make.className([styles['message'], !props.icon && styles['full-width']])}
                style={{
                    color: props.messageColor,
                }}
            >
                {props.message}
            </div>
        </div>
    );
}
