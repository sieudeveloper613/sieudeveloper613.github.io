import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface IDistributionCenterStatisticalReportsPageProps { }

export default function DistributionCenterStatisticalReportsPage(props: IDistributionCenterStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.distributionCenter} />;
}
