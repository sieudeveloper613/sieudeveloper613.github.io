import React, { useState, useEffect, useMemo, createContext } from "react";

/* components */

/* configurations */
import api from "../../../../api";
import messageAlert from "../../../../utils/messageAlert";

/* hooks */
import { useAppSelector } from "../../../../redux/hooks";

/* packages */
import dayjs from "dayjs";

/* types */
import { ITableCell } from "../../../common/DataTable";
import { EnterpriseRole } from "../../../../sharetype/TPermission";
import { IUser } from "../../../../sharetype/response/resources/PartnerResponse/PartnerResponse";
import EnterpriseProductResponse from "../../../../sharetype/response/resources/enterprise/EnterpriseProductResponse";
import AgriculturalContainerResponse from "../../../../sharetype/response/resources/agricultural-products/farm-garden/AgriculturalContainerResponse";

export interface IButtonData {
    value: string;
    label: string;
}

export interface ISelection {
    label: string,
    value: string,
}

export interface IExtendedSelection extends ISelection {
    role: string,
}
export const StatisticalReportsContext = createContext<{
    userRole: string | undefined,
    productCollection: ISelection[],
    formalites: ISelection[],
    objectTypes: IExtendedSelection[],

    selectedProduct: string | undefined,
    setSelectedProduct: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedFormality: string | undefined,
    setSelectedFormality: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedObjectType: string | undefined,
    setSelectedObjectType: React.Dispatch<React.SetStateAction<string | undefined>>

    buttons: IButtonData[];
    nameButton: string;
    nameButtonChart: string;
    setNameButton: React.Dispatch<React.SetStateAction<string>>;
    setNameButtonChart: React.Dispatch<React.SetStateAction<string>>;
    btnChooseTimeClick: (item: IButtonData) => void;
    btnChooseTimeChartClick: (item: IButtonData) => void;

    selectedObj: string | undefined;
    setSelectedObj: React.Dispatch<React.SetStateAction<string | undefined>>;

    objNameList: {
        label: string;
        value: string;
    }[];

    selectedProductType: string | undefined;
    selectedObjRole: string;
    selectedObjName: string | undefined;
    setSelectedObjName: React.Dispatch<React.SetStateAction<string | undefined>>;

    dates: string[] | undefined;
    datesChart: string[] | undefined;
    setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    setDatesChart: React.Dispatch<React.SetStateAction<string[] | undefined>>;

    showTable: boolean;

}>({} as any);

interface IStatisticalReportsProviderProps {}

export interface IDataChart {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}

export default function StatisticalReportsProvider(props: React.PropsWithChildren<IStatisticalReportsProviderProps>) {

    // const userAccount = useAppSelector()
    const userRole = useAppSelector((state) => state.user.userInfo?.permission.role);
    console.log("user permission: ", userRole)
    const buttons = [
        { value: "homnay", label: "Hôm Nay" },
        { value: "homqua", label: "Hôm Qua" },
        { value: "tuannay", label: "Tuần Này" },
        { value: "thangnay", label: "Tháng Này" },
        { value: "namnay", label: "Năm Nay" },
        { value: "namtruoc", label: "Năm Trước" },
    ];

    /** create state */
    const [productCollection, setProductCollection] = useState<ISelection[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);
    const [formalites, setFormalites] = useState<ISelection[]>([]);
    const [selectedFormality, setSelectedFormality] = useState<string | undefined>(undefined);
    const [objectTypes, setObjectTypes] = useState<IExtendedSelection[]>([]);
    const [selectedObjectType, setSelectedObjectType] = useState<string | undefined>(undefined);

    const [nameButton, setNameButton] = useState<string>("homnay");
    const [nameButtonChart, setNameButtonChart] = useState<string>("namnay");

    const [selectedObj, setSelectedObj] = useState<string | undefined>(undefined);
    const [selectedObjRole, setSelectedObjRole] = useState<string>("");
    const [objNameRes, setObjNameRes] = useState<IUser[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string | undefined>(undefined);
    const [selectedObjName, setSelectedObjName] = useState<string | undefined>(undefined);
    const [dates, setDates] = useState<string[] | undefined>();
    const [datesChart, setDatesChart] = useState<string[] | undefined>();
    const [showTable, setShowTable] = useState<boolean>(false);


    useEffect(() => {
        if (userRole === EnterpriseRole.enterprise) {
            setFormalites([
                {
                    label: "Nông sản",
                    value: "agricultural-produce",
                }
            ]);

            setObjectTypes([
                {
                    label: "Trang trại",
                    role: "agricultural-produce",
                    value: "farm-garden"
                }, 
                {
                    label: "Cơ sở chế biến",
                    role: "agricultural-produce",
                    value: "processing-facility"
                }
            ])
        }
    } , [])

    useEffect(() => {
        if (!selectedObjectType) {
            setProductCollection([]);
            return;
        }

        loadEnterpriseProducts(selectedObjectType);
    }, [selectedObjectType])

    console.log("select object type: ", selectedObjectType);

    const loadEnterpriseProducts = async (objectType: string): Promise<EnterpriseProductResponse.IData[] | undefined> => {
        try {

            if (!objectType) return;

            let response: any;
            if (objectType.includes("farm-garden")) {
                response = await api.enterprise.enterpriseProducts.farmGarden.listAll();
            } else if (objectType.includes("processing-facility")) {
                response = await api.enterprise.enterpriseProducts.processingFacility.listAll();
            }

            if (response.status === "failure") {
                setProductCollection([]);
                return;
            }

            const formatedCollection = [...response.data].map((item: EnterpriseProductResponse.IData) => ({ 
                label: item.productName,
                value: item._id
            }));

            setProductCollection(formatedCollection);
        } catch (error) {
            console.log("load-enterprise-product-error: ", error);
            return;
        }
    }

    const loadObj = async (id: string) => {
        if(id === "sanpham"){
            if(dates && selectedProductType){
                const res = await api.statisticalReports.listProduct(selectedProductType);
            if (!res.data) {
                return undefined;
            }
            setObjNameRes(res.data);
            }
        }else{
                const res = await api.agriculturalProduce.farmGarden.partner.listUsersByRole(id);
            if (!res.data) {
                return undefined;
            }
            setObjNameRes(res.data);
        }
        
    };

    const btnChooseTimeClick = (item: IButtonData) => {
        setNameButton(item.value);
    };
    const btnChooseTimeChartClick = (item: IButtonData) => {
        setNameButtonChart(item.value);
    };

    useEffect(() => {
        switch (nameButton) {
            case "homnay":
                setDates([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
                break;
            case "homqua":
                setDates([dayjs().add(-1, "day").format("YYYY-MM-DD"), dayjs().add(-1, "day").format("YYYY-MM-DD")]);
                break;
            case "tuannay":
                setDates([dayjs().day(1).format("YYYY-MM-DD"), dayjs().day(7).format("YYYY-MM-DD")]);
                break;
            case "thangnay":
                setDates([
                    dayjs().date(1).format("YYYY-MM-DD"),
                    dayjs().date(dayjs().daysInMonth()).format("YYYY-MM-DD"),
                ]);
                break;
        }
    }, [nameButton]);

    useEffect(() => {
        let curYear = dayjs().year()
        switch (nameButtonChart) {
          
            case "namnay":
                setDatesChart([
                    `${curYear}-${"01"}-${"01"}`,
                    `${curYear}-${"12"}-${"31"}T23:59:00`,
                ]);
                break;
            case "namtruoc":
                curYear = curYear - 1
                setDatesChart([
                    `${curYear}-${"01"}-${"01"}`,
                    `${curYear}-${"12"}-${"31"}T23:59:00`,
                ]);
                break;
        }
    }, [nameButtonChart]);

    useEffect(() => {
        setSelectedObjRole("");
    }, [selectedProductType]);

    useEffect(() => {
        if(selectedObj === "sanpham"){
            setDatesChart([
                `${dayjs().year()}-${"01"}-${"01"}`,
                `${dayjs().year()}-${"12"}-${"31"}T23:59:00`,
            ])
            setNameButtonChart("namnay")
        }
        setShowTable(false);
        if (selectedObj) {
            loadObj(selectedObj);
            // setSelectedObjRole(findObjRole(selectedObj));
        }
        setSelectedObjName(undefined);
        setObjNameRes([])
    }, [selectedObj]);

    const objNameList = useMemo(() => {
        const result = objNameRes.map((item) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return result;
    }, [objNameRes]);

    return (
        <StatisticalReportsContext.Provider
            value={{
                userRole,
                productCollection,
                formalites,
                objectTypes,

                selectedProduct,
                setSelectedProduct,
                selectedFormality,
                setSelectedFormality,
                selectedObjectType,
                setSelectedObjectType,

                nameButton,
                nameButtonChart,
                setNameButton,
                setNameButtonChart,
                buttons,
                btnChooseTimeClick,
                btnChooseTimeChartClick,

                selectedObj,
                setSelectedObj,

                objNameList,

                dates,
                datesChart,
                setDates,
                setDatesChart,

                selectedProductType,

                selectedObjRole,
                selectedObjName,
                setSelectedObjName,

                showTable,
            }}
        >
            {props.children}
        </StatisticalReportsContext.Provider>
    );
}
