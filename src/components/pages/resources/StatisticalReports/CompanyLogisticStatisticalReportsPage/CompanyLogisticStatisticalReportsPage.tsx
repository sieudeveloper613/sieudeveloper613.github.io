import * as React from 'react';
import { EStatisticalReportsRole } from '../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../common/StatisticalReportsPage';

export interface ICompanyLogisticStatisticalReportsPageProps { }

export default function CompanyLogisticStatisticalReportsPage(props: ICompanyLogisticStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.companyLogistic} />;
}