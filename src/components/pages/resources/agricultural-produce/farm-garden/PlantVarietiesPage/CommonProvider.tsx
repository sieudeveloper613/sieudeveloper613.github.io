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

export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData: any;
    lengthList?: number;
    suppliersDataSheet: ITableCell[];
    isSupplierFormDataEmpty: boolean;

    inputSupplierName: string;
    setInputSupplierName: React.Dispatch<React.SetStateAction<string>>;

    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    inputAgricultureProduceName: string;
    setInputAgricultureProduceName: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnAddSupplierClick: (e: ITextFieldButtonEventData) => any;
    handlerBtnRemoveSupplierClick: (_id: string) => any;
}>({} as any);

const CommonProvider = (props: React.PropsWithChildren<ICommonProviderProps>) => {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const supplierFormDataRef = React.useRef<Self.TSuppliersFormData>(null as any);
    const nameRef = React.useRef<string>('');
    const agricultureProduceNameRef = React.useRef<string>('');
    const supplierNamesAddedRef = React.useRef<Set<string>>(null as any);

    // State =========================================================

    const [resData, setResData] = React.useState<Self.TResponseData>();
    const [isSupplierFormDataEmpty, setIsSupplierFormDataEmpty] = React.useState<boolean>(true);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)

    const [supplierFormData, setSupplierFormData] = React.useState<Self.TSuppliersFormData>({
        created: [],
        deleted: [],
    });

    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);

    const [inputSupplierName, setInputSupplierName] = React.useState<string>('');
    const [inputName, setInputName] = React.useState<string>('');
    const [inputAgricultureProduceName, setInputAgricultureProduceName] = React.useState<string>('');

    // Update Ref
    supplierFormDataRef.current = supplierFormData;
    nameRef.current = inputName;
    agricultureProduceNameRef.current = inputAgricultureProduceName;

    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.plantVarieties.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại, bạn có muốn tải lại ?');
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

    const update = React.useCallback(
        async (_id: string, formDataValidated: Self.TUpdateFormData) => {
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

    const dataSheet: ITableCell[] = React.useMemo(() => {
        if (!resData) return [];
        return resData.map((item) => {
            return {
                _id: item._id,
                items: [item.name, item.agricultureProduceName],
            } as ITableCell;
        });
    }, [resData]);

    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    // const agricultureProduceNameAdded = React.useMemo(() => {
    //     return dataSheet.reduce((aggregate, item) => {
    //         aggregate.add(item.items[1].toLowerCase());
    //         return aggregate;
    //     }, new Set<string>());
    // }, [dataSheet]);

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

    const unfilteredSuppliersDataSheet = useAsyncMemo(
        [],
        async () => {
            if (!idUpdate) return Object.freeze([]);

            const res = await Self.contextApi.find(idUpdate);

            if (res.status === 'failure') {
                messageAlert('error', 'Tải dữ liệu từ máy chủ thất bại !');
                return Object.freeze([]);
            }

            setInputName(res.data.name);
            setInputAgricultureProduceName(res.data.agricultureProduceName || '');

            return Object.freeze(
                res.data.suppliers
                    .map((item) => {
                        return {
                            _id: item._id,
                            items: [item.name],
                        } as ITableCell;
                    })
                    .reverse(),
            );
        },
        [idUpdate],
    );

    const suppliersDataSheet: ITableCell[] = React.useMemo(() => {
        const result = unfilteredSuppliersDataSheet.filter((item) => {
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

        setIsSupplierFormDataEmpty(result.length === 0);
        return result;
    }, [supplierFormData, unfilteredSuppliersDataSheet]);

    const supplierNamesAdded = React.useMemo(() => {
        return suppliersDataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].trim().toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [suppliersDataSheet]);

    // update ref ================================

    supplierNamesAddedRef.current = supplierNamesAdded;

    // Event handler ===================================================

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
        setCheckValidAll(true);
        const createSuppliers = supplierFormDataRef.current.created.map((item) => {
            return {
                name: item.name.trim(),
            };
        });

        // CREATE ======================================================

        if (!idUpdate) {
            const name = nameRef.current.trim();
            const agricultureProduceName = agricultureProduceNameRef.current.trim();

            if (name.length === 0) {
                messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
                return;
            }

            if (nameAdded.has(name.toLowerCase())) {
                messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${name}" này rồi !`);
                return;
            }

            // if (agricultureProduceNameAdded.has(agricultureProduceName.toLowerCase())) {
            //     messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${name}" này rồi !`);
            //     return;
            // }

            await create({
                name,
                agricultureProduceName,
                createSuppliers,
            });
            setCheckValidAll(false);
            return;
        }

        // UPDATE ======================================================

        // not change
        if (createSuppliers.length === 0 && supplierFormDataRef.current.deleted.length === 0) {
            setDisplayForm(false);
            messageAlert('info', 'Không có sự thay đổi nào !');
            return;
        }
        setCheckValidAll(false);

        await update(idUpdate, {
            createSuppliers,
            removeSuppliers: supplierFormDataRef.current.deleted,
        });
    }, [idUpdate, nameAdded, create, update]);

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
        setInputAgricultureProduceName('');
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
                suppliersDataSheet,
                isSupplierFormDataEmpty,

                inputName,
                setInputName,

                inputAgricultureProduceName,
                setInputAgricultureProduceName,

                inputSupplierName,
                setInputSupplierName,

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
export default CommonProvider;
