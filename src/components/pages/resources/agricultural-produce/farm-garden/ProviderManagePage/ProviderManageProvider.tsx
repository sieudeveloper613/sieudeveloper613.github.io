import React, { useEffect, useState, useCallback, createContext, Dispatch, SetStateAction } from "react";

/* configurations */
import { Self } from ".";
import { Self as SupplierSelf } from "../Supplier/index";
import messageAlert from "../../../../../../utils/messageAlert";
import { Self as MaterialTypeSelf } from "../TypeSupliesPage/index";
import { Self as MaterialNameSelf } from "../NameSuppliesPage/index";

/* hooks */
import { useAppSelector } from "../../../../../../redux/hooks";

/* types */
import { IOption } from "../../../../../common/Selection";
import { ITableCell } from "../../../../../common/DataTable";
import processKeyword from "../../../../../../utils/preProcess/processKeyword";

/* packages */
import moment from "moment";
import SupplierManagementResponse from "../../../../../../sharetype/response/resources/enterprise/farm-garden/SupplierManagementResponse";
import SupplierManagementFormData from "../../../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierManagementFormData";


type TSelections = {
    id: string,
    label: string,
    value: string | null
}

interface IDates {
    manufacturingDate: Date | null,
    expiryDate: Date | null,
    deliveryDate: Date | null,
}

interface IDisplayForm {
    create: boolean,
    view: boolean,
}

interface IInvalids {
    supplier: boolean,
    materialType: boolean,
    materialName: boolean,
    manufacturingDate: boolean,
    expiryDate: boolean,
    deliveryDate: boolean
}

interface IProviderManageContext {
    isLoading: boolean,
    areInvalids: IInvalids,
    suppliers: TSelections[],
    materialNames: TSelections[],
    materialTypes: TSelections[],
    isDisplayForms: IDisplayForm,
    selectedItem: SupplierManagementResponse.IData | null,
    providersCollection: SupplierManagementResponse.IData[],
    formatedProvidersCollection: ITableCell[],

    dates: IDates,
    setDates: Dispatch<SetStateAction<IDates>>,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    selectedImage: any,
    setSelectedImage: Dispatch<SetStateAction<any>>,
    selectedSupplier: string | null,
    setSelectedSupplier: Dispatch<SetStateAction<string | null>>,
    selectedMaterialName: string | null,
    setSelectedMaterialName: Dispatch<SetStateAction<string | null>>,
    selectedMaterialType: string | null,
    setSelectedMaterialType: Dispatch<SetStateAction<string | null>>,

    handleSearchListener: () => void,
    handleCreateFormOpen: () => void,
    handleCreateFormClose: () => void,
    handleCreateFormConfirm: (...arg: any) => void,
    handleLifeCycleViewOpen: (_id: string) => void,
    handleLifeCycleViewClose: () => void,
}

export const ProviderManageContext = createContext<IProviderManageContext>({
    areInvalids: {
        supplier: false,
        materialType: false,
        materialName: false,
        manufacturingDate: false,
        expiryDate: false,
        deliveryDate: false
    },
    suppliers: [],
    isLoading: false,
    materialNames: [],
    materialTypes: [],
    selectedItem: null,
    providersCollection: [],
    formatedProvidersCollection: [],
    isDisplayForms: { create: false, view: false },

    dates: { manufacturingDate: null, expiryDate: null, deliveryDate: null },
    setDates: () => { },
    search: "",
    setSearch: () => { },
    selectedImage: null,
    setSelectedImage: () => { },
    selectedSupplier: null,
    setSelectedSupplier: () => { },
    selectedMaterialName: null,
    setSelectedMaterialName: () => { },
    selectedMaterialType: null,
    setSelectedMaterialType: () => { },

    handleSearchListener: () => { },
    handleCreateFormOpen: () => { },
    handleCreateFormClose: () => { },
    handleCreateFormConfirm: () => { },
    handleLifeCycleViewOpen: () => { },
    handleLifeCycleViewClose: () => { },
});

export interface IOptionExtend extends IOption {
    code?: string;
}

interface IPartnerProviderProps {
    children: any
}

export default function ProviderManageProvider({ children }: React.PropsWithChildren<IPartnerProviderProps>) {
    // create redux
    const numberOfRow = useAppSelector((state) => state.paging.row);
    const pageNumber = useAppSelector((state) => state.paging.currentPage);

    // create state
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [suppliers, setSuppliers] = useState<TSelections[]>([]);
    const [materialNames, setMaterialNames] = useState<TSelections[]>([]);
    const [materialTypes, setMaterialTypes] = useState<TSelections[]>([]);
    const [selectedItem, setSelectedItem] = useState<SupplierManagementResponse.IData | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
    const [providersCollection, setProvidersCollection] = useState<SupplierManagementResponse.IData[]>([]);
    const [selectedMaterialName, setSelectedMaterialName] = useState<string | null>(null);
    const [selectedMaterialType, setSelectedMaterialType] = useState<string | null>(null);
    const [formatedProvidersCollection, setFormatedProvidersCollection] = useState<ITableCell[]>([]);
    const [isDisplayForms, setIsDisplayForms] = useState<IDisplayForm>({ create: false, view: false });
    const [dates, setDates] = useState<IDates>({ manufacturingDate: null, expiryDate: null, deliveryDate: null });
    const [areInvalids, setAreInvalids] = useState<IInvalids>({
        supplier: false, materialType: false, materialName: false,
        manufacturingDate: false, expiryDate: false, deliveryDate: false
    });

    /* create useEffect to handle events */
    useEffect(() => {
        loadData(); 
        loadSuppliersData();
        loadMaterialTypesData();
        loadMaterialNamesData();
    }, [])

    useEffect(() => {
        loadMaterialNamesData();
    }, [selectedMaterialType])

    useEffect(() => {
        if (!providersCollection) return setFormatedProvidersCollection([]);

        setFormatedProvidersCollection(
            providersCollection.map((item: SupplierManagementResponse.IData) => ({
                _id: item._id,
                items: [item.supplierName]
            }))
        );
    }, [providersCollection])

    console.log("load data: ", providersCollection);

    /* load providers managament's list */
    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await Self.apiContext.list(pageNumber, numberOfRow);

            if (response.status === "failure") {
                setIsLoading(false);
                setProvidersCollection([]);
                return messageAlert("error", "Truy xuất dữ liệu thất bại!");
            }

            setProvidersCollection(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return console.log("load-data-error: ", error);
        }
    }, [pageNumber, numberOfRow])

    /* load provider's list for the Selection component */
    const loadSuppliersData = async () => {
        try {
            let dataWithPlaceholder: any = [];
            const response = await SupplierSelf.contextApi.list();

            if (response.status === "failure") {
                setSuppliers([]);
                return;
            }

            const placeholder = { id: "0", label: "Chọn nhà cung cấp", value: null };
            const mappedData = [...response.data].map((item: any) => ({
                id: item._id, label: item.name, value: JSON.stringify({ id: item._id, name: item.name })
            }));

            dataWithPlaceholder.unshift(placeholder, ...mappedData);
            setSuppliers(dataWithPlaceholder);
        } catch (error) {
            return console.log("suppliers-data-error: ", error);
        }
    }

    /* load material types's list for the Selection component */
    const loadMaterialTypesData = async () => {
        try {
            let dataWithPlaceholder: any = [];
            const response = await MaterialTypeSelf.contextApi.list();

            if (response.status === "failure") {
                setMaterialTypes([]);
                return;
            }

            const placeholder = { id: "0", label: "Chọn loại vật tư", value: null };
            const mappedData = [...response.data].map((item: any) => ({
                id: item._id, label: item.name, value: item.name
            }));

            dataWithPlaceholder.unshift(placeholder, ...mappedData);
            setMaterialTypes(dataWithPlaceholder);
        } catch (error) {
            return console.log("material-type-data-error: ", error);
        }
    }

    /* load material names's list for the Selection component (disabled when selectedMaterialType is null) */
    const loadMaterialNamesData = async () => {
        try {
            let dataWithPlaceholder: any = [];
            const response = await MaterialNameSelf.contextApi.collection();

            if (response.status === "failure") {
                setMaterialNames([]);
                return;
            }
            const filteredMaterialByType = [...response.data].filter((item: any) => {
                if (!selectedMaterialType) return;
                
                return processKeyword(item.nameSupplies) === (processKeyword(selectedMaterialType));
            });

            const placeholder = { id: "0", label: "Chọn tên vật tư", value: null };
            const mappedData = [...filteredMaterialByType].map((item: any) => ({
                id: item._id, label: item.name, value: JSON.stringify({ id: item._id, name: item.name })
            }));
            dataWithPlaceholder.unshift(placeholder, ...mappedData);

            setMaterialNames(dataWithPlaceholder);
        } catch (error) {
            return console.log("material-type-data-error: ", error);
        }
    }

    const handleSearchListener = useCallback(() => {
        if (providersCollection.length === 0) return;

        const filteredProviders = providersCollection.filter((item: SupplierManagementResponse.IData) => {
            return processKeyword(item.supplierName).toLowerCase().includes(processKeyword(search).toLowerCase().trim());
        })

        return filteredProviders.length > 0 ?
            setFormatedProvidersCollection(filteredProviders.map(value => ({ _id: value._id, items: [value.supplierName] }))) :
            setFormatedProvidersCollection([]);
    }, [search]);

    /* set states are empty when close or confirm events */
    const setEmptyStates = () => {
        setAreInvalids({
            supplier: false, materialType: false, materialName: false,
            manufacturingDate: false, expiryDate: false, deliveryDate: false
        });
        setSelectedImage(null);
        setSelectedSupplier(null);
        setSelectedMaterialType(null);
        setSelectedMaterialName(null);
        setDates({ manufacturingDate: null, expiryDate: null, deliveryDate: null });
    }

    /* open create form */
    const handleCreateFormOpen = () => {
        setIsDisplayForms(previousState => ({ ...previousState, create: true }));
    }

    /* close create form */
    const handleCreateFormClose = () => {
        setIsDisplayForms(previousState => ({ ...previousState, create: false }));
        setEmptyStates();
    }

    /* submit create form when the whole values are filled (except for selectedImage) */
    const handleCreateFormConfirm = useCallback( async () => {
        try {
            if (!selectedSupplier && !selectedMaterialType && !selectedMaterialName
                && !dates.manufacturingDate && !dates.expiryDate && !dates.deliveryDate) {
                setAreInvalids({ 
                    supplier: true, materialType: true, materialName: true, 
                    manufacturingDate: true, expiryDate: true, deliveryDate: true 
            });
            return;
        }

        if (!selectedSupplier) {
            setAreInvalids(previousState => ({ ...previousState, supplier: true }));
            return;
        }

        if (!selectedMaterialType) {
            setAreInvalids(previousState => ({ ...previousState, materialType: true }));
            return;
        }

        if (!selectedMaterialName) {
            setAreInvalids(previousState => ({ ...previousState, materialName: true }));
            return;
        }

        if (!dates.manufacturingDate) {
            setAreInvalids(previousState => ({ ...previousState, manufacturingDate: true }));
            return;
        }

        if (!dates.expiryDate) {
            setAreInvalids(previousState => ({ ...previousState, expiryDate: true }));
            return;
        }

        if (!dates.deliveryDate) {
            setAreInvalids(previousState => ({ ...previousState, deliveryDate: true }));
            return;
        }
        
        const supplier: { id: string, name: string } = JSON.parse(selectedSupplier);
        const material: { id: string, name: string } = JSON.parse(selectedMaterialName);
        let file: any;

        if (selectedImage) {
            file = await convertImageToBase64(selectedImage);
        }

        const formData: SupplierManagementFormData.ICreate = {
            "supplierId": supplier.id,
            "supplierName": supplier.name,
            "materialId": material.id,
            "materialImage": selectedImage ? file : "",
            "materialName": material.name,
            "materialType": selectedMaterialType,
            "deliveryDate": new Date(dates.deliveryDate),
            "manufaturingDate": new Date(dates.manufacturingDate),
            "expiryDate": new Date(dates.expiryDate),
        }

        const response = await Self.apiContext.create(formData);

        if (response.status === "failure") {
            messageAlert("success", "Tạo quản lý nhà cung cấp thất bại!");
            return;
        }

        messageAlert("success", "Tạo quản lý nhà cung cấp thành công!");
        loadData();
        setIsDisplayForms(previousState => ({ ...previousState, create: false }));
        setEmptyStates();  
        } catch (error) {
            console.log("create-form-confirm: ", error);
            return;
        }
    }, [selectedSupplier, selectedMaterialType, selectedMaterialName, dates])

    /* open the detail of provider when item's id must be matched given id parameter */
    const handleLifeCycleViewOpen = (id: string) => {
        const foundItem = providersCollection.find((item: any) => item._id === id);

        if (!foundItem) {
            setSelectedItem(null);
            return;
        }

        setSelectedItem(foundItem);
        setIsDisplayForms(previousState => ({ ...previousState, view: true }));
    }

    /* close the life cycle */
    const handleLifeCycleViewClose = () => {
        setIsDisplayForms(previousState => ({ ...previousState, view: false }));
        setSelectedItem(null);
    }

    function convertImageToBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    return (
        <ProviderManageContext.Provider
            value={{
                suppliers,
                isLoading,
                areInvalids,
                selectedItem,
                materialNames,
                materialTypes,
                isDisplayForms,
                providersCollection,
                formatedProvidersCollection,
                
                dates,
                setDates,
                search,
                setSearch,
                selectedImage,
                setSelectedImage,
                selectedSupplier,
                setSelectedSupplier,
                selectedMaterialName,
                setSelectedMaterialName,
                selectedMaterialType,
                setSelectedMaterialType,

                handleSearchListener,
                handleCreateFormOpen,
                handleCreateFormClose,
                handleCreateFormConfirm,
                handleLifeCycleViewOpen,
                handleLifeCycleViewClose,
            }}
        >
            {children}
        </ProviderManageContext.Provider>
    );
}
