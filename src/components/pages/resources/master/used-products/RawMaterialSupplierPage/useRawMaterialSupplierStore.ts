import * as React from 'react';
import { RawMaterialSupplierContext } from './RawMaterialSupplierProvider';

export default function useRawMaterialSupplierStore() {
    return React.useContext(RawMaterialSupplierContext);
}
