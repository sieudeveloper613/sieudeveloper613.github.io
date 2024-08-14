import * as React from 'react';
import { EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IDistributionCenterPage {}

export default function DistributionCenterPage(props: IDistributionCenterPage) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.other}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.distributionCenter,
            }}
        />
    );
}
