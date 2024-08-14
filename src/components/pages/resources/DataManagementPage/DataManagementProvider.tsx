import React, { useState, useEffect, useCallback } from "react";

/* packages */
import { useSearchParams } from "react-router-dom";

/* configurations */
import { Self } from ".";
import api from "../../../../api";
import { useAppSelector } from "../../../../redux/hooks";
import messageAlert from "../../../../utils/messageAlert";

/* types */
import { ISignIn } from "../../../../sharetype/response/LoginResponse/LoginResponse";
import AgriculturalProductCodeResponse from "../../../../sharetype/response/resources/enterprise/AgriculturalProductCodeResponse";
import ProductResponse from "../../../../sharetype/response/resources/enterprise/ProductResponse";
import Address from "../../../../utils/Address";

interface IDataManagermentContext {
    isChildrenLoading: boolean,
    infoAccount: ISignIn | undefined;
    isDataShowing: ProductResponse.IDefaultControl | null;
    responsibleData: AgriculturalProductCodeResponse.IData | null | undefined; 

    isShare: boolean;
    setIsShare: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    search: string;
    handleInputChange: (text: string) => void;
    childrenData: AgriculturalProductCodeResponse.IData | null | undefined,
    setChildrenData: React.Dispatch<React.SetStateAction<AgriculturalProductCodeResponse.IData | null | undefined>>,
    
    handleShareListener: () => void;
    handleSearchListener: () => void;
    handleResourceSearch: (code: string) => void;
} 

export const DataManagementContext = React.createContext<IDataManagermentContext>({
    isDataShowing: null,
    responsibleData: null,
    infoAccount: undefined,
    isChildrenLoading: false,
    
    search: "",
    handleInputChange: () => {},
    isShare: false,
    setIsShare: () => {},
    isLoading: false,
    setIsLoading: () => {},
    childrenData: undefined,
    setChildrenData: () => {},
    
    handleShareListener: () => {},
    handleSearchListener: () => {},
    handleResourceSearch: () => {},
});

interface IDataManagementProviderProps {}

export default function DataManagementProvider(props: React.PropsWithChildren<IDataManagementProviderProps>) {
    // create redux
    const infoAccount = useAppSelector((state) => state.user.userInfo);

    /** create params */
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearch = searchParams.get("qrCode");

    // create state
    const [search, setSearch] = useState<string>("");
    const [isShare, setIsShare] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChildrenLoading, setIsChildrenLoading] = useState<boolean>(false);
    const [isDataShowing, setIsDataShowing] = useState<ProductResponse.IDefaultControl | null>(null);
    const [childrenData, setChildrenData] = useState<AgriculturalProductCodeResponse.IData | null | undefined>(undefined);
    const [responsibleData, setReponsibleData] = useState<AgriculturalProductCodeResponse.IData | null | undefined>(undefined);

    // create useEffect to handle events
    useEffect(() => {
        if (urlSearch) {
            setSearch(urlSearch);
            handleSearchListener();
        }
    }, [urlSearch])

    useEffect(() => {
        if (responsibleData) {
            loadHiddenData();
        }
    }, [responsibleData])

    const loadHiddenData = useCallback(async (): Promise<ProductResponse.IDefaultControl | undefined> => {
        try {
            const response = await api.enterprise.product.listClient();
            if (response.status === "failure") {
                setIsDataShowing(null);
                console.log("cannot get hidden data");
                return;
            }

            const foundProduct = [...response.data].find((item: ProductResponse.IData) => {
                return item._id === responsibleData?.productId;
            })

            if (!foundProduct) {
                setIsDataShowing(null);
                return;
            }
            console.log("found product hidden: ", foundProduct);
            setIsDataShowing(foundProduct?.control.defaultControl);
        } catch (error) {
            console.log("load-hidden-data: ", error);
            return;
        }
    }, [responsibleData])

    const handleInputChange = (text: string) => {
        const newSearchValue = text;
        setSearch(newSearchValue);
        
        if (newSearchValue !== urlSearch) {
            // Clear the URL search params if the search state changes
            setSearchParams({});
        }
    };


    // Event handler ======================================================
    const handleSearchListener = async (): Promise<AgriculturalProductCodeResponse.IData | undefined> => {
        try {
            setIsLoading(true);

            Address.instance.reloadAddress().then(async () => {
                setIsLoading(true);
                const response = await Self.apiContext.find(urlSearch ? urlSearch : search);
            
                if (response.status == "failure") {
                    setReponsibleData(null);
                    setIsLoading(false);
                    messageAlert("error", "Không tìm thấy mã sản phẩm!");
                    return 
                }

                setReponsibleData(response.data);
                setChildrenData(undefined);
                setIsLoading(false);
                setSearchParams(`qrCode=${search}`);
            });
        } catch (error) {
            console.log("find-error: ", error);
            return;
        }
    }

    const handleResourceSearch = async (code: string): Promise<AgriculturalProductCodeResponse.IData | undefined> => {
        try {
            setIsChildrenLoading(true);

            Address.instance.reloadAddress().then(async () => {
                setIsChildrenLoading(true);
                const response = await Self.apiContext.find(code);
            
                if (response.status == "failure") {
                    setChildrenData(null);
                    setIsChildrenLoading(false);
                    messageAlert("error", "Không tìm thấy nguồn nguyên liệu!");
                    return 
                }

                setChildrenData(response.data);
                setIsChildrenLoading(false);
            });
        } catch (error) {
            console.log("find-error: ", error);
            setIsChildrenLoading(false);
            return;
        }
    }

    //hanlde share
    const handleShareListener = useCallback(() => {
        setIsShare(true);
    }, [isShare])


    return (
        <DataManagementContext.Provider
            value={{
                infoAccount,
                isDataShowing,
                responsibleData,
                isChildrenLoading,

                search,
                handleInputChange,
                isShare,
                setIsShare,
                isLoading,
                setIsLoading,
                childrenData,
                setChildrenData,

                handleShareListener,
                handleSearchListener,
                handleResourceSearch,
            }}
        >
            {props.children}
        </DataManagementContext.Provider>
    );
}