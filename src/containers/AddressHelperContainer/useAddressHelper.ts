import * as React from 'react';
import { AddressHelperContext } from './AddressHelperContainer';

export default function useAddressHelper() {
    return React.useContext(AddressHelperContext);
}
