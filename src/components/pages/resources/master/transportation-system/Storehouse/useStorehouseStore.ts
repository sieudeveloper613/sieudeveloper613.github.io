import * as React from 'react';
import { StorehouseContext } from './StorehouseProvider';

export default function useStorehouseStore() {
    return React.useContext(StorehouseContext);
}
