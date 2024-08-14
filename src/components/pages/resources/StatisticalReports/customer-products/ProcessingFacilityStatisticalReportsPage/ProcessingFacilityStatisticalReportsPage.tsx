import * as React from 'react';
import { EStatisticalReportsRole, EResource } from '../../../../../../sharetype/TPermission';
import StatisticalReportsPage from '../../../../common/StatisticalReportsPage';

export interface IProcessingFacilityStatisticalReportsPageProps { }

export default function ProcessingFacilityStatisticalReportsPage(props: IProcessingFacilityStatisticalReportsPageProps) {
    return <StatisticalReportsPage role={EStatisticalReportsRole.processingFacility} resource={EResource.customerProducts} />;
}
