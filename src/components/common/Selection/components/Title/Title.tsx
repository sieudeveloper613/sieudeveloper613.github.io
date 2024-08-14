import * as React from 'react';
import { IMarkIsRequired } from '../../../TextField';
import styles from './Title.module.scss';

export interface ITitleProps {
    value?: string;
    markIsRequired?: boolean | IMarkIsRequired | 'default';
}

export default function Title(props: ITitleProps) {
    if (props.value === undefined) return null;

    if (!props.markIsRequired) {
        return (
            <div className={styles['title']}>
                <strong>{props.value}</strong>
            </div>
        );
    }

    const defaultConfig: Required<IMarkIsRequired> = {
        color: 'red',
        mark: '(*)',
    };

    if (typeof props.markIsRequired === 'object') {
        Object.assign(defaultConfig, props.markIsRequired);
    }

    return (
        <div className={styles['title']}>
            <strong>{props.value}</strong>
            <strong>
                &nbsp;
                <sup style={{ color: defaultConfig.color }}>{defaultConfig.mark}</sup>
            </strong>
        </div>
    );
}
