import * as React from 'react';
import { EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface ISlaughterProcessingFacilityPage {}

export default function SlaughterProcessingFacilityPage(props: ISlaughterProcessingFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.MeatProduce,
                role: EMeatProducesRole.slaughterProcessingFacility,
            }}
        />
    );
}
