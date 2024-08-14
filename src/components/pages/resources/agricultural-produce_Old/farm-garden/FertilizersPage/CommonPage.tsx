import * as React from 'react';
import CommonArea from './components/CommonArea';
import CommonForm from './components/CommonForm';
import CommonProvider from './CommonProvider';

export interface ICommonPageProps {}

const CommonPage = (props: ICommonPageProps) => {
    return (
        <div>
            <CommonProvider>
                <CommonArea />
                <CommonForm />
            </CommonProvider>
        </div>
    );
};

export default CommonPage;
