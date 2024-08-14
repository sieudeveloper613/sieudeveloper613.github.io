import * as React from 'react';
import { EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IFoodProcessingFacilityPage {}

export default function FoodProcessingFacilityPage(props: IFoodProcessingFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.MeatProduce,
                role: EMeatProducesRole.foodProcessingFacility,
            }}
        />
    );
}
