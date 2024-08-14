import * as React from 'react';
import { EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ILogisticsPageProps { }

export default function LogisticsPage(props: ILogisticsPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.companyLogistic,
            }}
        />
    );
}
