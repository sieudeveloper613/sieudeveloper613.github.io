import React, { createContext, useState, useEffect, useCallback } from "react";

/* configurations */
import { Self } from ".";
import messageAlert from "../../../../utils/messageAlert";
import gardenDetail from "../../../../api/agriculturalProduce/farmGarden/gardenDetail";

/* packages */
import dayjs from "dayjs";
import moment from "moment";

/* hooks */
import { useAppSelector } from "../../../../redux/hooks";

/* types */
import { ITableCell } from "../../../common/DataTable";
import { EStatisticalReportsRole, EResource } from "../../../../sharetype/TPermission";
import VehicleResponse from "../../../../sharetype/response/resources/transportation/VehicleResponse";
import GardenCodeResponse from "../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenCodeResponse";
import AgriculturalContainerResponse from "../../../../sharetype/response/resources/agricultural-products/farm-garden/AgriculturalContainerResponse";
import { IGardenDetail } from "../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenDetailResponse/GardenDetailResponse";

export interface IButtonData { label: string; value: string; }

export const StatisticalReportsContext = createContext<{
    loading: boolean;
    showTable: boolean;
    loadingChart: boolean;
    chartData: IDataChart;
    chartDataBy: IDataChart;
    data: IButtonData[] | undefined;

    buttons: IButtonData[];
    dataReport1: ITableCell[];
    dataReport2: ITableCell[];
    dataReport3: ITableCell[];
    dataReport4: ITableCell[];

    yearsForChart: { label: string; value: string; }[];
    productsForChart: { label: string; value: string; }[];
    sanPham: { label: string; value: string; }[] | undefined;
    bienSoXe: { label: string; value: string; }[] | undefined;
    sanPham_1: { label: string; value: string; }[] | undefined;
    typeProduct: { label: string; value: string; }[] | undefined;

    nameButton: string;
    setNameButton: React.Dispatch<React.SetStateAction<string>>;
    dates: string[] | undefined;
    setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    selectedObj: string | undefined;
    setSelectedObj: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedBienSo: string | undefined;
    setSelectedBienSo: React.Dispatch<React.SetStateAction<string | undefined>>;
    datesForChart: string[] | undefined;
    setDatesForChart: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    selectedSanPham: string | undefined;
    setSelectedSanPham: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedSupplier: string | undefined;
    setSelectedSupplier: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedMaterial: string | undefined;
    setSelectedMaterial: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedSanPham_1: string | undefined;
    setSelectedSanPham_1: React.Dispatch<React.SetStateAction<string | undefined>>;
    dataDetail: IGardenDetail | undefined;
    setDataDetail: React.Dispatch<React.SetStateAction<IGardenDetail | undefined>>;
    selectedTypeProduct: string | undefined;
    setSelectedTypeProduct: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedYearForChart: string | undefined;
    setSelectedYearForChart: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedProductForChart: string | undefined;
    setSelectedProductForChart: React.Dispatch<React.SetStateAction<string | undefined>>;
    listSupplier: { label: string; value: string; }[];
    setListSupplier: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>;
    listMaterial: { label: string; value: string; }[];
    setListMaterial: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>;

    viewChartClick: () => void;
    btnViewReportClick: () => void;
    onButtonViewDetail: (id: string) => void;
    btnChooseTimeClick: (item: IButtonData) => void;
    onChangeSelectObj: (v: string | undefined) => void;
    onChangselectTypeProduct: (v: string | undefined) => void;
}>({} as any);

interface IStatisticalReportsProviderProps { role: EStatisticalReportsRole; resource?: EResource; }

export interface IDataChart {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        borderWidth: number;
        backgroundColor: string;
        categoryPercentage?: number;
    }[];
}

export default function StatisticalReportsProvider(props: React.PropsWithChildren<IStatisticalReportsProviderProps>) {
    // create hooks
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const numberOfRows = useAppSelector((state) => state.paging.row);
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);

    // create state
    const [loading, setLoading] = useState<boolean>(false);
    const [dates, setDates] = useState<string[] | undefined>([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [nameButton, setNameButton] = useState<string>("today");
    const [loadingChart, setLoadingChart] = useState<boolean>(false);
    const [dataReport1, setDataReport1] = useState<ITableCell[]>([]);
    const [dataReport2, setDataReport2] = useState<ITableCell[]>([]);
    const [dataReport3, setDataReport3] = useState<ITableCell[]>([]);
    const [dataReport4, setDataReport4] = useState<ITableCell[]>([]);
    const [dataDetail, setDataDetail] = useState<IGardenDetail | undefined>();
    const [datesForChart, setDatesForChart] = useState<string[] | undefined>();
    const [selectedObj, setSelectedObj] = useState<string | undefined>(undefined);
    const [resData6, setResData6] = useState<VehicleResponse.IData[] | undefined>([]);
    const [selectedBienSo, setSelectedBienSo] = useState<string | undefined>(undefined);
    const [resData5, setResData5] = useState<GardenCodeResponse.IData[] | undefined>([]);
    const [selectedSanPham, setSelectedSanPham] = useState<string | undefined>(undefined);
    const [selectedTypeProduct, setSelectedTypeProduct] = useState<string | undefined>("");
    const [selectedSupplier, setSelectedSupplier] = useState<string | undefined>(undefined);
    const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>(undefined);
    const [selectedYearForChart, setSelectedYearForChart] = useState<string | undefined>("");
    const [selectedSanPham_1, setSelectedSanPham_1] = useState<string | undefined>(undefined);
    const [listSupplier, setListSupplier] = useState<{ label: string; value: string; }[]>([]);
    const [listMaterial, setListMaterial] = useState<{ label: string; value: string; }[]>([]);
    const [selectedProductForChart, setSelectedProductForChart] = useState<string | undefined>("");
    const [resData1, setResData1] = useState<AgriculturalContainerResponse.IProduct[] | undefined>([]);
    const [resData2, setResData2] = useState<AgriculturalContainerResponse.IProduct[] | undefined>([]);
    const [resData3, setResData3] = useState<AgriculturalContainerResponse.IProduct[] | undefined>([]);
    const [resData4, setResData4] = useState<AgriculturalContainerResponse.IProduct[] | undefined>([]);
    const [resListProduct, setResListProduct] = useState<AgriculturalContainerResponse.IListProduct[]>([]);
    const [resDataChart, setResDataChart] = useState<AgriculturalContainerResponse.IProductTime[] | undefined>();
    const [resDataChart1, setResDataChart1] = useState<AgriculturalContainerResponse.IProductTime[] | undefined>();
    const [chartData, setChartData] = useState<IDataChart>({
        datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
        labels: [],
    });
    const [chartDataBy, setChartDataBy] = useState<IDataChart>({
        datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
        labels: [],
    });

    // create variables
    let yearsForChart = [];
    let dataChart: IDataChart;
    let dataChartBy: IDataChart;
    let reportData4: ITableCell[] = [];
    let reportData1: ITableCell[] = [];
    let reportData2: ITableCell[] = [];
    let reportData3: ITableCell[] = [];
    let data: IButtonData[] | undefined;
    let bienSoXe: IButtonData[] | undefined;
    let sanPham_1: IButtonData[] | undefined;
    let products: { label: string; value: string; }[] = [];

    const buttons = [
        { value: "today", label: "Hôm Nay" },
        { value: "yesterday", label: "Hôm Qua" },
        { value: "week", label: "Tuần Này" },
        { value: "month", label: "Tháng Này" },
        // { value: "year", label: "Năm Nay" },
        // { value: "last-year", label: "Năm Trước" },
    ];

    const typeProduct = [
        { label: "Sản phẩm", value: "DON" },
        { label: "Hộp", value: "HOP" },
        { label: "Thùng", value: "THUNG" },
    ];

    const productsForChart = [
        { label: "Sản phẩm 1", value: "Sản phẩm 1" },
        { label: "Sản phẩm 2", value: "Sản phẩm 2" },
    ];

    for (let i = 0; i < 10; i++) {
        const currentYear = dayjs().year();
        yearsForChart.push({ label: `${currentYear - i}`, value: `${currentYear - i}` })
    }

    const _products = resData5?.map(item => ({ label: item.code || "", value: item.code || "" })) || [];

    sanPham_1 = [
        { label: "Tất cả", value: "Tất cả" },
        ..._products
    ];

    const bienSo = resData6?.map(item => ({ label: item.licensePlates || "", value: item.licensePlates || "" })) || [];
    console.log("bien so xe - res data 6: ", bienSo)
    bienSoXe = [
        { label: "Tất cả", value: "Tất cả" },
        ...bienSo
    ];

    const commerce = props.role === "retail" || props.role === "drupStore" || props.role === "dealerStore" || props.role === "supermarket" || props.role === "hospital";

    switch (props.role) {
        case "farm_garden":
            if (resData1) {
                products = resData1?.map(item => ({ label: item.agricultureProduceName || "", value: item._id || "" }));

                if (selectedSanPham === "Tất cả") {
                    reportData1 = resData1.map(item => {
                        const harvestDate = moment(item.dateAgri?.lastHarvestDate).format("HH:mm DD/MM/YYYY");

                        return {
                            _id: item._id,
                            items: [harvestDate, item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                        } as ITableCell;
                    });
                } else {
                    resData1.forEach(item => {
                        const harvestDate = moment(item.dateAgri?.lastHarvestDate).format("HH:mm DD/MM/YYYY");

                        if (selectedSanPham === item._id) {
                            reportData1.push({
                                _id: item._id,
                                items: [harvestDate, item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                            } as ITableCell)
                        }
                    })
                }
            }

            if (resData2) {
                if (selectedSanPham === "Tất cả") {
                    reportData2 = resData2.map(item => {
                        const dateEx = moment(item?.dateEx).format("HH:mm DD/MM/YYYY");

                        return {
                            _id: item._id,
                            items: [dateEx, item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                        } as ITableCell;
                    })
                } else {
                    resData2.forEach(item => {
                        const dateEx = moment(item?.dateEx).format("HH:mm DD/MM/YYYY");

                        if (selectedSanPham === item.productlId) {
                            reportData2.push({
                                _id: item._id,
                                items: [dateEx, item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                            } as ITableCell);
                        }
                    })
                }
            }

            if (resData3) {
                if (selectedSanPham === "Tất cả") {
                    reportData3 = resData3.map(item => {
                        return {
                            _id: item._id,
                            items: [item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                        } as ITableCell;
                    })
                } else {
                    resData3.forEach(item => {
                        if (selectedSanPham === item.productlId) {
                            reportData3.push({
                                _id: item._id,
                                items: [item.gardenCodeName, item.agricultureProduceName, item.count, item.weight]
                            } as ITableCell);
                        }
                    })
                }
            }

            if (resData4) {
                reportData4 = resData4?.map((item, index) => {
                    const sowingTime = moment(item.dateAgri?.sowingDate).format("HH:mm DD/MM/YYYY");
                    const hlastHarvestTime = moment(item.dateAgri?.lastHarvestDate).format("HH:mm DD/MM/YYYY");

                    return {
                        // _id: item._id,
                        items: [index + 1, sowingTime, hlastHarvestTime, item.agricultureProduceName, item.weight, item.gardenDetailId]
                    } as ITableCell;
                });
            }

            data = [
                { label: "Kho xe", value: "khoxe" },
                { label: "Sản phẩm", value: "sanpham" },
                { label: "Khu vườn", value: "khuvuon" },
            ];
            break;
        case "processing-facility":
            switch (props.resource) {
                case "agricultural-produce":
                    data = [
                        { label: "Kho xe", value: "khoxe" },
                        { label: "Sản phẩm", value: "sanpham" },
                    ];

                    switch (selectedObj) {
                        case "khoxe":
                            break;
                        case "sanpham":
                            if (resListProduct) {
                                products = resListProduct?.map(item => {
                                    return {
                                        label: item.agricultureProduceName || "",
                                        value: item.plantVarietyId || "",
                                    }
                                })
                            }

                            if (resData1) {
                                reportData1 = resData1.map(item => {
                                    const dateIm = moment(item.dateIm).format("DD/MM/YYYY");

                                    return {
                                        _id: item._id,
                                        items: [dateIm, item.farmOwnerName, item.agricultureProduceName, item.count, item.weight]
                                    } as ITableCell;
                                });
                            }

                            if (resData2) {
                                reportData2 = resData2.map(item => {
                                    return {
                                        _id: item._id,
                                        items: [item.agricultureProduceName, item.count, item.weight]
                                    } as ITableCell;
                                });
                            }

                            if (resData3) {
                                reportData3 = resData3.map(item => {
                                    const dateEx = moment(item.dateEx).format("DD/MM/YYYY")
                                    return {
                                        _id: item._id,
                                        items: [dateEx, item.receiverName, item.agricultureProduceName, item.count, item.weight]
                                    } as ITableCell;
                                });
                            }

                            if (resData4) {
                                reportData4 = resData4.map(item => {
                                    return {
                                        _id: item._id,
                                        items: [item.agricultureProduceName, item.count, item.weight]
                                    } as ITableCell;
                                });
                            };
                            break;
                    }
                    break;
                case "customer-products":
                    data = [
                        { label: "Kho xe", value: "khoxe" },
                        { label: "Nguyên liệu thô", value: "nguyenlieutho" },
                        { label: "Sản phẩm", value: "sanpham" },
                    ];

                    switch (selectedObj) {
                        case "khoxe":
                            break;
                        case "nguyenlieutho":
                            if (resData1) {
                                reportData1 = resData1.map(item => {
                                    const dateIm = moment(item.dateIm).format("DD/MM/YYYY");

                                    return {
                                        _id: item._id,
                                        items: [dateIm, item.codeMaterial, item.weight]
                                    } as ITableCell;
                                });
                            }
                            break;
                        case "sanpham":
                            if (resListProduct) {
                                products = resListProduct?.map(item => {
                                    return {
                                        label: item.agricultureProduceName || "",
                                        value: item.plantVarietyId || "",
                                    }
                                });
                            }

                            if (resData1) {
                                reportData1 = resData1.map(item => {
                                    return {
                                        _id: item._id,
                                        items: [item.farmOwnerName, item.agricultureProduceName, item.count, item.weight]
                                    } as ITableCell;
                                });
                            }

                            if (resData2) {
                                reportData2 = resData2.map(item => {
                                    return {
                                        _id: item._id,
                                        items: [item.agricultureProduceName, item.count]
                                    } as ITableCell;
                                });
                            }

                            if (resData3) {
                                reportData3 = resData3.map(item => {
                                    const dateEx = moment(item.dateEx).format("DD/MM/YYYY");

                                    return {
                                        _id: item._id,
                                        items: [dateEx, item.receiverName, item.agricultureProduceName, item.count]
                                    } as ITableCell;
                                });
                            }

                            if (resData4) {
                                reportData4 = resData4.map(item => {
                                    return {
                                        _id: item._id,
                                        items: [item.agricultureProduceName, item.count]
                                    } as ITableCell;
                                });
                            }
                            break
                    }
            }
            break;
        case "distribution-center":
            if (resListProduct) {
                products = resListProduct?.map(item => {
                    return {
                        label: item.agricultureProduceName || "",
                        value: item.plantVarietyId || "",
                    }
                });
            }

            if (resData1) {
                reportData1 = resData1.map(item => {
                    const farmOwner = !item.farmOwnerName || item.farmOwnerName === "undefined" ? "Không xác định" : item.farmOwnerName;

                    return {
                        _id: item._id,
                        items: [farmOwner, item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            if (resData2) {
                reportData2 = resData2.map(item => {
                    const dateEx = moment(item.dateEx).format("DD/MM/YYYY");

                    return {
                        _id: item._id,
                        items: [dateEx, item.receiverName, item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            if (resData3) {
                reportData3 = resData3.map(item => {
                    return {
                        _id: item._id,
                        items: [item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            data = [
                { label: "Kho xe", value: "khoxe",
                },
                { label: "Sản phẩm", value: "sanpham" },
            ];
            break;
        case "dealerStore":
        case "retail":
        case "hospital":
        case "drupStore":
        case "supermarket":
            if (resListProduct) {
                products = resListProduct?.map(item => {
                    return {
                        label: item.agricultureProduceName || "",
                        value: item.plantVarietyId || "",
                    }
                });
            }

            if (resData1) {
                reportData1 = resData1.map(item => {
                    return {
                        _id: item._id,
                        items: [item.farmOwnerName, item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            if (resData2) {
                reportData2 = resData2.map(item => {
                    const dateEx = moment(item.dateEx).format("DD/MM/YYYY");

                    return {
                        _id: item._id,
                        items: [dateEx, item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            if (resData3) {
                reportData3 = resData3.map(item => {
                    return {
                        _id: item._id,
                        items: [item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            data = [
                { label: "Kho xe", value: "khoxe" },
                { label: "Sản phẩm", value: "sanpham" },
            ];
            break;
        case "restaurant":
            if (resListProduct) {
                products = resListProduct?.map(item => {
                    return {
                        label: item.agricultureProduceName || "",
                        value: item.plantVarietyId || "",
                    }
                });
            }

            if (resData1) {
                reportData1 = resData1.map(item => {
                    const dateIm = moment(item.dateIm).format("DD/MM/YYYY");

                    return {
                        _id: item._id,
                        items: [dateIm, item.farmOwnerName, item.agricultureProduceName, item.count, item.weight]
                    } as ITableCell;
                });
            }

            break;
        case "companyLogistic":
            data = [
                { label: "Kho xe", value: "khoxe" },
                { label: "Kho hàng", value: "khohang" },
            ];

            dataChart = {
                labels: ["Tháng 1", "Tháng 2", "Tháng 3"],
                datasets: [
                    {
                        label: "Sản phẩm 1",
                        data: [45, 59, 80],
                        backgroundColor: "#629C44",
                        borderColor: "#000000",
                        borderWidth: 1,
                    },
                ],
            };

            dataChartBy = {
                labels: ["Qúy 1", "Quý 2", "Quý 3", "Quý 4"],
                datasets: [
                    {
                        label: "Sản phẩm 1",
                        data: [15, 10, 15, 40],
                        backgroundColor: "#629C44",
                        borderColor: "#000000",
                        borderWidth: 1,
                    },
                ],
            };
            break;
    }

    if (resDataChart || resDataChart1) {
        const dataNhap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const dataXuat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const dataQuarterNhap = [0, 0, 0, 0];
        const dataQuarterXuat = [0, 0, 0, 0];
        const datasetMonth = [];
        const datasetQuarter = [];

        if (resDataChart) {
            resDataChart.forEach((item) => {
                dataNhap[item.month - 1] = item.count;
            });

            resDataChart.forEach((item) => {
                if (item.month <= 3) {
                    dataQuarterNhap[0] += item.count;
                } else if (item.month <= 6) {
                    dataQuarterNhap[1] += item.count;
                } else if (item.month <= 9) {
                    dataQuarterNhap[2] += item.count;
                } else {
                    dataQuarterNhap[3] += item.count;
                }
            });

            datasetMonth.push({
                categoryPercentage: 0.6,
                label: "Thu hoạch",
                data: [...dataNhap],
                backgroundColor: "#629C44",
                borderColor: "#000000",
                borderWidth: 1,
            });

            datasetQuarter.push({
                categoryPercentage: 0.6,
                label: "Thu hoạch",
                data: [...dataQuarterNhap],
                backgroundColor: "#629C44",
                borderColor: "#000000",
                borderWidth: 1,
            });
        }

        if (resDataChart1) {
            resDataChart1.forEach((item) => {
                dataXuat[item.month - 1] = item.count
            });

            resDataChart1.forEach((item) => {
                if (item.month <= 3) {
                    dataQuarterXuat[0] += item.count;
                } else if (item.month <= 6) {
                    dataQuarterXuat[1] += item.count;
                } else if (item.month <= 9) {
                    dataQuarterXuat[2] += item.count;
                } else {
                    dataQuarterXuat[3] += item.count;
                }
            });

            datasetMonth.push({
                categoryPercentage: 0.6,
                label: commerce ? "Bán hàng" : "Xuất hàng",
                data: [...dataXuat],
                backgroundColor: "#FF6624",
                borderColor: "#000000",
                borderWidth: 1,
            });

            datasetQuarter.push({
                categoryPercentage: 0.6,
                label: commerce ? "Bán hàng" : "Xuất hàng",
                data: [...dataQuarterXuat],
                backgroundColor: "#FF6624",
                borderColor: "#000000",
                borderWidth: 1,
            });
        }

        dataChart = {
            labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            datasets: [...datasetMonth],
        };

        dataChartBy = {
            labels: ["Qúy 1", "Quý 2", "Quý 3", "Quý 4"],
            datasets: [...datasetQuarter],
        };
    }

    const sanPham = [
        { label: "Tất cả", value: "Tất cả" },
        ...products
    ];

    // Memo ========================================================
    const loadData = useCallback(async (role: string) => {
        switch (role) {
            case "farm_garden":
                if (userInfo?.ownerId && dates) {
                    setLoading(true);

                    const res1 = await Self.contextApi.listWarehouseFarmGarden(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res2 = await Self.contextApi.listExport(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res3 = await Self.contextApi.listInventory(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res5 = await Self.contextApi1.list(numberOfRowsRedux, numberOfRows);
                    const res6 = await Self.contextApi2.list(numberOfRowsRedux, numberOfRows);

                    setLoading(false);

                    if (res1.status === "failure" || res2.status === "failure" || res3.status === "failure") {
                        messageAlert("error", "Truy xuất dữ liệu thất bại!");
                        return undefined;
                    }

                    setResData1(res1.data);
                    setResData2(res2.data);
                    setResData3(res3.data);
                    setResData5(res5.data);
                    setResData6(res6.data);
                }

                return undefined;
            case "processing-facility":
                switch (props.resource) {
                    case "agricultural-produce":
                        if (userInfo?.ownerId && dates && selectedSanPham) {
                            setLoading(true);

                            const res1 = await Self.contextApi.listImport(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0], selectedSanPham);
                            const res2 = await Self.contextApi.listWarehouseUser(selectedSanPham, "", userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                            const res3 = await Self.contextApi.listExportUser(selectedSanPham, "", userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                            const res4 = await Self.contextApi.listInventoryAfterProcessUser(selectedSanPham, "", userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);

                            setLoading(false);

                            if (res1.status === "failure" || res2.status === "failure" || res3.status === "failure" || res4.status === "failure") {
                                messageAlert("error", "Lấy data thất bại");
                                return undefined;
                            };

                            setResData1(res1.data);
                            setResData2(res2.data);
                            setResData3(res3.data);
                            setResData4(res4.data);
                        };

                        return undefined;
                    case "medicine":
                    case "customer-products":
                        if (userInfo?.ownerId && dates) {
                            if (selectedObj == "khoxe") {
                                // body...
                            } else if (selectedObj == "nguyenlieutho") {
                                const res = await Self.contextApi.listSupplierProcess(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);

                                if (res.status === "failure") {
                                    messageAlert("error", "Lấy data thất bại");
                                    return undefined;
                                }

                                const data: { label: string, value: string }[] = [];

                                res.data.forEach((item) => {
                                    if (item.farmOwnerName) {
                                        data.push({
                                            label: item.farmOwnerName,
                                            value: item.farmOwnerName
                                        })
                                    }
                                });

                                setListSupplier(data);
                            } else if (selectedObj == "sanpham" && selectedSanPham) {
                                // fix api listWarehouseUser again
                                setLoading(true);

                                const res2 = await Self.contextApi.listWarehouseUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                                const res3 = await Self.contextApi.listExportUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                                const res4 = await Self.contextApi.listInventoryAfterProcessUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                                
                                setLoading(false);

                                if (res2.status === "failure" || res3.status === "failure" || res4.status === "failure") {
                                    messageAlert("error", "Truy xuất dữ liệu thất bại!");
                                    return undefined;
                                }

                                setResData2(res2.data);
                                setResData3(res3.data);
                                setResData4(res4.data);
                            }
                        }
                    return undefined;
                }

                return undefined;
            case "distribution-center":
                if (userInfo?.ownerId && dates && selectedSanPham) {
                    setLoading(true);
                    
                    const res1 = await Self.contextApi.listWarehouseUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res2 = await Self.contextApi.listExportUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res3 = await Self.contextApi.listInventoryAfterProcessUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    
                    setLoading(false);
                    
                    if (res2.status === "failure" || res3.status === "failure" || res1.status === "failure") {
                        messageAlert("error", "Truy xuất dữ liệu thất bại!");
                        return undefined;
                    }

                    setResData1(res1.data);
                    setResData2(res2.data);
                    setResData3(res3.data);
                }

                return undefined;
            case "dealerStore":
            case "retail":
            case "hospital":
            case "drupStore":
            case "supermarket":
                if (userInfo?.ownerId && dates && selectedSanPham) {
                    setLoading(false);

                    const res1 = await Self.contextApi.listWarehouseUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res2 = await Self.contextApi.listExportUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    const res3 = await Self.contextApi.listInventoryAfterProcessUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);
                    
                    setLoading(false);

                    if (res2.status === "failure" || res3.status === "failure" || res1.status === "failure") {
                        messageAlert("error", "Truy xuất dữ liệu thất bại!");
                        return undefined;
                    }

                    setResData1(res1.data);
                    setResData2(res2.data);
                    setResData3(res3.data);
                }

                return undefined;
            case "restaurant":
                if (userInfo?.ownerId && dates && selectedSanPham) {
                    setLoading(true);

                    const res1 = await Self.contextApi.listWarehouseUser(selectedSanPham, selectedTypeProduct, userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0]);

                    setLoading(false);

                    if (res1.status === "failure") {
                        messageAlert("error", "Truy xuất dữ liệu thất bại!");
                        return undefined;
                    }

                    setResData1(res1.data);
                }

                return undefined;
        }
    }, [dates, selectedSanPham_1, selectedSanPham, selectedObj, selectedTypeProduct]);

    const loadDataChart = useCallback(async (role: string) => {
        switch (role) {
            case "farm_garden": 
                if (selectedProductForChart && dates) {
                    setLoadingChart(true);

                    const res = await Self.contextApi.statisticChartProductByUser("nhapkhons", selectedProductForChart, `${dates[1]}T23:59:00`, dates[0]);
                    const res1 = await Self.contextApi.statisticChartProductByUser("xuatkho", selectedProductForChart, `${dates[1]}T23:59:00`, dates[0]);

                    if (res.status === "failure" || res1.status === "failure") {
                        messageAlert("error", "Truy xuất dữ liệu thất bại!");
                        setLoadingChart(false);
                        break;
                    }

                    setResDataChart(res.data);
                    setResDataChart1(res1.data);
                    setLoadingChart(false);
                }
                break;
            case "processing-facility":
                switch (props.resource) {
                    case "agricultural-produce":
                    case "medicine":
                    case "customer-products":
                        if (selectedProductForChart && dates) {
                            setLoadingChart(true);

                            const res1 = await Self.contextApi.statisticChartProductByUser("xuatkho", selectedProductForChart, `${dates[1]}T23:59:00`, dates[0]);
                            
                            if (res1.status === "failure") {
                                messageAlert("error", "Lấy data thất bại");
                                setLoadingChart(false);
                                break;
                            }

                            setResDataChart1(res1.data);
                            setLoadingChart(false);
                        }
                        break;
                }
                break;
            case "dealerStore":
            case "retail":
            case "hospital":
            case "drupStore":
            case "supermarket":
            case "distribution-center":
                if (selectedProductForChart && dates) {
                    setLoadingChart(true);

                    const res1 = await Self.contextApi.statisticChartProductByUser("xuatkho", selectedProductForChart, `${dates[1]}T23:59:00`, dates[0]);

                    if (res1.status === "failure") {
                        messageAlert("error", "Lấy data thất bại");
                        setLoadingChart(false);
                        break;
                    }

                    setResDataChart1(res1.data);
                    setLoadingChart(false);
                }
                break;
        }
    }, [selectedProductForChart, dates])

    const btnChooseTimeClick = (item: IButtonData) => setNameButton(item.value);

    const onChangeSelectObj = (value: string | undefined) => {
        setSelectedObj(value);
        setSelectedBienSo(undefined);
        setSelectedSanPham(undefined);
        setSelectedSanPham_1(undefined);
        setShowTable(false);
        setChartData({
            datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
            labels: [],
        });
        setChartDataBy({
            datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
            labels: [],
        });
        //call api
    };

    const onChangselectTypeProduct = (v: string | undefined) => {
        setSelectedTypeProduct(v);
        // setSelectedBienSo(undefined);
        setSelectedSanPham(undefined);
        setSelectedSanPham_1(undefined);
        setShowTable(false);
        setChartData({
            datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
            labels: [],
        });
        setChartDataBy({
            datasets: [{ backgroundColor: "", borderColor: "", borderWidth: 0, data: [], label: "" }],
            labels: [],
        });
        //call api
    };

    const onButtonViewDetail = useCallback(async (id: string) => {
        const res = await gardenDetail.getGardenDetail(id);

        if (res.status === "failure") {
            messageAlert("error", "Truy xuất dữ liệu thất bại!");
            return;
        }

        setDataDetail(res.data);
    }, []);

    const btnViewReportClick = () => {
        if (!selectedObj) {
            return messageAlert("warning", "Vui lòng chọn đối tượng!");
        }

        if (selectedObj === "khoxe" && !selectedBienSo) {
            return messageAlert("warning", "Vui lòng chọn biển số xe!");
        }

        if (selectedObj === "sanpham" && !selectedSanPham) {
            return messageAlert("warning", "Vui lòng chọn sản phẩm!");
        }

        if (selectedObj === "khuvuon" && !selectedSanPham_1) {
            return messageAlert("warning", "Vui lòng chọn mã khu vườn!");
        }

        setShowTable(true);
        setDataReport1(reportData1);
        setDataReport2(reportData2);
        setDataReport3(reportData3);
        setDataReport4(reportData4);
    };

    const viewChartClick = () => {
        if (!selectedProductForChart) {
            alert("Vui lòng chọn sản phẩm !")
            return;
        }
        setChartData(dataChart);
        setChartDataBy(dataChartBy);
    };

    useEffect(() => {
        switch (props.role) {
            case "hospital":
            case "drupStore":
            case "retail":
            case "dealerStore":
            case "supermarket":
            case "restaurant":
                setSelectedObj("sanpham");
                break
        }
    }, []);

    useEffect(() => {
        const ownerId = userInfo?.permission.resource === "participants" ? userInfo?._id : userInfo?.ownerId;

        if (selectedSupplier && ownerId && dates) {
            const getListMaterial = async () => {
                const res = await Self.contextApi.listProductOfSupplier(selectedSupplier, ownerId, `${dates[1]}T23:59:00`, dates[0]);

                if (res.status === "failure") {
                    messageAlert("error", "Lấy data thất bại");
                    return undefined;
                }

                const data: { label: string, value: string }[] = [{ label: "Tất cả", value: "Tất cả" }];

                res.data.forEach((item) => {
                    if (item.codeMaterial) {
                        data.push({
                            label: item.codeMaterial,
                            value: item.codeMaterial
                        })
                    }
                });

                setListMaterial(data);
            }

            getListMaterial();
        }
    }, [selectedSupplier]);

    useEffect(() => {
        const ownerId = userInfo?.permission.resource === "participants" ? userInfo?._id : userInfo?.ownerId;

        if (selectedMaterial && ownerId && dates) {
            const getProduct = async () => {
                const res = await Self.contextApi.listImportUser(selectedMaterial, ownerId, `${dates[1]}T23:59:00`, dates[0]);

                if (res.status === "failure") {
                    messageAlert("error", "Truy xuất dữ liệu thất bại");
                    return undefined;
                }

                setResData1(res.data);
            }

            getProduct();
        }
    }, [selectedMaterial]);

    useEffect(() => {
        switch (nameButton) {
            case "today":
                setDates([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
                break;
            case "yesterday":
                setDates([dayjs().add(-1, "day").format("YYYY-MM-DD"), dayjs().add(-1, "day").format("YYYY-MM-DD")]);
                break;
            case "week":
                setDates([dayjs().day(1).format("YYYY-MM-DD"), dayjs().day(7).format("YYYY-MM-DD")]);
                break;
            case "month":
                setDates([dayjs().date(1).format("YYYY-MM-DD"), dayjs().date(dayjs().daysInMonth()).format("YYYY-MM-DD")]);
                break;
            case "year":
                setDates([dayjs().startOf("year").format("YYYY-MM-DD"), dayjs().endOf("year").format("YYYY-MM-DD")]);
                break;
            case "last-year":
                setDates([dayjs().year(dayjs().year() - 1).startOf("year").format("YYYY-MM-DD"), dayjs().year(dayjs().year() - 1).endOf("year").format("YYYY-MM-DD")]);
                break;
        }
    }, [nameButton]);

    useEffect(() => {
        if ((selectedYearForChart && Number(selectedYearForChart)) !== dayjs().year()) {
            const year = Number(selectedYearForChart);
            setDates([dayjs().year(year).startOf("year").format("YYYY-MM-DD"), dayjs().year(year).endOf("year").format("YYYY-MM-DD")]);
        } else if (Number(selectedYearForChart) === dayjs().year()) {
            setDates([dayjs().startOf("year").format("YYYY-MM-DD"), dayjs().endOf("year").format("YYYY-MM-DD")]);
        }
    }, [selectedYearForChart]);

    useEffect(() => {
        loadData(props.role);
    }, [dates, selectedSanPham, selectedObj]);

    useEffect(() => {
        const ownerId = userInfo?.permission.resource === "participants" ? userInfo?._id : userInfo?.ownerId;

        if (dates && ownerId) {
            const loadListProduct = async (typeProduct: string = "") => {
                const listPro = await Self.contextApi.listProductAfterProcess(typeProduct, ownerId, `${dates[1]}T23:59:00`, dates[0]);
                if (listPro.status === "failure") {
                    messageAlert("error", "Truy xuất dữ liệu thất bại!");
                    return undefined;
                }

                setResListProduct(listPro.data);
            }

            switch (props.role) {
                case "dealerStore":
                case "retail":
                case "hospital":
                case "drupStore":
                case "supermarket":
                case "restaurant":
                case "distribution-center":
                    loadListProduct();
                    break;
                case "processing-facility":
                    if (props.resource === "customer-products" || props.resource === "medicine") {
                        if (selectedTypeProduct) {
                            loadListProduct(selectedTypeProduct);
                        }
                    } else if (props.resource === "agricultural-produce") {
                        loadListProduct();
                    }
                    break;

            }
        }
    }, [dates, selectedTypeProduct, selectedObj]);

    useEffect(() => {
        loadDataChart(props.role);
    }, [dates, selectedProductForChart])

    useEffect(() => {
        const loadDataGardern = async () => {
            if (userInfo?.ownerId && dates && selectedSanPham_1 && props.role === "farm_garden") {
                const res4 = await Self.contextApi.listWarehouseFarmGardenCode(userInfo.ownerId, `${dates[1]}T23:59:00`, dates[0], selectedSanPham_1);
                setResData4(res4.data);
            }
        }

        loadDataGardern();
    }, [selectedSanPham_1, dates]);

    return (
        <StatisticalReportsContext.Provider
            value={{
                listSupplier,
                listMaterial,
                dataReport1,
                dataReport2,
                dataReport3,
                dataReport4,
                setListSupplier,
                setListMaterial,
                viewChartClick,
                chartData,
                chartDataBy,

                bienSoXe,
                typeProduct,
                setSelectedTypeProduct,
                selectedTypeProduct,
                data,
                sanPham,
                sanPham_1,

                nameButton,
                setNameButton,
                buttons,
                btnChooseTimeClick,
                selectedSupplier,
                setSelectedSupplier,
                selectedMaterial,
                setSelectedMaterial,
                selectedObj,
                setSelectedObj,
                onChangeSelectObj,
                onChangselectTypeProduct,

                dates,
                setDates,
                loadingChart,
                loading,

                selectedBienSo,
                setSelectedBienSo,

                selectedSanPham,
                selectedSanPham_1,
                setSelectedSanPham,
                setSelectedSanPham_1,

                datesForChart,
                setDatesForChart,

                selectedProductForChart,
                setSelectedProductForChart,
                productsForChart,

                selectedYearForChart,
                setSelectedYearForChart,
                yearsForChart,

                showTable,

                btnViewReportClick,
                onButtonViewDetail,
                setDataDetail,
                dataDetail
            }}
        >
            {props.children}
        </StatisticalReportsContext.Provider>
    );
}
