import * as React from 'react';
import make from '../../../utils/make';

import styles from './Cover.module.scss';

export interface ICoverProps {
    className?: string;
    display?: boolean;

    onClick?: () => any;
}

export default function Cover(props: ICoverProps) {
    return (
        <div className={make.className([styles['cover'], props.className, props.display && styles['display']])}>
            <div onMouseDown={props.onClick} />
        </div>
    );
}
