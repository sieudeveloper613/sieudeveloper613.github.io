import * as React from 'react';
import { EAgriculturalProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IRestaurantPageProps {}

export default function RestaurantPage(props: IRestaurantPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.agriculturalProduce,
                role: EAgriculturalProducesRole.restaurant,
            }}
        />
    );
}
