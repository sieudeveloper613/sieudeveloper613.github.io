import useMapDistributionCenterStore from '../../useMapDistributionCenterStore';
import styles from './MapDistributionCenterArea.module.scss';
import GoogleMapReact from 'google-map-react';
import PointOnMap from '../PointOnMap';
import { useCallback } from 'react';
import { IDefaultLocation } from '../../MapDistributionCenterProvider';

export interface IMapDistributionCenterProps {}

const MapDistributionCenterArea = (props: IMapDistributionCenterProps) => {
    const { defaultLocation, setDefaultLocation, locationPartners } = useMapDistributionCenterStore();

    const renderLocationPartners = useCallback(() => {
        return locationPartners.map((locationPartner) => (
            <PointOnMap
                key={locationPartner.name}
                lat={locationPartner.lat}
                lng={locationPartner.lng}
                text={locationPartner.name}
            />
        ));
    }, [locationPartners]);

    const handleChildClick = (name: string, info: any) => {
        const location = {
            center: {
                lat: info.lat,
                lng: info.lng,
            },
            zoom: 6,
        } as IDefaultLocation;
        setDefaultLocation(location);
    };
    return (
        <div className={styles['wrapper-MapDistributionCenterArea']}>
            <GoogleMapReact
                center={defaultLocation.center}
                defaultCenter={defaultLocation.center}
                defaultZoom={defaultLocation.zoom}
                onChildClick={handleChildClick}
            >
                {renderLocationPartners()}
            </GoogleMapReact>
        </div>
    );
};

export default MapDistributionCenterArea;
