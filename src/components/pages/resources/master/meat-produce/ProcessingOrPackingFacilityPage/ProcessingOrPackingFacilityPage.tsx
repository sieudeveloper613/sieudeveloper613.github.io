import * as React from 'react';
import { EAgriculturalProducesRole, EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IProcessingOrPackingFacilityPageProps {}

export default function ProcessingOrPackingFacilityPage(props: IProcessingOrPackingFacilityPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.MeatProduce,
                role: EMeatProducesRole.processingFacility,
            }}
        />
    );
}
