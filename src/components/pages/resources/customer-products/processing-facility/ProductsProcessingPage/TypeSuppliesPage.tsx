
import * as React from 'react';
import CommonArea from './components/CommonArea';
import CommonForm from './components/CommonForm';
import CommonProvider from './CommonProvider';

export interface ICommonPageProps {}

const TypeSuppliesPage = (props: ICommonPageProps) => {
    return (
        <div>
            <CommonProvider>
                <CommonArea />
                <CommonForm />
            </CommonProvider>
        </div>
    );
};

export default TypeSuppliesPage;
