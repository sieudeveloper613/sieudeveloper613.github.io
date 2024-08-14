import * as React from 'react';
import { ProvinceContext } from './ProvincePageProvider';

export default function useProvincePageStore() {
    return React.useContext(ProvinceContext);
}
