import * as React from 'react';
import { DriverContext } from './DriverProvider';

export default function useDriverStore() {
    return React.useContext(DriverContext);
}
