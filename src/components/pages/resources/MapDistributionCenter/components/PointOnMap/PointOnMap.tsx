import { useState } from 'react';
import styles from './PointOnMap.module.scss';

export interface IMapDistributionCenterProps {
    lat?: number;
    lng?: number;
    text?: string;
}

const PointOnMap = (props: IMapDistributionCenterProps) => {
    const [isDisplayDescription, setIsDisplayDescription] = useState<boolean>(false);
    return (
        <div className={styles['wrapper-PointOnMap']}>
            <div
                onMouseEnter={() => {
                    setIsDisplayDescription(true);
                }}
                onMouseOut={() => {
                    setIsDisplayDescription(false);
                }}
                className={styles['icon']}
            >
                location_on
            </div>
            {isDisplayDescription && <p>{props.text}</p>}
        </div>
    );
};

export default PointOnMap;
