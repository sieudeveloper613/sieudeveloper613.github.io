import * as React from 'react';
import Title from './Title';
import styles from './InputCertificate.module.scss';
import Layer from '../../../../../common/Layer';

export interface IInputCertificateProps {
    title?: string;
}

function InputCertificate(props: IInputCertificateProps) {
    return (
        <div className={styles['input-certificate']}>
            <Title value={props.title} />
            <div className={styles['container']}>
                <div className={styles['input-wrap']}>
                    <Layer className={{ layer: styles['layer'], layerWrap: styles['layer-wrap'] }}>
                        <div className={styles['icon']}>add_circle</div>
                    </Layer>
                    <Layer className={{ layer: styles['layer'], layerWrap: styles['layer-wrap'] }}>
                        <input type={'file'} />
                    </Layer>
                </div>
            </div>
        </div>
    );
}

export default React.memo(InputCertificate);
