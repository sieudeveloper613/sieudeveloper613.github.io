import * as React from 'react';
import make from '../../../../../utils/make';
import useSelectionStore from '../../useSelectionStore';
import styles from './ButtonDropdown.module.scss';

export interface IButtonDropdownProps {
    readonly?: boolean;
    onClick?: () => any;
}

export default function ButtonDropdown(props: IButtonDropdownProps) {
    const { setFocus, isFocus } = useSelectionStore();
    return (
        <button
            type='button'
            className={make.className(['button-dropdown', props.readonly && 'readonly'], styles)}
            onClick={() => {
                if (props.readonly) {
                    setFocus(false);
                    return;
                }
                setFocus((v) => !v);
            }}
        >
            {isFocus ? 'arrow_drop_up' : 'arrow_drop_down'}
        </button>
    );
}
