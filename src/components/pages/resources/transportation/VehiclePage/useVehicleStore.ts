import React from 'react';
import { VehicleContext } from './VehicleProvider';

export function useVehicleStore() {
    return React.useContext(VehicleContext);
}
