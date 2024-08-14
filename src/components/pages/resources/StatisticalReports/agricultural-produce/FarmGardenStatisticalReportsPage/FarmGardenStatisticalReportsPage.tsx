import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface IFarmGardenStatisticalReportsPageProps { }

export default function FarmGardenStatisticalReportsPage(props: IFarmGardenStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.farmOrGarden} />;
}