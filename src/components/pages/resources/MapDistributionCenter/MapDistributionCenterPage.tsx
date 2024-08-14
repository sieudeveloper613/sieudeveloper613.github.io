import MapDistributionCenterArea from './components/MapDistributionCenterArea';
import MapDistributionCenterProvider from './MapDistributionCenterProvider';

export interface IMapDistributionCenterProps {}

const MapDistributionCenterPage = (props: IMapDistributionCenterProps) => {
    return (
        <MapDistributionCenterProvider>
            <MapDistributionCenterArea />
        </MapDistributionCenterProvider>
    );
};

export default MapDistributionCenterPage;
