import { useContext } from "react";
import { StatisticalReportsContext } from "./StatisticalReportsProvider";

export default function useStatisticalReportsStore() {
    return useContext(StatisticalReportsContext);
}
