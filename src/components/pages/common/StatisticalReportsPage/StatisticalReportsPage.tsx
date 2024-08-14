import React from "react";

/* components */
import FormDetail from "./components/FormDetail";
import ChartComponent from "./components/ChartComponent";
import TableComponent from "./components/TableComponent";
import FilterComponent from "./components/FilterComponent";
import FilterChartInputData from "./components/FilterChartInputData";

/* configurations */
import useStatisticalReportsStore from "./useStatisticalReportsStore";

/* styles */
import style from "./StatisticalReportsPage.module.scss";

/* types */
import { EStatisticalReportsRole, EResource } from "../../../../sharetype/TPermission";

export interface IStatisticalReportsPageProps {
    role: EStatisticalReportsRole;
    resource?: EResource;
}

function StatisticalReportsBasePage(props: IStatisticalReportsPageProps) {
    const { 
        dataReport1, 
        dataReport2, 
        dataReport3, 
        dataReport4, 
        selectedObj, 
        showTable, 
        chartData, 
        chartDataBy,
        onButtonViewDetail 
    } = useStatisticalReportsStore();

    console.log("data report 1: ", dataReport1);
    // create variables
    let tableComponents;
    let chartComponents;
    let showChartComponents;

    switch (props.role) {
        case "farm_garden":
            switch (selectedObj) {
                case "khoxe":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Xuất hàng thành phẩm"
                                headerCells={["Ngày xuất hàng", "Loại sản phẩm", "Số lượng", "Khối lượng (g)"]}
                                data={dataReport2}
                            />
                        </div>
                    break
                case "sanpham":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Thu hoạch (Nhập kho)"
                                headerCells={["Ngày thu hoạch","Mã khu vườn", "Loại sản phẩm", "Số lượng", "Khối lượng (g)"]}
                                data={dataReport1}
                                width="49%"
                            />
                            <TableComponent
                                title="Xuất hàng thành phẩm"
                                headerCells={["Ngày xuất hàng","Mã khu vườn","Loại sản phẩm", "Số lượng", "Khối lượng (g)"]}
                                data={dataReport2}
                                width="49%"
                            />
                            <TableComponent
                                title="Tồn kho thành phẩm"
                                headerCells={["Mã khu vườn","Loại sản phẩm", "Số lượng", "Khối lượng (g)"]}
                                data={dataReport3}
                                width="49%"
                            />
                        </div>
                    showChartComponents = true;
                    break
                case "khuvuon":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                // title="Thu hoạch (Nhập kho)"
                                headerCells={["STT", "Ngày gieo", "Ngày thu hoạch","Loại sản phẩm","Sản lượng thu hoạch (kg)","Chi tiết"]}
                                data={dataReport4}
                                onButtonViewDetail= {onButtonViewDetail}
                            />
                        </div>
                    break
            }
            chartComponents =
                <div className={style["chart-container"]}>
                    <FilterChartInputData />
                    <ChartComponent
                        data={chartData}
                        title="Báo cáo thống kê thu hoạch và xuất hàng theo tháng"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                    <ChartComponent
                        data={chartDataBy}
                        title="Báo cáo thống kê thu hoạch và xuất hàng theo quý"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                </div>
            break
        case "processing-facility":
            switch (props.resource) {
                case "agricultural-produce":
                    switch (selectedObj) {
                        case "khoxe":
                            tableComponents =
                                <div className={style["product-reports"]}>
                                    <TableComponent
                                        title="Xuất hàng thành phẩm"
                                        headerCells={["Ngày xuất hàng","Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                        data={dataReport3}
                                    />
                                </div>
                            break
                        case "sanpham":
                            tableComponents =
                                <div className={style["product-reports"]}>
                                    <TableComponent
                                        title="Nhập hàng trước chế biến"
                                        headerCells={["Ngày nhập hàng","Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                        data={dataReport1}
                                        width="49%"
                                    />
                                    <TableComponent
                                        title="Nhập kho thành phẩm"
                                        headerCells={["Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                        data={dataReport2}
                                        width="49%"
                                    />
                                    <TableComponent
                                        title="Xuất hàng thành phẩm"
                                        headerCells={["Ngày xuất hàng","Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                        data={dataReport3}
                                        width="49%"
                                    />
                                    <TableComponent
                                        title="Tồn kho thành phẩm"
                                        headerCells={["Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                        data={dataReport4}
                                        width="49%"
                                    />
                                </div>
                            showChartComponents = true;
                            break
                    }
                    chartComponents =
                        <div className={style["chart-container"]}>
                            <FilterChartInputData />
                            <ChartComponent
                                data={chartData}
                                title="Báo cáo thống kê của xuất hàng theo tháng"
                                xTitle="Thời gian"
                                yTitle="Số lượng"
                            />
                            <ChartComponent
                                data={chartDataBy}
                                title="Báo cáo thống kê của xuất hàng theo quý"
                                xTitle="Thời gian"
                                yTitle="Số lượng"
                            />
                        </div>
                    break
                case "customer-products":
                    switch (selectedObj) {
                        case "khoxe":
                            tableComponents =
                                <div className={style["product-reports"]}>
                                    <TableComponent
                                        title="Xuất hàng"
                                        headerCells={["Ngày xuất hàng", "Nơi đến", "Loại sản phẩm", "Số lượng"]}
                                        data={dataReport3}
                                    />
                                </div>
                            break
                        case "nguyenlieutho":
                            tableComponents =
                                <div className={style["product-reports"]}>
                                    <TableComponent
                                        title="Nhập nguyên liệu"
                                        headerCells={["Ngày nhập hàng", "Loại nguyên liệu", "Khối lượng (g)"]}
                                        data={dataReport1}
                                    />
                                </div>
                            break
                        case "sanpham":
                            tableComponents =
                                <div className={style["product-reports"]}>
                                    <TableComponent
                                        title="Nhập kho thành phẩm"
                                        headerCells={["Loại sản phẩm", "Số lượng"]}
                                        data={dataReport2}
                                        width="49%"
                                    />
                                    <TableComponent
                                        title="Xuất hàng thành phẩm"
                                        headerCells={["Ngày xuất hàng", "Đối tượng", "Loại sản phẩm", "Số lượng"]}
                                        data={dataReport3}
                                        width="49%"
                                    />
                                    <TableComponent
                                        title="Tồn kho thành phẩm"
                                        headerCells={["Loại sản phẩm", "Số lượng"]}
                                        data={dataReport4}
                                        width="49%"
                                    />
                                </div>
                            showChartComponents = true;
                            break
                    }
                    chartComponents =
                        <div className={style["chart-container"]}>
                            <FilterChartInputData />
                            <ChartComponent
                                data={chartData}
                                title="Biểu đồ cột bán hàng theo tháng của sản phẩm"
                                xTitle="Thời gian"
                                yTitle="Số lượng"
                            />
                            <ChartComponent
                                data={chartDataBy}
                                title="Biểu đồ cột bán hàng theo quý của sản phẩm"
                                xTitle="Thời gian"
                                yTitle="Số lượng"
                            />
                        </div>
                    break
            }
            break
        case "distribution-center":
            switch (selectedObj) {
                case "khoxe":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Xuất hàng thành phẩm"
                                headerCells={["Ngày xuất","Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                data={dataReport2}
                            />
                        </div>
                    break
                case "sanpham":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Nhập hàng"
                                headerCells={["Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                data={dataReport1}
                                width="49%"
                            />
                            <TableComponent
                                title="Xuất hàng"
                                headerCells={["Ngày xuất","Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                data={dataReport2}
                                width="49%"
                            />
                            <TableComponent
                                title="Tồn kho thành phẩm"
                                headerCells={["Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                                data={dataReport3}
                                width="49%"
                            />
                        </div>
                    showChartComponents = true;
                    break
            }
            chartComponents =
                <div className={style["chart-container"]}>
                    <FilterChartInputData />
                    <ChartComponent
                        data={chartData}
                        title="Báo cáo thống kê của xuất hàng theo tháng"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                    <ChartComponent
                        data={chartDataBy}
                        title="Báo cáo thống kê của xuất hàng theo quý"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                </div>
            break
        case "dealerStore":
        case "retail":
        case "hospital":
        case "drupStore":
        case "supermarket":
            tableComponents =
                <div className={style["product-reports"]}>
                    <TableComponent
                        title="Nhập hàng"
                        headerCells={["Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                        data={dataReport1}
                        width="49%"
                    />
                    <TableComponent
                        title="Tồn kho"
                        headerCells={["Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                        data={dataReport3}
                        width="49%"
                    />
                    <TableComponent
                        title="Bán hàng"
                        headerCells={["Ngày bán","Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                        data={dataReport2}
                        width="49%"
                    />
                </div>
            showChartComponents = true;
            chartComponents =
                <div className={style["chart-container"]}>
                    <FilterChartInputData />
                    <ChartComponent
                        data={chartData}
                        title="Biểu đồ cột bán hàng theo tháng của sản phẩm"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                    <ChartComponent
                        data={chartDataBy}
                        title="Biểu đồ cột bán hàng theo tháng của sản phẩm"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                </div>
            break
        case "restaurant":
            tableComponents =
                <div className={style["product-reports"]}>
                    <TableComponent
                        title="Nhập hàng"
                        headerCells={["Ngày nhập hàng", "Đối tượng", "Loại sản phẩm", "Số lượng", "Khối lượng(g)"]}
                        data={dataReport1}
                    />
                </div>
            break
        case "companyLogistic":
            switch (selectedObj) {
                case "khoxe":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Nhập hàng từ"
                                headerCells={["Ngày nhập hàng", "Nơi nhập", "Loại sản phẩm", "Số lượng"]}
                                data={[]}
                                width="49%"
                            />
                            <TableComponent
                                title="Xuất hàng đến"
                                headerCells={["Ngày xuất hàng", "Nơi đến", "Loại sản phẩm", "Số lượng"]}
                                data={[]}
                                width="49%"
                            />
                        </div>
                    break
                case "khohang":
                    tableComponents =
                        <div className={style["product-reports"]}>
                            <TableComponent
                                title="Nhập kho hàng"
                                headerCells={["Loại sản phẩm", "Số lượng"]}
                                data={[]}
                                width="49%"
                            />
                            <TableComponent
                                title="Xuất hàng"
                                headerCells={["Ngày xuất hàng", "Đối tượng", "Loại sản phẩm", "Số lượng"]}
                                data={[]}
                                width="49%"
                            />
                            <TableComponent
                                title="Tồn kho hàng"
                                headerCells={["Loại sản phẩm", "Số lượng"]}
                                data={[]}
                                width="49%"
                            />
                        </div>
                    showChartComponents = true;
                    break
            }
            chartComponents =
                <div className={style["chart-container"]}>
                    <FilterChartInputData />
                    <ChartComponent
                        data={chartData}
                        title="Biểu đồ cột xuất hàng theo tháng của kho"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                    <ChartComponent
                        data={chartDataBy}
                        title="Biểu đồ cột xuất hàng theo quý của kho"
                        xTitle="Thời gian"
                        yTitle="Số lượng"
                    />
                </div>
            break
    }

    return (
        <div className={style["statistical-report-container"]}>
            <h2>Báo cáo thống kê</h2>
            <hr />
            <FilterComponent role={props.role} resource={props.resource} />
            {showTable && tableComponents}
            {showTable && showChartComponents && chartComponents}
            <FormDetail/>
        </div>
    );
}

export default StatisticalReportsBasePage;
