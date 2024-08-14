import { useRef, useState, useEffect, useCallback, createContext } from "react";
import { Self } from "./";

/* configurations, utils */
import generate from "../../../../../../utils/generate";
import { useAppSelector } from "../../../../../../redux/hooks";
import messageAlert from "../../../../../../utils/messageAlert";
import processKeyword from "../../../../../../utils/preProcess/processKeyword";

/* hooks */
import useMessageBox from "../../../../../../hooks/useMessageBox";

/* types */
import { ITableCell } from "../../../../../common/DataTable";
import TPermission from "../../../../../../sharetype/TPermission";
import ProductResponse from "../../../../../../sharetype/response/resources/enterprise/ProductResponse";
import ProductFormData from "../../../../../../sharetype/form-data/resources/enterprise/ProductFormData";

export interface IAccessInfoManageProviderProps {
    permission: TPermission;
}

export interface dataInputForm {
    _id: string;
    info: string;
    content: string;
}

type TAccessInfoManageContext = {
    isLoading: boolean,
    isDisplay: boolean,
    checkValidAll: boolean;
    dataSheet: ITableCell[];
    collection: ProductResponse.TList;
    selectedItem: ProductResponse.IData | undefined,

    /* handle events */
    handleSearchListener: () => void;
    handleUpdateOpen: (id: string) => void;
    handleUpdateClose: () => void,
    handleUpdateListener: () => void,
    handleInputFormCreate: () => void
    handleInputFormRemove: (id: string) => void,
    handleShowHideInformation: (value: string) => void,
    handleChangeText: (id: string, object: string, value: string) => void,

    /* state */
    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    dataInput: ProductResponse.IAdditionControl[];
    setDataInput: React.Dispatch<React.SetStateAction<ProductResponse.IAdditionControl[]>>;
}

export const AccessInfoManageContext = createContext<TAccessInfoManageContext>({
    dataSheet: [],
    collection: [],
    isLoading: false,
    isDisplay: false,
    checkValidAll: false,
    selectedItem: undefined,
    
    /* handle events */
    handleUpdateOpen: () => {},
    handleChangeText: () => {},
    handleUpdateClose: () => {},
    handleUpdateListener: () => {},
    handleSearchListener: () => {},
    handleInputFormCreate: () => {},
    handleInputFormRemove: () => {},
    handleShowHideInformation: () => {},

    /* state */
    inputName: "",
    setInputName: () => { },
    searchInput: "",
    setSearchInput: () => { },
    dataInput: [],
    setDataInput: () => { },
});

const AccessInfoManageProvider = (props: React.PropsWithChildren<IAccessInfoManageProviderProps>) => {
    // create hook
    const messageBox = useMessageBox();

    // create redux
    const rows = useAppSelector((state) => state.paging.row);
    const page = useAppSelector((state) => state.paging.currentPage);

    // create ref
    const nameRef = useRef<string>("");

    // create state
    const [isDisplay, setIsDisplay] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [dataSheet, setDataSheet] = useState<ITableCell[]>([]);
    const [idUpdate, setIdUpdate] = useState<string | null>(null);
    const [checkValidAll, setCheckValidAll] = useState<boolean>(false);
    const [collection, setCollection] = useState<ProductResponse.TList>([]);
    const [dataInput, setDataInput] = useState<ProductResponse.IAdditionControl[]>([]);
    const [selectedItem, setSelectedItem] = useState<ProductResponse.IData | undefined>(undefined);

    // update ref
    nameRef.current = inputName;

    // create useEffect to handle event
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!collection) return setDataSheet([]);

        const responsableData = [...collection];
        setDataSheet(responsableData.map((item: any) => {
            return {
                _id: item._id,
                items: [item.productName],
            }
        }));
    }, [collection]);

    // load list of data
    const loadData = useCallback(async (): Promise<ProductResponse.TList | undefined> => {
        setIsLoading(true);
        const response = await Self.apiContext.list(page, rows);

        if (response.status === "failure") {
            setCollection([]);
            setIsLoading(false);
            messageAlert("error", "Lấy dữ liệu từ máy chủ thất bại!");
            return; 
        }

       setCollection(response.data);
       setIsLoading(false);
    }, [page, rows]);

    // update the properties of item
    const update = async (id: string, formData: ProductFormData.IUpdateControl) => {
        const response = await Self.apiContext.updateControl(id, formData);

        if (response.status === "failure") {
            return messageAlert("error", "Cập nhật thất bại!")
        }

        loadData();
        setIsDisplay(false);
        messageAlert("success", "Cập nhật thành công!");
        setIdUpdate(null);
        setSelectedItem(undefined);
    }

    const handleSearchListener = () => {
        if (!collection.length) return setDataSheet([]);

        const filterData = collection.filter((item: ProductResponse.IData) => {
            return processKeyword(item.productName ?? "").toLocaleLowerCase().includes(processKeyword(searchInput).trim().toLocaleLowerCase());
        });

        if (filterData) {
            setDataSheet(filterData.map((item: any) => {
                return {
                    _id: item._id,
                    items: [item.productName],
                }
            }))
        }
    }

    const handleUpdateOpen = (id: string) => {
        // console.log("get id update: ", id);
        setIdUpdate(id);

        const foundItem = collection.find((item: ProductResponse.IData) => {
            if (item._id !== id) {
                return; 
            }
            
            return item;
        });
        setSelectedItem(foundItem);
        setDataInput(foundItem?.control.additionControl || [])
        setIsDisplay(true);
    }

    const handleUpdateClose = () => {
        setIsDisplay(false);
        setDataInput(selectedItem?.control.additionControl ? selectedItem?.control.additionControl : []);
        setIdUpdate(null);
        setSelectedItem(undefined);
    }

    const handleUpdateListener = async () => {
        try {   
            if (!idUpdate) {
                return messageAlert("error", "Không tìm thấy mã sản phẩm!");
            }

            if (!selectedItem) {
                return messageAlert("error", "Không tìm thấy chi tiết sản phẩm!");
            }

            if (dataInput.length && dataInput.every((item: ProductResponse.IAdditionControl) => !item.title.length)) {
                return messageAlert("warning", "Trường thông tin không được để trống!")
            }

            const formData: ProductFormData.IUpdateControl = {
                control: {
                    defaultControl: selectedItem?.control.defaultControl,
                    additionControl: dataInput.map((item: ProductResponse.IAdditionControl) => ({ 
                        title: item.title, content: item.content
                    }))
                }
            }

            return await update(idUpdate, formData);
        } catch (error) {
            console.log("update-error: ", error);
            return;
        }
    }

    const handleInputFormCreate = () => {
        setDataInput((prevState: ProductResponse.IAdditionControl[]) => [...prevState, { _id: generate.id(), title: "", content: "" }]);
    }

    const handleChangeText = useCallback((id: string, object: string, value: string) => {
        console.log("handle change: ", { id, object, value })
        setDataInput((prevState: any) => {
            const newData = [...prevState];
                const updateObject = newData.find((item) => item._id === id);

                if (!updateObject) return prevState;

                updateObject[object]  = value;

                return newData;
            });
        },
        [setDataInput],
    );
    
    const handleInputFormRemove = (id: string) => {
        setDataInput((prevState: ProductResponse.IAdditionControl[]) => prevState.filter((item: ProductResponse.IAdditionControl) => item._id !== id))
    }

    const handleShowHideInformation = (value: string) => {
        let updatedInformation: ProductResponse.IData;

        if (!selectedItem) return;

        switch (value) {
            case "Tên đối tượng":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isObjectNameShowing: !selectedItem.control.defaultControl.isObjectNameShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Địa chỉ":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isObjectAddressShowing: !selectedItem.control.defaultControl.isObjectAddressShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Mã GLN":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isObjectGLNShowing: !selectedItem.control.defaultControl.isObjectGLNShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Mã khu vườn":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isGardenShowing: !selectedItem.control.defaultControl.isGardenShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Tên sản phẩm":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isProductShowing: !selectedItem.control.defaultControl.isProductShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Quy trình trồng trọt":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isCultivationProcessesShowing: !selectedItem.control.defaultControl.isCultivationProcessesShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Thông tin nguyên liệu":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isIngredientShowing: !selectedItem.control.defaultControl.isIngredientShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Ngày thu hoạch":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isHarvestDateShowing: !selectedItem.control.defaultControl.isHarvestDateShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Khối lượng":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isWeightShowing: !selectedItem.control.defaultControl.isWeightShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Quy cách đóng gói":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isPackTypeShowing: !selectedItem.control.defaultControl.isPackTypeShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Ngày sản xuất":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isManufacturingDateShowing: !selectedItem.control.defaultControl.isManufacturingDateShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Hạn sử dụng":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isExpiryDateShowing: !selectedItem.control.defaultControl.isExpiryDateShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "SSCC":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isSSCCShowing: !selectedItem.control.defaultControl.isSSCCShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Ngày khởi tạo":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isSSCCCreatedAtSShowing: !selectedItem.control.defaultControl.isSSCCCreatedAtSShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Ngày xuất hàng":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isSSCCExportedAtShowing: !selectedItem.control.defaultControl.isSSCCExportedAtShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Thông tin vận chuyển":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isDeliveryShowing: !selectedItem.control.defaultControl.isDeliveryShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Tên nơi đến":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isRecipientNameShowing: !selectedItem.control.defaultControl.isRecipientNameShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Địa chỉ nơi đến":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isRecipientAddressShowing: !selectedItem.control.defaultControl.isRecipientAddressShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            case "Mã GLN đến":
                updatedInformation = {
                    ...selectedItem,
                    control: {
                        ...selectedItem?.control,
                        defaultControl: {
                            ...selectedItem.control.defaultControl,
                            isRecipientGLNShowing: !selectedItem.control.defaultControl.isRecipientGLNShowing
                        }
                    }
                }
                setSelectedItem(updatedInformation);
            break;
            default: setSelectedItem(selectedItem);
        }
    }

    console.log("updated field: ", selectedItem?.control)

    return (
        <AccessInfoManageContext.Provider
            value={{
                isLoading,
                dataSheet,
                isDisplay,
                collection,
                selectedItem,
                checkValidAll,

                handleSearchListener,
                handleChangeText,
                handleUpdateOpen,
                handleUpdateClose,
                handleUpdateListener,
                handleInputFormCreate,
                handleInputFormRemove,
                handleShowHideInformation,

                inputName, setInputName,
                dataInput, setDataInput,
                searchInput, setSearchInput,
            }}
        >
            {props.children}
        </AccessInfoManageContext.Provider>
    );
};

export default AccessInfoManageProvider;
