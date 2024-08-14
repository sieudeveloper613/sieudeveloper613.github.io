import * as React from 'react';

import { MapDistributionCenterContext } from './MapDistributionCenterProvider';

export default function useMapDistributionCenterStore() {
    return React.useContext(MapDistributionCenterContext);
}
