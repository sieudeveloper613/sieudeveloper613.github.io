import * as React from 'react';
import { EMeatProducesRole, EMolluscs, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IFeedProcessingFacilityPage {}

export default function FeedProcessingFacilityPage(props: IFeedProcessingFacilityPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.molluscs,
                role: EMolluscs.feedProcessingFacility,
            }}
        />
    );
}
