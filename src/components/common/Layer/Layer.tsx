import * as React from 'react';
import make from '../../../utils/make';

import styles from './Layer.module.scss';

export interface ILayerProps {
    width?: string;
    height?: string;

    className?: {
        layerWrap?: string;
        layer?: string;
    };
}

export default function Layer(props: React.PropsWithChildren<ILayerProps>) {
    return (
        <div
            className={make.className([styles['layer-wrap'], props.className?.layerWrap])}
            style={{
                width: props.width,
            }}
        >
            <div
                className={make.className([styles['layer'], props.className?.layer])}
                style={{
                    width: props.width,
                    height: props.height,
                }}
            >
                {props.children}
            </div>
        </div>
    );
}
