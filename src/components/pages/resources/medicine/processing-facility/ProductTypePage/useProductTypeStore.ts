import * as React from 'react';
import { ProductTypeContext } from './ProductTypeProvider';

export default function useProductTypeStore() {
    return React.useContext(ProductTypeContext);
}
