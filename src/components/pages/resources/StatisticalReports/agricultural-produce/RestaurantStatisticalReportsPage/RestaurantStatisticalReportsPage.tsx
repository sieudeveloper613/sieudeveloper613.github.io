import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface IRestaurantStatisticalReportsPageProps { }

export default function RestaurantStatisticalReportsPage(props: IRestaurantStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.restaurant} />;
}