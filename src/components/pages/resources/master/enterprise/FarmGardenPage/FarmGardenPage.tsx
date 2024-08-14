import * as React from 'react';
import { EAgriculturalProducesRole, EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IFarmGardenPageProps {}

export default function FarmGardenPage(props: IFarmGardenPageProps) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.agriculturalProduce}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.farmOrGarden,
            }}
        />
    );
}
