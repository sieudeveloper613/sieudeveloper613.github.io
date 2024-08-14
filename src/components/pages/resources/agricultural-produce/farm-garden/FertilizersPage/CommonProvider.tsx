import * as React from 'react';
import api from '../../../../../../api';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../../../redux/hooks';
import generate from '../../../../../../utils/generate';
import { ITableCell } from '../../../../../common/DataTable';
import messageAlert from '../../../../../../utils/messageAlert';
import { Self } from '.';
import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import { ITextFieldButtonEventData } from '../../../../../common/TextField/types';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';

export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData?: any;
    lengthList?: number;
    isSupplierFormDataEmpty: boolean;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    inputSupplierName: string;
    setInputSupplierName: React.Dispatch<React.SetStateAction<string>>;

    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnSearchClick: () => void;
    handlerBtnAddSupplierClick: (e: ITextFieldButtonEventData) => any;
    handlerBtnRemoveSupplierClick: (_id: string) => any;
}>({} as any);

export default function CommonProvider (props: React.PropsWithChildren<ICommonProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const supplierFormDataRef = React.useRef<Self.TSuppliersFormData>(null as any);
    const nameRef = React.useRef<string>('');
    const supplierNamesAddedRef = React.useRef<Set<string>>(null as any);

    // State =========================================================

    const [resData, setResData] = React.useState<Self.TResponseData>();
    const [isSupplierFormDataEmpty, setIsSupplierFormDataEmpty] = React.useState<boolean>(true);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [supplierFormData, setSupplierFormData] = React.useState<Self.TSuppliersFormData>({
        created: [],
        deleted: [],
    });

    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);

    const [inputSupplierName, setInputSupplierName] = React.useState<string>('');
    const [inputName, setInputName] = React.useState<string>('');

    // Update Ref
    supplierFormDataRef.current = supplierFormData;
    nameRef.current = inputName;

    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.process.list(numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: Self.TCreateFormData) => {
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

    // const update = React.useCallback(
    //     async (_id: string, formDataValidated: Self.TUpdateFormData) => {
    //         const res = await Self.contextApi.update(_id, formDataValidated);
    //         if (res.status === 'failure') {
    //             return messageAlert('error', 'Thất bại !');
    //         }

    //         loadData();
    //         setDisplayForm(false);
    //         messageAlert('success', 'Thành công !');
    //     },
    //     [loadData],
    // );

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

    React.useEffect(() => {
        if (!resData) return setDataSheet([]);

        //Vị trí kết xuất table
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            
                return {
                    _id: item._id,
                    items: [item.name],
                } as ITableCell;
            }));
    }, [resData]);
    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const suppliersManager = React.useMemo(() => {
        return Object.freeze({
            add(name: string) {
                setSupplierFormData((preState) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: [Self.KEY, generate.id()].join('-'),
                                name,
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
                        newState.created = preState.created.filter((item) => item._id !== _id);
                        return newState;
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
    }, []);

    // const unfilteredSuppliersDataSheet = useAsyncMemo(
    //     [],
    //     async () => {
    //         if (!idUpdate) return Object.freeze([]);

    //         const res = await Self.contextApi.find(idUpdate);

    //         if (res.status === 'failure') {
    //             messageAlert('error', 'Tải dữ liệu từ máy chủ thất bại !');
    //             return Object.freeze([]);
    //         }

    //         setInputName(res.data.name);

    //         return Object.freeze(
    //             res.data.suppliers
    //                 .map((item) => {
    //                     return {
    //                         _id: item._id,
    //                         items: [item.name],
    //                     } as ITableCell;
    //                 })
    //                 .reverse(),
    //         );
    //     },
    //     [idUpdate],
    // );

    // const suppliersDataSheet: ITableCell[] = React.useMemo(() => {
    //     const result = unfilteredSuppliersDataSheet.filter((item) => {
    //         return !supplierFormData.deleted.includes(item._id);
    //     });

    //     result.reverse();

    //     supplierFormData.created.forEach((item) => {
    //         result.push({
    //             _id: item._id,
    //             items: [item.name],
    //         });
    //     });

    //     result.reverse();

    //     setIsSupplierFormDataEmpty(result.length === 0);
    //     return result;
    // }, [supplierFormData, unfilteredSuppliersDataSheet]);

    // const supplierNamesAdded = React.useMemo(() => {
    //     return suppliersDataSheet.reduce((aggregate, item) => {
    //         aggregate.add(item.items[0].trim().toLowerCase());
    //         return aggregate;
    //     }, new Set<string>());
    // }, [suppliersDataSheet]);

    // update ref ================================

    // supplierNamesAddedRef.current = supplierNamesAdded;

    // Event handler ===================================================

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return processKeyword(item.name).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
        });
        
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.name
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback((_id: string) => {
        setIdUpdate(_id);
        setDisplayForm(true);
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    }, []);

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

            if (supplierNamesAddedRef.current.has(valueTrim.toLowerCase())) {
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
        const createSuppliers = supplierFormDataRef.current.created.map((item) => {
            return {
                name: item.name.trim(),
            };
        });
        setCheckValidAll(true);

        // CREATE ======================================================

        if (!idUpdate) {
            const name = nameRef.current.trim();

            if (name.length === 0) {
                messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
                return;
            }

            if (nameAdded.has(name.toLowerCase())) {
                messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${name}" này rồi !`);
                return;
            }

            await create({
                name,
                createSuppliers,
            });

            return;
        }

        // UPDATE ======================================================

        // not change
        // if (createSuppliers.length === 0 && supplierFormDataRef.current.deleted.length === 0) {
        //     setDisplayForm(false);
        //     messageAlert('info', 'Không có sự thay đổi nào !');
        //     return;
        // }

        // await update(idUpdate, {
        //     createSuppliers,
        //     removeSuppliers: supplierFormDataRef.current.deleted,
        // });
        // setCheckValidAll(false);
    }, [idUpdate, nameAdded, create, {/* update */} ]);

    const handlerBtnCloseClick = React.useCallback(() => {
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

    // ==============================

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        if (displayForm) return;

        suppliersManager.reset();
        setIdUpdate(undefined);
        setInputName('');
        setInputSupplierName('');
    }, [displayForm, suppliersManager]);

    return (
        <CommonContext.Provider
            value={{
                checkValidAll,
                idUpdate,
                displayForm,
                dataSheet,
                resData,
                lengthList,
                // suppliersDataSheet,
                isSupplierFormDataEmpty,

                searchInput,
                setSearchInput,

                inputName,
                setInputName,

                inputSupplierName,
                setInputSupplierName,

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
