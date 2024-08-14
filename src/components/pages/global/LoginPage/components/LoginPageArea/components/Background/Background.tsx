import * as React from 'react';
import images from '../../../../../../../../resources/images';
import make from '../../../../../../../../utils/make';

import styles from './Background.module.scss';

export interface IBackgroundProps {}

export default function Background(props: IBackgroundProps) {
    return (
        <div
            className={make.className([styles['background']])}
            style={{
                backgroundImage: `url('${images.logo}')`,
            }}
        ></div>
    );
}
