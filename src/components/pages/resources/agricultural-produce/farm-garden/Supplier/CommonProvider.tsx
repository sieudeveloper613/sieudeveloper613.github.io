import * as React from 'react';
import api from '../../../../../../api';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../../../redux/hooks';
import generate from '../../../../../../utils/generate';
import { ITableCell } from '../../../../../common/DataTable';
import messageAlert from '../../../../../../utils/messageAlert';
import { Self, } from '.';
import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import { ITextFieldButtonEventData } from '../../../../../common/TextField/types';
import Address from '../../../../../../utils/Address';
import IAddress from '../../../../../../sharetype/types/IAddress';
import SupplierFormData from '../../../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierFormData';
import generateId from '../../../../../../utils/generate/generateId';
import { IOption } from '../../../../../common/Selection';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';


export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData: any;
    lengthList?: number;
    formData: Self.TFormData;
    suppliersDataSheet: ITableCell[];
    setFormData: React.Dispatch<
        React.SetStateAction<
            Partial<
                Omit<SupplierFormData.IData, 'address'> & {
                    address: Partial<IAddress>;
                }
            >
        >
    >;
    supppliesOptions: IOption[];
    suppliesSelected: string | undefined;
    setSuppliesSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    supplierFormData: Self.TSuppliersFormData;
    inputSupplierName: string;
    setInputSupplierName: React.Dispatch<React.SetStateAction<string>>;

    inputTaxCode: string;
    setInputTaxCode: React.Dispatch<React.SetStateAction<string>>;

    inputGLN: string;
    setInputGLN: React.Dispatch<React.SetStateAction<string>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnAddSupplierClick: (e: ITextFieldButtonEventData) => any;
    handlerBtnRemoveSupplierClick: (_id: string) => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

export default function CommonProvider(props: React.PropsWithChildren<ICommonProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const supplierFormDataRef = React.useRef<Self.TSuppliersFormData>(null as any);
    const nameRef = React.useRef<string>('');
    const unitRef = React.useRef<string>('');
    const supplierNamesAddedRef = React.useRef<Set<string>>(null as any);

    // State =========================================================
    const [formData, setFormData] = React.useState<Self.TFormData>({});
    const [resData, setResData] = React.useState<Self.TList>();
    // const [resDataTypeSupplies, setResDataTypeSupplies] = React.useState<Self.TList>();
    const [isSupplierFormDataEmpty, setIsSupplierFormDataEmpty] = React.useState<boolean>(true);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [suppliesSelected, setSuppliesSelected] = React.useState<string>();
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [supplierFormData, setSupplierFormData] = React.useState<Self.TSuppliersFormData>({
        created: [],
        deleted: [],
    });
    // const [formData, setFormData] = React.useState<Self.TFormData>
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);

    const [inputSupplierName, setInputSupplierName] = React.useState<string>('');
    const [inputGLN, setInputGLN] = React.useState<string>('');
    const [inputTaxCode, setInputTaxCode] = React.useState<string>('');

    // Update Ref
    supplierFormDataRef.current = supplierFormData;
    nameRef.current = inputTaxCode;
    unitRef.current = inputSupplierName
    const disableAddressDependency = React.useRef<boolean>(false);


    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.supplier.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);
    // const loadTypeSupplies = React.useCallback(async () => {
    //     const res = await api.agriculturalProduce.farmGarden.typeSupplies.list(1, 1000);
    //     if (res.status === 'failure') {
    //         messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
    //         return;
    //     }
    //     setResDataTypeSupplies(res.data)
    // }, []);

    const create = React.useCallback(
        async (formDataValidated: any) => {
           
            const res = await Self.contextApi.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
        },
        [loadData, formData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: any) => {

            const res = await Self.contextApi.update(_id, formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.contextApi.remove(_id);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            messageAlert('success', 'Thành công !');
        },
        [loadData],
    );

    const showFormCloseWarning = React.useCallback(
        (saveCallback: () => any) => {
            messageBox({
                message: 'Thay đổi chưa được lưu !',
                icon: 'warning',
                iconColor: 'rgb(255,200,0)',
                buttons: [
                    {
                        label: 'Vẫn đóng',
                        onClick() {
                            setDisplayForm(false);
                        },
                    },
                    {
                        label: 'Lưu',
                        onClick() {
                            saveCallback();
                        },
                    },
                    {
                        label: 'Tiếp tục chỉnh sửa',
                        onClick() {
                            //==
                        },
                    },
                ],
            });
        },
        [messageBox],
    );

    // Memo =========================================

    // const listTypeSupplier: ITableCell[] = React.useCallback(async () => {

    //     const res = await api.agriculturalProduce.farmGarden.typeSupplies.list(1, 1000);
    //     console.log("res.data", res.data);

    //     if (res.status === 'failure') {
    //         messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
    //         return;
    //     }
    //         if (!res.data) return [];

    //         return res.data.map((item) => {
    //             return {
    //                 _id: item._id,
    //                 items: [
    //                     item.name,
    //                 ],
    //             } as ITableCell;
    //         });

    // }, []);
    // console.log(listTypeSupplier);
    // console.log(dataSheet);
    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const suppliersManager = React.useMemo(() => {

        return Object.freeze({

            add(name: any) {
                setSupplierFormData((preState) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: [Self.KEY, generate.id()].join('-'),
                                name: suppliesSelected,
                            },
                        ],
                    };
                });
            },

            remove(_id: string) {
                setSupplierFormData((preState) => {
                    const newState = {
                        ...preState,
                    };

                    if (_id.startsWith(Self.KEY)) {
                        if (preState.created.length === 0) {
                            let res = suppliersDataSheet.filter((item) => item._id !== _id)
                            return newState;
                        } else {
                            newState.created = preState.created.filter((item) => item._id !== _id);
                            return newState;
                        }
                    }
                    newState.deleted = [
                        //==
                        ...preState.deleted,
                        _id,
                    ];

                    return newState;
                });
            },

            reset() {
                setSupplierFormData({
                    created: [],
                    deleted: [],
                });
            },
        });
    }, [suppliesSelected]);

    const unfilteredSuppliersDataSheet = useAsyncMemo(
        [],
        () => {
            if (!idUpdate) return Object.freeze([]);


            function filterItem(array: any, _id: string) {
                const temp = array?.length > 0 ? array.filter((e: any) => e._id == _id) : []
                return temp?.length > 0 ? temp[0] : {}
            }
            const res = filterItem(resData, idUpdate)
            setInputTaxCode(res.taxCode)
            setInputSupplierName(res.name);
            setInputGLN(res.gln)
            setFormData(res)

            setSuppliesSelected(undefined);


            if (res?.typeSupplies?.length < 0) Object.freeze([]);

            return Object.freeze(
                res.typeSupplies.map((item: any) => {
                    return {
                        _id: item._id,
                        items: [item.items],
                    } as ITableCell;
                })
                    .reverse(),
            );
        },
        [idUpdate],
    );
    const suppliersDataSheet: ITableCell[] = React.useMemo(() => {
        const result = unfilteredSuppliersDataSheet.filter((item: any) => {
            return !supplierFormData.deleted.includes(item._id);
        });

        result.reverse();


        supplierFormData.created.forEach((item) => {
            result.push({
                _id: item._id,
                items: [item.name],
            });
        });
        result.reverse();


        return result;
    }, [supplierFormData, unfilteredSuppliersDataSheet]);

    const supplierNamesAdded = React.useMemo(() => {
        if (!suppliersDataSheet) return new Set<string>();

        return suppliersDataSheet.reduce((aggregate, item) => {
            if (item.items && item.items[0]) {
                const name = item.items[0];
                if (typeof name === 'string') {
                    aggregate.add(name.trim().toLowerCase());
                } else {
                    console.warn("Expected string but found:", typeof name);
                }
            } else {
                console.warn("item.items or item.items[0] is undefined");
            }
            return aggregate;
        }, new Set<string>());
    }, [suppliersDataSheet]);


    const supppliesOptions = useAsyncMemo(
        [],
        async () => {
            const res = await api.agriculturalProduce.farmGarden.typeSupplies.listAll();

            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }
            return res.data.map((item) => {
                return {
                    label: item.name,
                    value: item.name,
                } as IOption;
            });
        },
        [idUpdate],
    );



    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback((_id: string) => {
        function filterItem(array: any, _id: string) {
            const temp = array?.length > 0 ? array.filter((e: any) => e._id == _id) : []
            return temp?.length > 0 ? temp[0] : {}
        }
        const res = filterItem(resData, _id)

        if (res?.typeSupplies?.length < 0) {
            Object.freeze([])
        } else {
            res.typeSupplies.forEach((item: any) => {
                setSupplierFormData((preState) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: [Self.KEY, generate.id()].join('-'),
                                name: item.items[0],
                            },
                        ],
                    };
                });
                console.log(res.typeSupplies);
                res.typeSupplies = res.typeSupplies.splice(res.typeSupplies, 0)
                console.log(res.typeSupplies);

            })
        };


        setIdUpdate(_id);
        setDisplayForm(true);
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    }, [resData]);

    const handlerBtnRemoveClick = React.useCallback(
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

    const handlerBtnAddSupplierClick = React.useCallback(
        (e: ITextFieldButtonEventData) => {
            const valueTrim = e.value.trim();

            if (valueTrim.length === 0) {
                messageAlert('warning', 'Bạn không thể thêm nhà cung cấp với tên là rỗng !');
                e.focus();
                return;
            }

            if (supplierNamesAdded.has(valueTrim.toLowerCase())) {
                messageAlert('warning', 'Bạn đã thêm loại vật tư này rồi !');
                e.focus();
                return;
            }

            suppliersManager.add(valueTrim);
            e.value = '';
            e.focus();
        },
        [suppliersManager],
    );
    const handlerBtnRemoveSupplierClick = React.useCallback(
        (_id: string) => {
            console.log(suppliersManager);
            suppliersManager.remove(_id);
        },
        [suppliersManager],
    );

    const handlerBtnSaveClick = React.useCallback(async () => {
        setCheckValidAll(true);

        // CREATE ======================================================

        if (!idUpdate) {
            if (inputSupplierName.length === 0 || inputGLN.length === 0 || inputTaxCode.length === 0 ) {
                messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
                return;
            }
           
            if(!formData.address?.city || !formData.address?.district || !formData.address?.ward || !formData.address?.addressLine){
                return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
            }

            if (nameAdded.has(inputSupplierName.toLowerCase())) {
                messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${inputSupplierName}" này rồi !`);
                return;
            }
            await create({
                name: inputSupplierName,
                taxCode: inputTaxCode,
                gln: inputGLN,
                address: formData.address,
                typeSupplies: suppliersDataSheet
            });

            return;
        }

        // UPDATE ======================================================

        // not change
        // function filterItem (array:any,_id:string) {
        //     const temp = array?.length>0 ? array.filter((e:any)=>e._id ==_id) :[]
        //     return temp?.length>0 ? temp[1] : {}
        //     }
        // const res = filterItem(resData,idUpdate)
        // setInputName(res.name)
        // setInputSupplierName(res.unit);

        await update(idUpdate, {
            name: formData.name,
            taxCode: formData.taxCode,
            gln: inputGLN,
            address: formData.address,
            typeSupplies: suppliersDataSheet
        });
        setCheckValidAll(false);
    }, [idUpdate, nameAdded, create, update, formData, inputSupplierName, inputGLN, suppliersDataSheet]);

    const handlerBtnCloseClick = React.useCallback(() => {
        loadData();
        setCheckValidAll(false);
        // ALL ==============================================
        // if (
        //     //==
        //     supplierFormDataRef.current.created.length !== 0 ||
        //     supplierFormDataRef.current.deleted.length !== 0
        // ) {
        //     //==
        //     showFormCloseWarning(handlerBtnSaveClick);
        //     return;
        // }

        if (
            //==
            idUpdate || // is update
            nameRef.current.trim().length === 0 // input name is empty
        ) {
            setDisplayForm(false);
            return;
        }
        showFormCloseWarning(handlerBtnSaveClick);
    }, [idUpdate, showFormCloseWarning, handlerBtnSaveClick]);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);

        const filterData = resData.filter(item => {
            return processKeyword(item.taxCode).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
                || processKeyword(item.name).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
        });

        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            item.name,
                            item.hasOwnProperty("address") ? Address.instance.makeAddressName(item.address) : "",
                            item.taxCode,
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // ==============================

    React.useEffect(() => {
        if (!resData) return setDataSheet([]);

        //Vị trí kết xuất table
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: [
                    item.name,
                    item.hasOwnProperty("address") ? Address.instance.makeAddressName(item.address) : "",
                    item.taxCode,
                ],
            } as ITableCell;
        }));
    }, [resData]);

    React.useEffect(() => {
        loadData();
        suppliersManager.reset();
        setIdUpdate(undefined);
        setInputTaxCode('');
        setInputSupplierName('');
        setInputGLN('');
        setSupplierFormData({
            created: [],
            deleted: [],
        })
        setFormData(() => {
            return {
                address: {
                    city: undefined,
                    addressLine: undefined,
                    ward: undefined,
                    lat: undefined,
                    lng: undefined,
                },
            };
        });
    }, [loadData]);

    React.useEffect(() => {
        if (displayForm) return;
        suppliersManager.reset();
        setIdUpdate(undefined);
        setInputTaxCode('');
        setInputSupplierName('');
        setInputGLN('');
        setSupplierFormData({
            created: [],
            deleted: [],
        })
        setFormData(() => {
            return {
                address: {
                    city: undefined,
                    addressLine: undefined,
                    lat: undefined,
                    lng: undefined,
                },
            };
        });
    }, [displayForm, suppliersManager]);

    return (
        <CommonContext.Provider
            value={{

                idUpdate,
                displayForm,
                dataSheet,
                checkValidAll,
                resData,
                supppliesOptions,
                suppliesSelected,
                setSuppliesSelected,
                suppliersDataSheet,
                supplierFormData,
                inputSupplierName,
                setInputSupplierName,
                formData,
                setFormData,
                inputTaxCode,
                setInputTaxCode,
                inputGLN,
                setInputGLN,
                searchInput,
                setSearchInput,

                handlerBtnSearchClick,
                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnAddSupplierClick,
                handlerBtnCloseClick,
                handlerBtnRemoveSupplierClick,
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};
