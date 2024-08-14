import * as React from 'react';
import { Link } from 'react-router-dom';
import images from '../../../../resources/images';
import make from '../../../../utils/make';
import Layer from '../../../common/Layer';
import styles from './NotFoundPage.module.scss';

export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
    return (
        <div className={make.className(['not-found-page'])}>
            <Layer
                className={{
                    layerWrap: styles['layer-wrap'],
                    layer: styles['layer'],
                }}
            >
                <div className={styles['background']} style={{ backgroundImage: `url('${images.logo}')` }} />
            </Layer>

            <Layer
                className={{
                    layerWrap: styles['layer-wrap'],
                    layer: styles['layer'],
                }}
            >
                <div className={styles['content']}>
                    <div className={styles['not-found']}>404</div>
                    <div className={styles['message']}>Xin lỗi, chúng tôi không tìm thấy trang bạn yêu cầu</div>
                    <Link to={'/'} className={styles['link-to-home']}>
                        Trở về trang chủ
                    </Link>
                </div>
            </Layer>
        </div>
    );
}
