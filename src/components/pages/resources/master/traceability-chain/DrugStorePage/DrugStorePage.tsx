import * as React from 'react';
import { EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IDrugStorePage {}

export default function DrugStorePage(props: IDrugStorePage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.drupStore,
            }}
        />
    );
}
