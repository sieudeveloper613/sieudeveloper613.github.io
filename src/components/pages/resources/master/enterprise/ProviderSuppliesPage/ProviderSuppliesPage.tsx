import * as React from 'react';
import { EAgriculturalProducesRole, EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserProviderPage from '../../../../common/UserProviderPage';

export interface IFarmGardenPageProps {}

export default function ProviderSuppliesPage(props: IFarmGardenPageProps) {
    return (
        <UserProviderPage
            typeUser={ETypeUser.agriculturalProduce}
            permission={{
                resource: 'provider',
                role: 'provider',
            }}
        />
    );
}
