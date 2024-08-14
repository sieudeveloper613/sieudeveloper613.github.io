import * as React from 'react';
import { EResource, ETraceabilityChain, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IDealerPage {}

export default function DealerPage(props: IDealerPage) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.other}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.dealerStore,
            }}
        />
    );
}
