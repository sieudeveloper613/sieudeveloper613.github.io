import * as React from 'react';
import { EFisheries, EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IPortFacilityPage {}

export default function PortFacilityPage(props: IPortFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.fisheries,
                role: EFisheries.portFacility,
            }}
        />
    );
}
