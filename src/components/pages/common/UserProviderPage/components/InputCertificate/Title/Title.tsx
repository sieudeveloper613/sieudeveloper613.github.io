import * as React from 'react';
import styles from './Title.module.scss';

export interface ITitleProps {
    value?: string;
}

export default function Title(props: ITitleProps) {
    if (props.value === undefined) return null;

    return (
        <div className={styles['title']}>
            <strong>{props.value}</strong>
        </div>
    );
}
