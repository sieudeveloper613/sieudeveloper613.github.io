import { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

/* types */
import { ITableCell } from "../../../common/DataTable";

/* hooks */
import { useAppSelector } from "../../../../redux/hooks";
import useMessageBox from "../../../../hooks/useMessageBox";
import processKeyword from "../../../../utils/preProcess/processKeyword";
import SSCCResponse from "../../../../sharetype/response/resources/enterprise/SSCCResponse";
import { Self } from ".";
import { STATUS } from "../../../../sharetype/response/resources/enterprise/SSCCResponse/SSCCResponse";
import SSCCFormData from "../../../../sharetype/form-data/resources/enterprise/SSCCFormData";
import messageAlert from "../../../../utils/messageAlert";


type collection = {
    _id: string,
    code: string | null,
    values: childrenCollection[] | null
}

type childrenCollection = [
    _id: string,
    createdDate: string | null,
    exportDate: string | null,
    importDate: string | null,
    vehicle: string | null,
    driver: string | never,
    items: {
        productName: string,
        amount: number,
        totalAmount: number,
    }[]
]

interface ISSCCContext {
    /* --- data --- */
    isValid: boolean,
    isLoading: boolean,
    collection: SSCCResponse.TCollection,
    resetableValue: any,
    isDisplayLifeCycle: boolean,
    isDisplayCreatingForm: boolean,
    isDisplayResetingAlert: boolean,
    formatedCollection: ITableCell[],
    childrenCollection: SSCCResponse.IStorage[] | null,
    
    /* --- state --- */
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    code: string,
    setCode: Dispatch<SetStateAction<string>>,
    /* handle event: searching */
    handleSearch: () => void,
    /* handle event: Create new sscc code */
    handleClosingCreatingForm: () => void,
    handleDisplayingCreatingForm: () => void,
    handleConfirmingCreatingForm: () => void,
    /* handle events: Life-cycle */
    handleClosingLifeCycle: () => void,
    handleDisplayingLifeCycle: (_id: string) => void,
    /* handle events: Reseting */
    handleClosingResetingForm: () => void,
    handleConfirmingResetingSSCC: () => void,
    handleDisplayingResetingAlert: (_id: string) => void,
    handleDisplayingResetingForm: (_id: string) => void,
}

export const SSCCContext = createContext<ISSCCContext>({
    /* --- data --- */
    isValid: false,
    collection: [],
    isLoading: false,
    resetableValue: {},
    formatedCollection: [],
    childrenCollection: [],
    isDisplayLifeCycle: false,
    isDisplayCreatingForm: false,
    isDisplayResetingAlert: false,
    /* --- state --- */
    search: "",
    setSearch: () => {},
    code: "",
    setCode: () => {},
    /* handle event: searching */
    handleSearch: () => {},
    /* handle event: Create new sscc code */
    handleClosingCreatingForm: () => {},
    handleDisplayingCreatingForm: () => {},
    handleConfirmingCreatingForm: () => {},
    /* handle events: Life-cycle */
    handleClosingLifeCycle: () => {},
    handleDisplayingLifeCycle: () => {},
    /* handle events: Reseting */
    handleClosingResetingForm: () => {},
    handleConfirmingResetingSSCC: () => {},
    handleDisplayingResetingAlert: () => {},
    handleDisplayingResetingForm: () => {},
})

const SSCCProvider = ({ children }: { children: any }) => {
    // create hook
    const messageBox = useMessageBox();

    // create redux
    const row = useAppSelector((state) => state.paging.row);
    const page = useAppSelector((state) => state.paging.currentPage);

    // create state
    const [code, setCode] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resetableValue, setResetableValue] = useState<any>({});
    const [collection, setCollection] = useState<SSCCResponse.TCollection>([]);
    const [isDisplayLifeCycle, setIsDisplayLifeCycle] = useState<boolean>(false);
    const [formatedCollection, setFormatedCollection] = useState<ITableCell[]>([]);
    const [isDisplayCreatingForm, setIsDisplayCreatingForm] = useState<boolean>(false);
    const [isDisplayResetingAlert, setIsDisplayResetingAlert] = useState<boolean>(false);
    const [childrenCollection, setChildrenCollection] = useState<SSCCResponse.IStorage[] | null>([]);

    // create useEffect to handle events
    useEffect(() => {
        loadData();
    }, [page, row])

    useEffect(() => {
        formatCollectionToTable();
    }, [collection])

    const loadData = async (): Promise<SSCCResponse.TCollection | undefined> => {
        try {
            setIsLoading(true);
            const response = await Self.contextApi.list(page, row);
            
            if (response.status === "failure") {
                setCollection([]);
                setIsLoading(false);
                return;
            }

            setCollection(response.data);
            setIsLoading(false);
            return;
        } catch (error) {
            console.log("load-data-error: ", error);
            setIsLoading(false);
            return;
        }
    }

    const create = async (formData: SSCCFormData.ICreate) => {
        try {
            const response = await Self.contextApi.create(formData);
            if (response.status === "failure") {
                return messageAlert("error", "Tạo mới không thành công!");
            }

            loadData();
            return messageAlert("success", "Tạo mới thành công!");
        } catch (error) {
            console.log("create-error: ", error);
            return;
        }
    }

    const reset = async (code: string) => {
        try {
            const response = await Self.contextApi.reset(code);
            if (response.status === "failure") {
                return messageAlert(
                    "error", 
                    "Reset thất bại. SSCC chỉ được thiết lập lại khi ở trạng thái có sãn hoặc đã có thời gian nhập hàng"
                );
            }

            loadData();
            return messageAlert("success", "Tái thiết lập SSCC thành công!");
        } catch (error) {
            console.log("reset-error: ", error);
            return messageAlert("error", "Cập nhật thất bại. Lỗi hệ thống!");
        }
    }

    const handleSearch = () => {
        if (collection.length === 0) return;
        
        const filteredCollection = collection.filter((item: SSCCResponse.IData) => {
            return processKeyword(item.code).toLowerCase().includes(processKeyword(search).toLowerCase().trim());
        });
        
        return filteredCollection.length > 0 ? 
            setFormatedCollection(
                filteredCollection.map((item: SSCCResponse.IData) => {
                    let status: string;

                    switch (item.status) {
                        case STATUS.IS_PENDING: 
                            status = "Có sãn"; 
                            break;
                        case STATUS.IS_CONTAINING: 
                            status = "Chứa hàng"; 
                            break;
                        case STATUS.IS_EXPORTING: 
                            status = "Đang vận chuyển";
                            break;
                        case STATUS.IS_COMPLETED: 
                        status = "Hoàn thành";
                        break;
                    };
                    return { 
                        _id: item._id, 
                        items: [item.code, status] 
                    }
                })
            ) : setFormatedCollection([]);
    }

    const handleDisplayingCreatingForm = () => {
        setIsDisplayCreatingForm(true);
        return;
    }

    const handleClosingCreatingForm = () => {
        setCode("");
        setIsDisplayCreatingForm(false);
        return;
    }

    const handleConfirmingCreatingForm = async () => {
        if (!code || code.length === 0) {
            setIsValid(true);
            return;
        }

        await create({ code });

        setCode("");
        setIsDisplayCreatingForm(false);
        return;
    }

    const handleClosingLifeCycle = () => {
        setIsDisplayLifeCycle(false);
        return;
    }

    const handleDisplayingLifeCycle = (id: string): void => {
        setIsDisplayLifeCycle(true);
        const foundItem = collection.find((item: SSCCResponse.IData) => item._id === id);
        
        if (!foundItem) return;

        const values = foundItem.storages;
        setChildrenCollection(values);
        return;
    }

    const handleClosingResetingForm = () => {
        setIsDisplayResetingAlert(false);
        return;
    }

    const handleConfirmingResetingSSCC = () => {
        return messageBox({
            message: "Tạo lại vòng thời sẽ khiến dữ liệu trong SSCC biến mất, bạn có chắc chắn muốn thiết lập lại không?",
            buttons: [
                {
                    label: "Hủy bỏ",
                    onClick() {
                        setIsDisplayResetingAlert(false);
                    },
                },
                {
                    label: "Xác nhận",
                    onClick: async () => {
                        await reset(resetableValue.code);
                        setIsDisplayResetingAlert(false);
                    },
                },
            ],
        });
    }

    const handleDisplayingResetingAlert = (id: string) => {
        const foundItem = collection.find((item: any) => item._id === id);
        console.log("found reset item: ", foundItem?.code);
        setResetableValue(foundItem);
        setIsDisplayResetingAlert(true);
        return;
    }

    const handleDisplayingResetingForm = () => {
       setIsDisplayResetingAlert(true);
    }

    const formatCollectionToTable = () => {
        const fomated = collection.map((item: SSCCResponse.IData) => {
            let status: string;

            switch (item.status) {
                case STATUS.IS_PENDING: 
                    status = "Có sãn"; 
                    break;
                case STATUS.IS_CONTAINING: 
                    status = "Chứa hàng"; 
                    break;
                case STATUS.IS_EXPORTING: 
                    status = "Đang vận chuyển";
                    break;
                case STATUS.IS_COMPLETED: 
                    status = "Hoàn thành";
                    break;
            };
            return { 
                _id: item._id, 
                items: [item.code, status] 
            }
        });

        setFormatedCollection(fomated);
    }

    return(
        <SSCCContext.Provider value={{
            /* --- data --- */
            isValid,
            isLoading,
            collection,
            resetableValue,
            formatedCollection,
            childrenCollection,
            isDisplayLifeCycle,
            isDisplayCreatingForm,
            isDisplayResetingAlert,
            /* --- state --- */
            search, setSearch,
            code, setCode,
            /* handle event: searching */
            handleSearch,
            /* handle event: Create new sscc code */
            handleClosingCreatingForm,
            handleDisplayingCreatingForm,
            handleConfirmingCreatingForm,
            /* handle events: Life-cycle */
            handleClosingLifeCycle,
            handleDisplayingLifeCycle,
            /* handle events: Reseting */
            handleClosingResetingForm,
            handleConfirmingResetingSSCC,
            handleDisplayingResetingAlert,
            handleDisplayingResetingForm,
        }}>
            {children}
        </SSCCContext.Provider>
    )
}

export default SSCCProvider;