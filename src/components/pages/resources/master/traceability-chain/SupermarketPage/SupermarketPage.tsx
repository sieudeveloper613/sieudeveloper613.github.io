import * as React from 'react';
import { EResource, ETraceabilityChain, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ISupermarketPage {}

export default function SupermarketPage(props: ISupermarketPage) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.other}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.supermarket,
            }}
        />
    );
}
