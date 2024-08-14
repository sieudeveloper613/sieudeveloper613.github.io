import * as React from 'react';
import { EAgriculturalProducesRole, EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ISupermarketPageProps {}

export default function SupermarketPage(props: ISupermarketPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.supermarket,
            }}
        />
    );
}
