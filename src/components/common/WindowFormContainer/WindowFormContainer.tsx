import * as React from 'react';
import make from '../../../utils/make';
import Cover from '../Cover';

import styles from './WindowFormContainer.module.scss';

export interface IWindowFormProps {
    className?: string;
    display?: boolean;
}

export default function WindowFormContainer(props: React.PropsWithChildren<IWindowFormProps>) {
    return (
        <div
            className={make.className([
                styles['window-form-container'],
                props.display && styles['display'],
                props.className,
            ])}
        >
            <div className={styles['container']}>
                <Cover display={props.display} />
                {props.children}
            </div>
        </div>
    );
}
