import * as React from 'react';
import { EAgriculturalProducesRole, EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IProcessingOrPackingFacilityPageProps {}

export default function ProcessingOrPackingFacilityPage(props: IProcessingOrPackingFacilityPageProps) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.agriculturalProduce}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.processingFacility,
            }}
        />
    );
}
