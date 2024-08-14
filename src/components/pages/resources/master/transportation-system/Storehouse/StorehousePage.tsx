import * as React from 'react';
import StorehouseArea from './components/StorehouseArea';
import StorehouseForm from './components/StorehouseForm';
import StorehouseProvider from './StorehouseProvider';
export interface IStorehousePageProps {}

export default function StorehousePage(props: IStorehousePageProps) {
    return (
        <StorehouseProvider>
            <StorehouseArea />
            <StorehouseForm />
        </StorehouseProvider>
    );
}
