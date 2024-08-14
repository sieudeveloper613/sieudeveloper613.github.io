import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface ISupermarketStatisticalReportsPageProps { }

export default function SupermarketStatisticalReportsPage(props: ISupermarketStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.supermarket} />;
}