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
import { IOption } from '../../../../../common/Selection';
import { IProcess } from '../../../../../../sharetype/form-data/resources/enterprise/processing-facility/IngredientFormData/IngredientFormData';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';

export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData?: any;
    lengthList?: number;
    suppliersDataSheet: ITableCell[];
    isSupplierFormDataEmpty: boolean;

    processOptions: IOption[];
    processSelected: string | undefined;
    setProcessSelected: React.Dispatch<React.SetStateAction<string>>;

    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnSearchClick: () => void;
    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnAddSupplierClick: (e: ITextFieldButtonEventData) => any;
    handlerBtnRemoveSupplierClick: (_id: string) => any;
}>({} as any);

export default function CommonProvider (props: React.PropsWithChildren<ICommonProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const processFormDataRef = React.useRef<Self.TSuppliersFormData>(null as any);
    const nameRef = React.useRef<string>('');
    const processNamesAddedRef = React.useRef<Set<string>>(null as any);

    // State =========================================================

    const [resData, setResData] = React.useState<Self.TResponseData>();
    const [isSupplierFormDataEmpty, setIsSupplierFormDataEmpty] = React.useState<boolean>(true);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [processFormData, setProcessFormData] = React.useState<Self.TSuppliersFormData>({
        created: [],
        deleted: [],
    });

    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [processSelected, setProcessSelected] = React.useState<string>('');
    const [inputSupplierName, setInputSupplierName] = React.useState<string>('');
    const [inputName, setInputName] = React.useState<string>('');

    // Update Ref
    processFormDataRef.current = processFormData;
    nameRef.current = inputName;

    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.ingredient.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);

    const processData = useAsyncMemo(
        [],
        async () => {
            const res = await api.agriculturalProduce.farmGarden.process.list(1, 1000);
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }
            return res.data
        },
        [],
    );

    const processOptions = useAsyncMemo(
        [],
        async () => {
            const res = await api.agriculturalProduce.farmGarden.process.list(1, 1000);
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
                return [];
            }
            return res.data.map((item: any) => {
                return {
                    label: item.name,
                    value: item.name,
                } as IOption;
            });
        },
        [],
    );

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

    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const resultProcessSelected = React.useMemo(() => {
        function filterItem(array: any, name: string | undefined) {
            const temp = array?.length > 0 ? array.filter((e: any) => e.name == name) : []
            return temp?.length > 0 ? temp[0] : {}
        }
        const res = filterItem(processData, processSelected)
        return {
            id: res._id,
            name: res.name
        }
    }, [processSelected, processData])

    const processManager = React.useMemo(() => {
        return Object.freeze({
            add(name: string) {
                setProcessFormData((preState: any) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: resultProcessSelected.id,
                                name: resultProcessSelected.name,
                            },
                        ],
                    };
                });
            },

            remove(_id: string) {
                setProcessFormData((preState) => {
                    const newState = {
                        ...preState,
                    };

                    if (_id) {
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
                setProcessFormData({
                    created: [],
                    deleted: [],
                });
            },
        });
    }, [resultProcessSelected]);


    const unfilteredSuppliersDataSheet = useAsyncMemo(
        [],
        async () => {
            if (!idUpdate) return Object.freeze([]);
            function filterItem (array:any,id:string|undefined) {
                const temp = array?.length>0 ? array.filter((e:any)=>e._id == id) :[]
                return temp?.length>0 ? temp[0] : {}
                }
            const res = filterItem (resData,idUpdate)
            
            // setInputName(res.data.name);

            return Object.freeze(
                res.data
                    .map((item : any) => {
                        return {
                            _id: item._id,
                            items: item.name,
                        } as ITableCell;
                    })
                    .reverse(),
            );
        },
        [idUpdate],
    );

    const suppliersDataSheet: ITableCell[] = React.useMemo(() => {
        const result = unfilteredSuppliersDataSheet.filter((item: any) => {
            return !processFormData.deleted.includes(item._id);
        });

        result.reverse();

        processFormData.created.forEach((item) => {
            result.push({
                _id: item._id,
                items: [item.name],
            });
        });

        result.reverse();

        setIsSupplierFormDataEmpty(result.length === 0);
        return result;
    }, [processFormData, unfilteredSuppliersDataSheet]);

    const processNamesAdded = React.useMemo(() => {
        return suppliersDataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].trim().toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [suppliersDataSheet]);

    // update ref ================================


    // Event handler ===================================================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);

        const filterData = resData.filter(item => {
            return processKeyword(item.name).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
        })
        
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

    const handlerBtnUpdateClick = React.useCallback(async (_id: string) => {
        setIdUpdate(_id);
        const res = await api.agriculturalProduce.farmGarden.ingredient.detail(_id)
        if (res.status === 'failure') {
            messageAlert('error', 'Không thể tải danh sách các Doanh nghiệp từ máy chủ !');
            return [];
        }
        if (res?.data?.process.length < 0) {
            Object.freeze([])
        } else {
            res.data.process.forEach((item:any) => {
                setProcessFormData((preState) => {
                    return {
                        ...preState,
                        created: [
                            ...preState.created,
                            {
                                _id: item.processId,
                                name: item.name,
                            },
                        ],
                    };
                });
            })
        };
       
        setDisplayForm(true);
        setInputName(res.data?.name)
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
                messageAlert('warning', 'Bạn không thể thêm quy trình với tên là rỗng !');
                e.focus();
                return;
            }
            if (processNamesAdded.has(valueTrim.toLowerCase())) {
                messageAlert('warning', 'Bạn đã thêm quy trình này rồi !');
                e.focus();
                return;
            }

            processManager.add(valueTrim);
            e.value = '';
            e.focus();
        },
        [processManager,processNamesAdded],
    );

    const handlerBtnRemoveSupplierClick = React.useCallback(
        (_id: string) => {
            processManager.remove(_id);
        },
        [processManager],
    );

    const handlerBtnSaveClick = React.useCallback(async () => {

        let resultListIdIngredient: IProcess[] = []
        setCheckValidAll(true);
        suppliersDataSheet.forEach((item) => {
            resultListIdIngredient.push({
                processId: item._id,
                name: item.items[0]
            });
        })

        // CREATE ======================================================

        if (!idUpdate) {
            const name = nameRef.current.trim();
            const processName = processSelected?.trim();

            if (name.length === 0) {
                messageAlert('warning', 'Bạn cần hoàn thiện một số mục trước khi lưu !');
                return;
            }

            if (nameAdded.has(name.toLowerCase())) {
                messageAlert('warning', `Bạn bạn đã thêm ${Self.title.toLowerCase()} có tên là "${name}" này rồi !`);
                return;
            }
            

            await create({
                name: inputName,
                process: resultListIdIngredient,
            });

            return;
        }

        // UPDATE ======================================================
        // not change
        if (resultListIdIngredient.length === 0 && processFormDataRef.current.deleted.length === 0) {
            setDisplayForm(false);
            messageAlert('info', 'Không có sự thay đổi nào !');
            return;
        }

        await update(idUpdate, {
            name :inputName,
            process: resultListIdIngredient,
        });
        setCheckValidAll(false);
    }, [idUpdate, nameAdded, processNamesAdded, create, update, suppliersDataSheet, inputName]);

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        // ALL ==============================================
        if (
            //==
            processFormDataRef.current.created.length !== 0 ||
            processFormDataRef.current.deleted.length !== 0
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

    React.useEffect(() => {
        if (displayForm) return;

        processManager.reset();
        setIdUpdate(undefined);
        setInputName('');
        setProcessSelected('')
    }, [displayForm, processManager]);

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

                searchInput,
                setSearchInput,
                inputName,
                setInputName,
                processOptions,
                processSelected,
                setProcessSelected,

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
