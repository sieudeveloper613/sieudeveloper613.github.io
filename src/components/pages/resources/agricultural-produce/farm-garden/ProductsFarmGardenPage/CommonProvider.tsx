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
import { IOption } from '../../../../../common/Selection';
import ProductResponse from '../../../../../../sharetype/response/resources/enterprise/ProductResponse';
import ProductFormData from '../../../../../../sharetype/form-data/resources/enterprise/ProductFormData';
import { IListType } from '../../../../../../sharetype/form-data/resources/enterprise/ProductFormData/ProductFormData';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';


export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData: any;
    lengthList?: number;
    formData: ProductResponse.IData[];
    suppliersDataSheet: ITableCell[];
    setFormData: React.Dispatch<React.SetStateAction<ProductResponse.IData[]>>;
    productOptions: IOption[];
    productSelected: string | undefined;
    setProductSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
    supppliesOptions: IOption[];
    suppliesSelected: string | undefined;
    setSuppliesSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    supplierFormData: Self.TSuppliersFormData;

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

    // State =========================================================
    const [formData, setFormData] = React.useState<ProductResponse.IData[]>([]);
    const [resData, setResData] = React.useState<ProductResponse.TList>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [suppliesSelected, setSuppliesSelected] = React.useState<string>();
    const [productSelected, setProductSelected] = React.useState<string>();
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [supplierFormData, setSupplierFormData] = React.useState<Self.TSuppliersFormData>({
        created: [],
        deleted: [],
    });
    // const [formData, setFormData] = React.useState<Self.TFormData>
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);

    // Update Ref
    supplierFormDataRef.current = supplierFormData;


    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.enterprise.product.list(numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: ProductFormData.ICreate) => {

            const res = await Self.contextApi.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            loadData();
            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
        },
        [loadData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: ProductFormData.IUpdate) => {

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

    const productOptions = useAsyncMemo(
        [],
        async () => {
            const res = await api.enterprise.enterpriseProducts.farmGarden.listAll();
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }
            return res.data.map((item: any) => {
                return {
                    label: item.productName,
                    value: item.productName,
                } as IOption;
            });
        },
        [],
    );
    const productData = useAsyncMemo(
        [],
        async () => {
            const res = await api.enterprise.enterpriseProducts.farmGarden.listAll();
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }

            return res
        },
        [],
    );
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
                    _id: item._id
                } as IOption;
            });
        },
        [idUpdate],
    );
    const supppliesData = useAsyncMemo(
        [],
        async () => {
            const res = await api.agriculturalProduce.farmGarden.typeSupplies.listAll();
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }
            return res.data
        },
        [],
    );

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
                function filterItem(array: any, name: string | undefined) {
                    const temp = array?.length > 0 ? array.filter((e: any) => e.name == name) : []
                    return temp?.length > 0 ? temp : {}
                }
                const res = filterItem(supppliesData, suppliesSelected)
                console.log(res[0]._id, 'xác');
                console.log(res, 'xác');
                setSupplierFormData((preState: any) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: res[0]._id,
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

                    if (_id) {
                        if (preState.created.length === 0) {
                            let res = suppliersDataSheet.filter((item) => item._id !== _id)
                            return newState;
                        } else {
                            newState.created = preState.created.filter((item: any) => item._id !== _id);
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
            setFormData(res)
            setProductSelected(res.productName)


            if (res?.listTypeSupplies?.length < 0) Object.freeze([]);

            return Object.freeze(
                res.listTypeSupplies.map((item: any) => {
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

        supplierFormData.created.forEach((item: any) => {
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
        setIdUpdate(_id);
        setDisplayForm(true);
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
        if (res?.listTypeSupplies?.length < 0) {
            Object.freeze([])
        } else {
            res.listTypeSupplies
                .forEach((item: any) => {
                    setSupplierFormData((preState: any) => {
                        return {
                            ...preState,
                            created: [
                                ...preState.created,
                                {
                                    _id: [Self.KEY, item.id].join('-'),
                                    name: item.name,
                                },
                            ],
                        };
                    });
                    res.listTypeSupplies = res.listTypeSupplies.splice(res.typeSupplies, 0)
                })
        };


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
                messageAlert('warning', 'Bạn đã thêm nhà cung cấp này rồi !');
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
            suppliersManager.remove(_id);
        },
        [suppliersManager],
    );

    const handlerBtnSaveClick = React.useCallback(async () => {
        let resultListTypeSupplies: IListType[] = []
        let resultProductId
        setCheckValidAll(true);
        if (productSelected) {
            function filterItem(array: any, productName: string) {
                const temp = array?.data.length > 0 ? array.data.filter((e: any) => e.productName == productName) : []
                return temp?.length > 0 ? temp[0] : {}
            }
            const res = filterItem(productData, productSelected)
            resultProductId = res._id
        }

        suppliersDataSheet.forEach((item) => {
            resultListTypeSupplies.push({
                id: item._id,
                name: item.items[0],
            });

        })

        // CREATE ======================================================

        if (!idUpdate) {

            if (productSelected === undefined) {
                messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
                return;
            }

            if (nameAdded.has(productSelected.toLowerCase())) {
                messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${productSelected}" này rồi !`);
                return;
            }
            // await create({
            //     productId: resultProductId,
            //     listTypeSupplies: resultListTypeSupplies
            // });

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

        // await update(idUpdate, {
        //     productId: resultProductId,
        //     listTypeSupplies: resultListTypeSupplies
        // });
        setCheckValidAll(false);
    }, [idUpdate, nameAdded, create, update, formData, suppliersDataSheet, productSelected, productOptions, productData]);

    const handlerBtnCloseClick = React.useCallback(() => {
        loadData();
        setCheckValidAll(false);
        // ALL ==============================================
        if (
            //==
            supplierFormDataRef.current.created.length !== 0 ||
            supplierFormDataRef.current.deleted.length !== 0
        ) {
            //==
            showFormCloseWarning(handlerBtnSaveClick);
            return;
        }

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

        const filterData = resData.filter((item: any) => {
            return processKeyword(item.productName).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
                || item.gtin.includes(searchInput.trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            item.productName,
                            item.gtin,
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
                    item.productName,
                    item.gtin,
                ],
            } as ITableCell;
        }));
    }, [resData]);

    React.useEffect(() => {
        loadData();
        suppliersManager.reset();
    }, [loadData]);

    React.useEffect(() => {
        if (displayForm) return;
        suppliersManager.reset();
        setIdUpdate(undefined);
        setProductSelected(undefined);
        setSuppliesSelected(undefined);
        setSupplierFormData({
            created: [],
            deleted: [],
        })

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
                productOptions,
                productSelected,
                setProductSelected,
                suppliersDataSheet,
                supplierFormData,
                searchInput,
                setSearchInput,
                formData,
                setFormData,

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
