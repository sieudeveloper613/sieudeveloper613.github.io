import * as React from 'react';
import { Self } from './'
import useMessageBox from '../../../../../../hooks/useMessageBox';
import ProductsNamesResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
import TPermission from '../../../../../../sharetype/TPermission';
import generate from '../../../../../../utils/generate';
import messageAlert from '../../../../../../utils/messageAlert';
import { useAppSelector } from '../../../../../../redux/hooks';
import { ITableCell } from '../../../../../common/DataTable';
import ProductsNamesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';
import localStorageClient from '../../../../../../core/localStorageClient';
import Address from '../../../../../../utils/Address';
import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import ProductsNamesPlanResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesPlanResponse';
export interface IAccessInfoManageProviderProps {
    permission: TPermission;
}

export interface dataInputForm {
    _id: string;
    info: string;
    content: string;
}

export const AccessInfoManageContext = React.createContext<{
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData: any;
    dataProduct:(string|undefined)[];
    lengthList?: number;
    itemsFormData:Self.TItemsFormData[];
    handleButtonCreateClick: () => void;
    handleButtonUpdateClick: (id: string) => void;
    handleButtonCloseClick: () => any;
    handleButtonRemoveClick: (_id: string) => any;
    
    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;

    displayCreateForm: boolean;
    setDisplayCreateForm: React.Dispatch<React.SetStateAction<boolean>>;

    isHiddenNameOrg: Boolean | undefined;
    isHiddenGardenCode: Boolean | undefined;
    isHiddenAddressOrg: Boolean | undefined;
    isHiddenPlantVarieties: Boolean | undefined;
    isHiddenFertilizers: Boolean | undefined;
    isHiddenHarvestDate: Boolean | undefined;
    isHiddenExportDate: Boolean | undefined;
    isHiddenTransportServiceName: Boolean | undefined;
    isHiddenVehicleName: Boolean | undefined;
    isHiddenDriverName: Boolean | undefined;
    isHidenProductName: Boolean | undefined;
    isHidenProductweight: Boolean | undefined;

    dataInput: string[][];
    setDataInput: React.Dispatch<React.SetStateAction<string[][]>>;
    handleButtonSaveClick: () => Promise<void>;
    handleButtonSaveCreateFormClick: () => Promise<void>;
    handleSetListDataForm: (name: string) => void;
}>({} as any);

const AccessInfoManageProvider = (props: React.PropsWithChildren<IAccessInfoManageProviderProps>) => {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const nameRef = React.useRef<string>('');

    // State =========================================================
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [displayCreateForm, setDisplayCreateForm] = React.useState<boolean>(false);
    const [resData, setResData] = React.useState<ProductsNamesResponse.IData[] | undefined>();
    const [dataProduct, setDataProduct] = React.useState<(string|undefined)[]>([]);
    const [itemsFormData, setItemsFormData] = React.useState<Self.TItemsFormData[]>([]);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [dataInput, setDataInput] = React.useState<string[][]>([]);

    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [inputName, setInputName] = React.useState<string>('');
    const [isHiddenNameOrg, setIsHiddenNameOrg] = React.useState<Boolean | undefined>()
    const [isHiddenGardenCode, setIsHiddenGardenCode] = React.useState<Boolean | undefined>()
    const [isHiddenAddressOrg, setIsHiddenAddressOrg] = React.useState<Boolean | undefined>()
    const [isHiddenPlantVarieties, setIsHiddenPlantVarieties] = React.useState<Boolean | undefined>()
    const [isHiddenFertilizers, setIsHiddenFertilizers] = React.useState<Boolean | undefined>()
    const [isHiddenHarvestDate, setIsHiddenHarvestDate] = React.useState<Boolean | undefined>()
    const [isHiddenExportDate, setIsHiddenExportDate] = React.useState<Boolean | undefined>()
    const [isHiddenTransportServiceName, setIsHiddenTransportServiceName] = React.useState<Boolean | undefined>()
    const [isHiddenVehicleName, setIsHiddenVehicleName] = React.useState<Boolean | undefined>()
    const [isHiddenDriverName, setIsHiddenDriverName] = React.useState<Boolean | undefined>()
    const [isHidenProductName, setIsHidenProductName] = React.useState<Boolean | undefined>()
    const [isHidenProductweight, setIsHidenProductweight] = React.useState<Boolean | undefined>()

    // Update Ref ====================================================
    nameRef.current = inputName

    // Function declaration ==================================
    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại. ');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);
    const getSupplier = React.useCallback(async (id:string) => {
        if(!id) return[];
        const res = await Self.apiContext_1.findByPid(id)
        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại. ');
            return []
        }
        if(res.data === null) return[];
        const resdata = res.data.productDetail?.map((item)=>{
            return item.supplierName
        })
        return resdata
    }, [idUpdate]);
    const loadFormData = React.useCallback(async (data:ProductsNamesResponse.IData | undefined,supplier?:string[]) => {
        if(!data) return;
        if (data?.typePackage === 'DON') {
                    const formData = data.productDetail?.map((item,index) => {
                        const supplierName = supplier? supplier[index] : ''
                        const quantity =item.typeNumber === 1 ? `${item.quantityNumber}%` : `${item.quantityNumber}g`
                        return {
                            typePackage:'DON',
                            name: item.materialName,
                            quantity: quantity,
                            supplierName
                        }
                    })
        
                    if (formData) {
                        setItemsFormData(formData)
                    }
                }
                else if (data?.typePackage === 'HOP') {
                    const formData = data?.productPackage1?.map(item => {
                        return {
                            typePackage:'HOP',
                            name: item.productName,
                            quantity: item.quantityNumber,
                        }
                    })
        
                    if (formData) {
                        setItemsFormData(formData)
                    }
                }
                else if (data?.typePackage === 'THUNG') {
                    const formData = data?.productPackage2?.map(item => {
                        return {
                            typePackage:'THUNG',
                            name: item.productName,
                            quantity: item.quantityNumber,
                        }
                    })
                    if (formData) {
                        setItemsFormData(formData)
                    }
                }
        
    }, [idUpdate,getSupplier]);

    const create = React.useCallback(
        async (formDataValidated: Self.TCreateFormData) => {
            const res = await Self.apiContext.create(formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            setDisplayCreateForm(false);
            messageAlert('success', 'Thành công !');
        },
        [loadData],
    );

    const update = React.useCallback(
        async (id: string, formData: ProductsNamesFormData.IUpdateExtend) => {
            const res = await Self.apiContext.update(id, formData);

            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !')
            }

            loadData();
            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
        },
        [loadData]
    )

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.apiContext.remove(_id);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            messageAlert('success', 'Thành công !');
        },
        [loadData],
    );

    // Memo =========================================
    const dataSheet: ITableCell[] = React.useMemo(() => {
        if (!resData) return [];
        return resData.map((item) => {
            return {
                _id: item._id,
                items: [item.name],
                disableRemove: item.plantVarietiesId ? true : false
            } as ITableCell;
        });
    }, [resData]);

    const productNamesAdded: Map<string, ProductsNamesResponse.IData> = React.useMemo(() => {
        if (!resData) return new Map();
        return resData.reduce((aggregate, item) => {
            aggregate.set(item.name.trim().toLowerCase(), item);
            return aggregate;
        }, new Map<string, ProductsNamesResponse.IData>());
    }, [resData]);

    const hiddenFieldsData = React.useMemo(() => {
        const data = {
            ishidenNameOrg: isHiddenNameOrg,
            ishidenGardenCode: isHiddenGardenCode,
            ishidenAddressOgr: isHiddenAddressOrg,
            ishidenPlantVarieties: isHiddenPlantVarieties,
            ishidenFertilizers: isHiddenFertilizers,
            ishidenharvestDate: isHiddenHarvestDate,
            ishidenExportDate: isHiddenExportDate,
            ishidentransportServiceName: isHiddenTransportServiceName,
            ishidenvehicleName: isHiddenVehicleName,
            ishidendriverName: isHiddenDriverName,
            ishidenProductweight: isHidenProductweight,
            ishidenProductName: isHidenProductName,
        }
        return data
    },
        [
            isHiddenNameOrg,
            isHiddenGardenCode,
            isHiddenAddressOrg,
            isHiddenPlantVarieties,
            isHiddenFertilizers,
            isHiddenHarvestDate,
            isHiddenExportDate,
            isHiddenTransportServiceName,
            isHiddenVehicleName,
            isHiddenDriverName,
            isHidenProductweight,
            isHidenProductName
        ])

    const findDataById = (id: string | undefined, arr: ProductsNamesResponse.IData[] | undefined) => {
        if (!id) return;
        if (!arr || arr.length === 0) return;
        return arr.find((e) => e._id === id);
    };
    const handleButtonUpdateClick = React.useCallback( async(id: string) => {
        setIdUpdate(id);
        const dataSupplier = await getSupplier(id)
        if (!resData) return;
        const dataUpdate = await findDataById(id, resData);
        console.log('dataUpdate',dataUpdate)

        loadFormData(dataUpdate,dataSupplier)
        const address = Address.instance.makeAddressName(localStorageClient.userInfo?.address)
        setDataProduct([
            localStorageClient.userInfo?.name, //Tên cơ sở chế biến
            address, //Địa chỉ
            dataUpdate?.name, //Tên sản phẩm
            dataUpdate?.code, //Mã sản phẩm
            '', //Đơn vị vận chuyển
            '', //Biển số xe
            '', //Tài xế
        ])
        setIsHiddenNameOrg(dataUpdate?.ishidenNameOrg)
        setIsHiddenGardenCode(dataUpdate?.ishidenGardenCode)
        setIsHiddenAddressOrg(dataUpdate?.ishidenAddressOgr)
        setIsHiddenPlantVarieties(dataUpdate?.ishidenPlantVarieties)
        setIsHiddenFertilizers(dataUpdate?.ishidenFertilizers)
        setIsHiddenHarvestDate(dataUpdate?.ishidenharvestDate)
        setIsHiddenExportDate(dataUpdate?.ishidenExportDate)
        setIsHiddenTransportServiceName(dataUpdate?.ishidentransportServiceName)
        setIsHiddenVehicleName(dataUpdate?.ishidenvehicleName)
        setIsHiddenDriverName(dataUpdate?.ishidendriverName)
        setIsHidenProductName(dataUpdate?.ishidenProductName)
        setIsHidenProductweight(dataUpdate?.ishidenProductweight)

        const initialDataInput = dataUpdate?.propertyNameExtend?.map((item) => {
            return [item._id, item.propertyName, item.value]
        })

        if (initialDataInput) {
            setDataInput(initialDataInput)
        }

        setDisplayForm(true);
    }, [loadData, resData, getSupplier]);

    const handleButtonSaveClick = async () => {
        const isEmptyString = dataInput.reduce((init, curr) => {
            if (curr.includes('')) {
                return (init = true);
            }
            return init;
        }, false);

        if (isEmptyString) {
            messageAlert('warning', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const dataUpdate = { ...findDataById(idUpdate, resData) }
        delete dataUpdate._id
        
        const userAddingFields = dataInput.map((item) => {
            return {
                propertyName: item[1],
                value: item[2]
            }
        })

        const formData = {
            ...dataUpdate,
            ...hiddenFieldsData,
            propertyNameExtend: userAddingFields
        }
        await update(String(idUpdate), formData)
        return;
    };

    const handleButtonCreateClick = () => {
        setDisplayCreateForm(true)
    }

    const handleButtonRemoveClick = React.useCallback(
        (_id: string) => {
            messageBox({
                message: 'Bạn có chắc muốn xóa ?',
                buttons: [
                    {
                        label: 'Xóa bỏ',
                        onClick() {
                            remove(_id);
                        },
                    },
                    { label: 'Đóng', onClick: () => { } },
                ],
            });
        },
        [messageBox, remove],
    );

    const handleButtonSaveCreateFormClick = React.useCallback(async () => {
        const name = nameRef.current.trim();
        setCheckValidAll(true);

        if (name.length === 0) {
            messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
            return;
        }

        if (productNamesAdded.has(name.toLowerCase())) {
            messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${name}" này rồi !`);
            return;
        }
        await create({
            name,
        });
        setCheckValidAll(false);
        return;
    }, [productNamesAdded, create]);

    const handleButtonCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayCreateForm(false);
    }, []);

    const handleSetListDataForm = (name: string) => {
        switch (name) {
            case 'Tên cơ sở chế biến':
                setIsHiddenNameOrg(!isHiddenNameOrg)
                break
            // case 'Mã sản phẩm':
            //     setIsHiddenGardenCode(!isHiddenGardenCode)
            //     break
            case 'Mã vạch sản phẩm':
                setIsHiddenGardenCode(!isHiddenGardenCode)
                break
            case 'Địa chỉ':
                setIsHiddenAddressOrg(!isHiddenAddressOrg)
                break
            case 'Tên sản phẩm':
                setIsHiddenPlantVarieties(!isHiddenPlantVarieties)
                break
            case 'Phân bón':
                setIsHiddenFertilizers(!isHiddenFertilizers)
                break
            case 'Ngày thu hoạch':
                setIsHiddenHarvestDate(!isHiddenHarvestDate)
                break
            case 'Ngày xuất hàng':
                setIsHiddenExportDate(!isHiddenExportDate)
                break
            case 'Đơn vị vận chuyển':
                setIsHiddenTransportServiceName(!isHiddenTransportServiceName)
                break
            case 'Biển số xe':
                setIsHiddenVehicleName(!isHiddenVehicleName)
                break
            case 'Tài xế':
                setIsHiddenDriverName(!isHiddenDriverName)
                break
            case 'Số lượng':
                setIsHidenProductweight(!isHidenProductweight)
                break
            case 'Tỷ trọng':
                setIsHidenProductweight(!isHidenProductweight)
                break
            case 'Sản phẩm':
                setIsHidenProductName(!isHidenProductName)
                break
            case 'Nguyên liệu':
                setIsHidenProductName(!isHidenProductName)
                break
            case 'Nhà cung cấp nguyên liệu':
                setIsHiddenFertilizers(!isHiddenFertilizers)
                break
        }

    }

    // Effect ========================================
    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        if (displayCreateForm) return;

        setInputName('');
    }, [displayCreateForm]);

    React.useEffect(() => {
        if (!displayForm){
            setIdUpdate(undefined);
        }
        
    }, [displayForm]);

    return (
        <AccessInfoManageContext.Provider
            value={{
                dataSheet,
                checkValidAll,
                resData,
                dataProduct,
                itemsFormData,
                lengthList,
                handleButtonCreateClick,
                handleButtonUpdateClick,
                handleButtonCloseClick,
                handleButtonSaveClick,
                handleButtonRemoveClick,
                handleButtonSaveCreateFormClick,
                handleSetListDataForm,

                inputName,
                setInputName,

                displayForm,
                setDisplayForm,

                displayCreateForm,
                setDisplayCreateForm,

                dataInput,
                setDataInput,

                isHiddenNameOrg,
                isHiddenGardenCode,
                isHiddenAddressOrg,
                isHiddenPlantVarieties,
                isHiddenFertilizers,
                isHiddenHarvestDate,
                isHiddenExportDate,
                isHiddenTransportServiceName,
                isHiddenVehicleName,
                isHiddenDriverName,
                isHidenProductName,
                isHidenProductweight
            }}
        >
            {props.children}
        </AccessInfoManageContext.Provider>
    );
};
export default AccessInfoManageProvider;
