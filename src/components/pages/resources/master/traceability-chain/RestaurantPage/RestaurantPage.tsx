import * as React from 'react';
import { EResource, ETraceabilityChain, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IRestaurantPage {}

export default function RestaurantPage(props: IRestaurantPage) {
    return (
        <UserAccountPage
            typeUser={ETypeUser.other}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.restaurant,
            }}
        />
    );
}
