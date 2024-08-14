import * as React from 'react';
import { EFisheries, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IProcessingOrPackingFacilityPageProps {}

export default function ProcessingOrPackingFacilityPage(props: IProcessingOrPackingFacilityPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.fisheries,
                role: EFisheries.processingFacility,
            }}
        />
    );
}
