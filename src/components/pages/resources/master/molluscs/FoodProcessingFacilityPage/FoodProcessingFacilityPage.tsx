import * as React from 'react';
import { EMeatProducesRole, EMolluscs, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IFoodProcessingFacilityPage {}

export default function FoodProcessingFacilityPage(props: IFoodProcessingFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.molluscs,
                role: EMolluscs.foodProcessingFacility,
            }}
        />
    );
}
