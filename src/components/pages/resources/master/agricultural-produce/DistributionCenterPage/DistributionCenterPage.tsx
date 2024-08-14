import * as React from 'react';
import { EAgriculturalProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IDistributionCenterPageProps {}

export default function DistributionCenterPage(props: IDistributionCenterPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.agriculturalProduce,
                role: EAgriculturalProducesRole.distributionCenter,
            }}
        />
    );
}
