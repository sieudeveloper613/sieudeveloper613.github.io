import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface IDealerStoreStatisticalReportsPageProps { }

export default function DealerStoreStatisticalReportsPage(props: IDealerStoreStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.dealerStore} />;
}