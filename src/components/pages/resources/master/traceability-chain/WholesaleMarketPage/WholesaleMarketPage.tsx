import * as React from 'react';
import { EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IWholesaleMarketPage {}

export default function WholesaleMarketPage(props: IWholesaleMarketPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.wholesaleMarket,
            }}
        />
    );
}
