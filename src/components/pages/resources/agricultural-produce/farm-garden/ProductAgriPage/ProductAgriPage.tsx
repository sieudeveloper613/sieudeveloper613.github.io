import React from 'react';
import ProductTypeArea from './components/ProductTypeArea';
import ProductTypeForm from './components/ProductTypeForm';
import ProductTypeProvider from './ProductTypeProvider';

type IProductTypePageProps = {};

function ProductAgriPage(props: IProductTypePageProps) {
    return (
        <ProductTypeProvider>
            <div>
                <ProductTypeArea />
                <ProductTypeForm />
            </div>
        </ProductTypeProvider>
    );
}

export default ProductAgriPage;
