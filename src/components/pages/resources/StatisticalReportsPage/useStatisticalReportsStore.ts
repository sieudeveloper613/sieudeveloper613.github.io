import * as React from 'react';
import { StatisticalReportsContext } from './StatisticalReportsProvider';

export default function useStatisticalReportsStore() {
    return React.useContext(StatisticalReportsContext);
}
