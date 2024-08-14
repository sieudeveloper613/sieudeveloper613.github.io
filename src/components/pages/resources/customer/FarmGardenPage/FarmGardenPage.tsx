import * as React from 'react';
import { EAgriculturalProducesRole, EResource } from '../../../../../sharetype/TPermission';
import UserAccountPage from '../../../common/UserAccountPage';

export interface IFarmGardenPageProps {}

export default function FarmGardenPage(props: IFarmGardenPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.agriculturalProduce,
                role: EAgriculturalProducesRole.farmOrGarden,
            }}
        />
    );
}
