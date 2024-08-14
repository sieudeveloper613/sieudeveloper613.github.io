import { Dispatch, SetStateAction, createContext, useState, useEffect, useCallback } from "react";

/* types */
import { ITableCell } from "../../../../../common/DataTable";

/* configurations */
import { Self } from ".";
import messageAlert from "../../../../../../utils/messageAlert";
import useMessageBox from "../../../../../../hooks/useMessageBox";
import { Self as IngredientSelf } from "../../farm-garden/Ingredient";
import processKeyword from "../../../../../../utils/preProcess/processKeyword";

/* hooks */
import { useAppSelector } from "../../../../../../redux/hooks";
import ProcessCodeFormData from "../../../../../../sharetype/form-data/resources/enterprise/processing-facility/ProcessCodeFormData";
import ProcessCodeResponse from "../../../../../../sharetype/response/resources/enterprise/processing-facility/ProcessCodeResponse";

export type TProcessCodeCollection = {
    _id: string,
    code: string,
    ingredientName: string,
    lifeCycle: {
        _id: string,
        createdDate: string,
        rawMaterials: {
            _id: string,
            farm: string,
            gardenCode: string,
            materialName: string,
            amount: number
        }[] | null,
        processes: {
            washing: string[][],
            drying: string[][],
            peel: string[][],
        },
        products: {
            _id: string,
            productName: string,
            amount: number,
            totalAmount: number,
        }[] | null
    }[] | null
}

interface IDisplay {
    create: boolean,
    view: boolean,
    edit: boolean, 
    remove: boolean
}

interface IIngredients {
    _id: string,
    label: string,
    value: string | null,
}

interface IProcessCodeContext {
    isLoading: boolean,
    isDisplays: IDisplay,
    ingredients: IIngredients[],
    selectedIngredient: string | null;
    selectedItem: TProcessCodeCollection | null,
    formatedProcessCodeCollection: ITableCell[],
    processCodeCollection: ProcessCodeResponse.IData[],
    
    code: string,
    setCode: Dispatch<SetStateAction<string>>,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,

    handleSearchListener: () => void,
    handleCreateConfirm: () => void,
    handleIngredientSelected: (value: string) => void,
    handleCreatingFormOpen: () => void,
    handleCreatingFormClose: () => void,
    handleLifeCycleViewOpen: (id: string) => void,
    handleLifeCycleViewClose: () => void,
    handleEditFormOpen: (id: string) => void,
    handleEditFormClose: () => void,
    handleEditConfirm: (code: string) => void,
    handleRemoveFormClose: () => void,
    handleRemoveConfirm: (id: string) => void,
}

export const ProcessCodeContext = createContext<IProcessCodeContext>({
    ingredients: [],
    isLoading: false,
    selectedItem: null,
    selectedIngredient: null,
    processCodeCollection: [],
    formatedProcessCodeCollection: [],
    isDisplays: { create: false, view: false, edit: false, remove: false },
    
    code: "",
    setCode: () => {},
    search: "",
    setSearch: () => {},

    handleSearchListener: () => {},
    handleCreateConfirm: () => {},
    handleIngredientSelected: () => {},
    handleCreatingFormOpen: () => {},
    handleCreatingFormClose: () => {},
    handleLifeCycleViewOpen: () => {},
    handleLifeCycleViewClose: () => {},
    handleEditFormOpen: () => {},
    handleEditFormClose: () => {},
    handleEditConfirm: () => {},
    handleRemoveFormClose: () => {},
    handleRemoveConfirm: () => {},
}); 

const ProcessCodeProvider = ({ children }: { children: any }) => {
    // create message box
    const messageBox = useMessageBox();

    // create redux
    const numberOfRows = useAppSelector((state) => state.paging.row);
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);

    // create state
    const [code, setCode] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [ingredients, setIngredients] = useState<IIngredients[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<any>(null); 
    const [processCodeCollection, setProcessCodeCollection] = useState<ProcessCodeResponse.IData[]>([]);
    const [formatedProcessCodeCollection, setFormatedProcessCodeCollection] = useState<ITableCell[]>([]);
    const [isDisplays, setIsDisplays] = useState<IDisplay>({ create: false, view: false, edit: false, remove: false });

    /* create useEffect to handle events */
    useEffect(() => {
        const formatedData = processCodeCollection.map((item: any) => ({
            _id: item._id, 
            items: [item.code, item.ingredientName],
        }));
        setFormatedProcessCodeCollection(formatedData);
    }, [processCodeCollection])

    useEffect(() => {
        loadProcessCodeList();
        loadIngredientsList();
    }, [])

    /* load list of process-code up*/
    const loadProcessCodeList = async () => {
        try {
            setIsLoading(true);

            const response = await Self.contextApi.list(numberOfRowsRedux, numberOfRows);

            if (response.status === "failure") {
                setProcessCodeCollection([]);
                setIsLoading(false);
                return;
            }

            const { data: { data } } = response;
            setProcessCodeCollection(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return console.log("load-process-code-error: ", error);
        }
    }

    /* load list of ingredients up */
    const loadIngredientsList = async () => {
        try {
            const response = await IngredientSelf.contextApi.list();
            
            if (response.status === "failure") {
                setIngredients([]);
                return;
            }

            const { data } = response;
            let dataWithLabel: IIngredients[] = [];

            const fomatedData = [...data].map((item: any) => ({ _id: item._id, label: item.name, value: JSON.stringify(item) }));
            const placeholder = { _id: "0", label: "Chọn nguyên liệu", value: null };
            
            dataWithLabel.unshift(placeholder, ...fomatedData);
            setIngredients(dataWithLabel);
        } catch (error) {
            return console.log("load-ingredient-erorr: ", error);
        }
    }

    /* search item by code and ingredient name */
    const handleSearchListener = useCallback(() => {
        if (processCodeCollection.length === 0) return;
        
        const filteredCollection = processCodeCollection.filter((item: any) => {
            return  processKeyword(item.code).includes(processKeyword(search).trim().toLocaleLowerCase()) ||
                processKeyword(item.ingredientName).includes(processKeyword(search).trim().toLocaleLowerCase());
        })
        
        return filteredCollection.length > 0 ? 
            setFormatedProcessCodeCollection(
                filteredCollection.map((item: any) => ({ _id: item.ingredientId, items: [item.code, item.ingredientName] }))
            ) : setFormatedProcessCodeCollection([]);
    }, [search]) 

    console.log("selected ingredient: ", selectedIngredient);

    /* create new process code */
    const handleCreateConfirm = async () => {
        if (!code.length && !selectedIngredient) return messageAlert("warning", "Vui lòng nhập tất cả thông tin!");

        if (!code.length) return messageAlert("warning", "Vui lòng nhập mã quy trình!");

        if (!selectedIngredient) return messageAlert("warning", "Vui lòng chọn nguyên liệu!");

        const parseValue = JSON.parse(selectedIngredient);

        const formData: ProcessCodeFormData.ICreate = {
            code: code,
            ingredientId: parseValue._id,
            ingredientName: parseValue.name,
            processNames: parseValue.process.map((item: any) => item.name)
        }

        const response = await Self.contextApi.create(formData);

        if (response.status === "failure") {
            return messageAlert("error", "Tạo mã thất bại, thử lại sau!");
        }

        messageAlert("success", "Tạo mã thành công!");
        loadProcessCodeList();
        setIsDisplays((previousState: IDisplay) => ({...previousState, create: false}));
        setCode("");
        setSelectedIngredient(null);
    }

    /* select ingredient in the ingredient's list */
    const handleIngredientSelected = useCallback((value: string) => {
        setSelectedIngredient(value);
    }, [selectedIngredient])

    /* open the create form */
    const handleCreatingFormOpen = () => {
        setIsDisplays((previousState: IDisplay) => ({...previousState, create: true}));
    }

    /* close the create form */
    const handleCreatingFormClose = () => {
        setIsDisplays((previousState: IDisplay) => ({...previousState, create: false}));
        setCode("");
        setSelectedIngredient(null);
    }

    /* open the life cycle and select id */
    const handleLifeCycleViewOpen = useCallback((id: string) => {
        const foundItemById = processCodeCollection.find((item: any) => item._id === id);
        setSelectedItem(foundItemById);
        setIsDisplays((previousState: IDisplay) => ({...previousState, view: true}));
    }, [selectedItem])

    /* close the life cycle */
    const handleLifeCycleViewClose = () => {
        setIsDisplays((previousState: IDisplay) => ({...previousState, view: false}));
        setSelectedItem(null);
    }

    /* open the edit form */
    const handleEditFormOpen = useCallback((id: string) => {
        const foundItemById = processCodeCollection.find((item: any) => item._id === id);
        
        setSelectedItem(foundItemById);
        setIsDisplays((previousState: IDisplay) => ({...previousState, edit: true}));
    }, [selectedItem, processCodeCollection])

    /* close the edit form */
    const handleEditFormClose = () => {
        setIsDisplays((previousState: IDisplay) => ({...previousState, edit: false}));
        setCode("");
        setSelectedIngredient(null);
        setSelectedItem(null);
    }

    /* edit process code (this edit is like create new life cycle) */
    const handleEditConfirm = async (code: string) => {
        const response = await Self.contextApi.update(code);

        if (response.status === "failure") {
            return messageAlert("error", "Tạo vòng đời mới thất bại!");
        }

        setIsDisplays((previousState: IDisplay) => ({...previousState, edit: false}));
        return messageAlert("success", "Tạo mới vòng đời thành công!");
    }

    /* close remove form */
    const handleRemoveFormClose = () => {
        setIsDisplays((previousState: IDisplay) => ({...previousState, remove: false}));
    }

    /* remove the process code by id */
    const handleRemoveConfirm = (id: string) => {
        return messageBox({
            message: "Bạn có chắc muốn xóa mã quy trình này không?",
            buttons: [
                {
                    label: "Hủy bỏ",
                    onClick: handleRemoveFormClose
                },
                {
                    label: "Xác nhận",
                    onClick: async () => {
                        const response = await Self.contextApi.remove(id);

                        if (response.status === "failure") {
                            setIsDisplays((previousState: IDisplay) => ({...previousState, remove: false}));
                            return messageAlert("error", "Xóa mã quy trình không thành công!"); 
                        }

                        loadProcessCodeList();
                        setIsDisplays((previousState: IDisplay) => ({...previousState, remove: false}));
                        return messageAlert("success", "Đã xóa mã quy trình!");
                    },
                },
            ],
        });
    }

    return (
        <ProcessCodeContext.Provider 
            value={{
                isLoading,
                isDisplays,
                ingredients,
                selectedItem,
                selectedIngredient,
                processCodeCollection,
                formatedProcessCodeCollection,
    
                code,
                setCode,
                search,
                setSearch,

                handleSearchListener,
                handleCreateConfirm,
                handleIngredientSelected,
                handleCreatingFormOpen,
                handleCreatingFormClose,
                handleLifeCycleViewOpen,
                handleLifeCycleViewClose,
                handleEditFormOpen,
                handleEditFormClose,
                handleEditConfirm,
                handleRemoveFormClose,
                handleRemoveConfirm,
            }}
        >
            {children}
        </ProcessCodeContext.Provider>
    )
}

export default ProcessCodeProvider;
