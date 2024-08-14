import * as React from 'react';
import { EMeatProducesRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IFeedProcessingFacilityPage {}

export default function FeedProcessingFacilityPage(props: IFeedProcessingFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.MeatProduce,
                role: EMeatProducesRole.feedProcessingFacility,
            }}
        />
    );
}
