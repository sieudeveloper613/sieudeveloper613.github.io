import StatisticalReportsBasePage, { IStatisticalReportsPageProps } from './StatisticalReportsPage';
import StatisticalReportsProvider from './StatisticalReportsProvider';

export default function StatisticalReportsPage(props: IStatisticalReportsPageProps) {
    return (
        <StatisticalReportsProvider>
            <StatisticalReportsBasePage {...props} />
        </StatisticalReportsProvider>
    );
}
