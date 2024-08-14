import api from "../../../../api";
import StatisticalReportsProvider from "./StatisticalReportsProvider";
import StatisticalReportsBasePage, { IStatisticalReportsPageProps } from "./StatisticalReportsPage";

export namespace Self {
    export const contextApi = api.statisticalReports;
    export const contextApi2 = api.transportation.vehicle;
    export const contextApi1 = api.agriculturalProduce.farmGarden.gardenCode;
}

export default function StatisticalReportsPage(props: IStatisticalReportsPageProps) {
    return (
        <StatisticalReportsProvider role={props.role} resource={props.resource}>
            <StatisticalReportsBasePage {...props} />
        </StatisticalReportsProvider>
    );
}
