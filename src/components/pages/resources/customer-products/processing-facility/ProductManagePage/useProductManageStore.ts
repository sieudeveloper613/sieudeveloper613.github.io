import * as React from 'react';
import { ProductManageContext } from './ProductManageProvider';

export default function useProductManageStore() {
    return React.useContext(ProductManageContext);
}