import React from 'react';
import ProductManageArea from './components/ProductManageArea';
import ProductManageForm from './components/ProductManageForm';
import ProductManageProvider from './ProductManageProvider';

type IProductManagePageProps = {};

function ProductManagePage(props: IProductManagePageProps) {
    return (
        <ProductManageProvider>
            <div>
                <ProductManageArea />
                <ProductManageForm />
            </div>
        </ProductManageProvider>
    );
}

export default ProductManagePage;