import React from 'react';
import ProductTypeArea from './components/ProductTypeArea';
import ProductTypeForm from './components/ProductTypeForm';
import ProductTypeProvider from './ProductTypeProvider';

type IProductTypePageProps = {};

function ProductProcessingPage(props: IProductTypePageProps) {
    return (
        <ProductTypeProvider>
            <div>
                <ProductTypeArea />
                <ProductTypeForm />
            </div>
        </ProductTypeProvider>
    );
}

export default ProductProcessingPage;
