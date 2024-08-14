import * as React from 'react';
import make from '../../../../../utils/make';
import Layer from '../../../Layer';
import useSelectionStore from '../../useSelectionStore';

import styles from './Input.module.scss';

export interface IInputProps {
    className?: string;
    placeholder?: string;
    selectedLabel: string | undefined;
    readonly?: boolean;
}

export default function Input(props: IInputProps) {
    const { isFocus, setFocus, inputValue, setInputValue } = useSelectionStore();

    const isEmpty = inputValue.trim().length === 0;

    return (
        <div className={make.className([styles['input'], props.className])}>
            <Layer
                className={{
                    layerWrap: styles['label-layer'],
                    layer: make.className(
                        [
                            //==
                            'layer', //==
                            'label', //==
                            make.result(() => {
                                if (!isFocus) return undefined;
                                if (!isEmpty) return 'hidden';
                                return 'faded';
                            }),
                        ],
                        styles,
                    ), //==
                }}
            >
                {props.selectedLabel || props.placeholder}
            </Layer>
            <Layer
                className={{
                    layerWrap: styles['input-layer'],
                    layer: make.className(['layer', 'input', isFocus && 'display'], styles),
                }}
            >
                <input
                    className={make.className([props.readonly && 'readonly'], styles)}
                    type='text'
                    value={inputValue}
                    placeholder={props.selectedLabel}
                    onFocus={() => {
                        if (props.readonly) return;
                        setFocus(true);
                    }}
                    onChange={(e) => {
                        if (props.readonly) return;
                        setInputValue(e.currentTarget.value);
                    }}
                />
            </Layer>
        </div>
    );
}
