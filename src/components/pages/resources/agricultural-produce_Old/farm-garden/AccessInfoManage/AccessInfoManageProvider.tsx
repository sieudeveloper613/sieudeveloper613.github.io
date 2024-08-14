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
    lengthList?: number;
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

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

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

    dataInput: string[][];
    setDataInput: React.Dispatch<React.SetStateAction<string[][]>>;
    handleButtonSaveClick: () => Promise<void>;
    handleButtonSaveCreateFormClick: () => Promise<void>;
    handleSetListDataForm: (name: string) => void;
    handlerBtnSearchClick: () => void;
}>({} as any);

const AccessInfoManageProvider = (props: React.PropsWithChildren<IAccessInfoManageProviderProps>) => {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const nameRef = React.useRef<string>('');

    // State =========================================================
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [displayCreateForm, setDisplayCreateForm] = React.useState<boolean>(false);
    const [resData, setResData] = React.useState<ProductsNamesResponse.IData[] | undefined>();
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [dataInput, setDataInput] = React.useState<string[][]>([]);
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);

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
            isHiddenDriverName
        ])

    const findDataById = (id: string | undefined, arr: ProductsNamesResponse.IData[] | undefined) => {
        if (!id) return;
        if (!arr || arr.length === 0) return;
        return arr.find((e) => e._id === id);
    };

    const handleButtonUpdateClick = React.useCallback(async (id: string) => {
        setIdUpdate(id);
        setDisplayForm(true);
        const dataUpdate = findDataById(id, resData);
        if (!resData) return;

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

        const initialDataInput = dataUpdate?.propertyNameExtend?.map((item) => {
            return [item._id, item.propertyName, item.value]
        })

        if (initialDataInput) {
            setDataInput(initialDataInput)
        }


    }, [loadData, resData]);

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
            case 'Trang trại':
                setIsHiddenNameOrg(!isHiddenNameOrg)
                break
            case 'Mã khu vườn':
                setIsHiddenGardenCode(!isHiddenGardenCode)
                break
            case 'Địa chỉ':
                setIsHiddenAddressOrg(!isHiddenAddressOrg)
                break
            case 'Loại giống':
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
            case 'Biển số':
                setIsHiddenVehicleName(!isHiddenVehicleName)
                break
            case 'Tài xế':
                setIsHiddenDriverName(!isHiddenDriverName)
        }

    }

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.name.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                return {
                    _id: item._id,
                    items: [item.name],
                    disableRemove: item.plantVarietiesId ? true : false
                } as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // Effect ========================================
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: [item.name],
                disableRemove: item.plantVarietiesId ? true : false
            } as ITableCell;
        }));
    }, [resData]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        if (displayCreateForm) return;

        setInputName('');
    }, [displayCreateForm]);

    React.useEffect(() => {
        if (displayForm) return;
        setIdUpdate(undefined);
    }, [displayForm]);

    return (
        <AccessInfoManageContext.Provider
            value={{
                dataSheet,
                checkValidAll,
                resData,
                lengthList,
                handleButtonCreateClick,
                handleButtonUpdateClick,
                handleButtonCloseClick,
                handleButtonSaveClick,
                handleButtonRemoveClick,
                handleButtonSaveCreateFormClick,
                handleSetListDataForm,
                handlerBtnSearchClick,

                inputName,
                setInputName,

                displayForm,
                setDisplayForm,

                displayCreateForm,
                setDisplayCreateForm,

                dataInput,
                setDataInput,

                searchInput,
                setSearchInput,

                isHiddenNameOrg,
                isHiddenGardenCode,
                isHiddenAddressOrg,
                isHiddenPlantVarieties,
                isHiddenFertilizers,
                isHiddenHarvestDate,
                isHiddenExportDate,
                isHiddenTransportServiceName,
                isHiddenVehicleName,
                isHiddenDriverName
            }}
        >
            {props.children}
        </AccessInfoManageContext.Provider>
    );
};
export default AccessInfoManageProvider;
