import * as React from 'react';
import make from '../../../../../utils/make';
import styles from './ButtonRemoveSelected.module.scss';

export interface IButtonRemoveSelectedProps {
    onClick: () => any;
    selectedValue?: string;
}

export default function ButtonRemoveSelected(props: IButtonRemoveSelectedProps) {
    return (
        <button
            type='button'
            className={make.className(
                [
                    //==
                    'button-remove-selected',
                    props.selectedValue !== undefined && 'display',
                ],
                styles,
            )}
            onClick={props.onClick}
        >
            close
        </button>
    );
}
