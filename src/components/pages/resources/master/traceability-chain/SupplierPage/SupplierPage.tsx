import * as React from 'react';
import { EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ISupplierPage {}

export default function SupplierPage(props: ISupplierPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.supplierPage,
            }}
        />
    );
}
