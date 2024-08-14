import * as React from 'react';
import { EFisheries, EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ICatchFacilityPage {}

export default function CatchFacilityPage(props: ICatchFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.fisheries,
                role: EFisheries.catchFacility,
            }}
        />
    );
}
