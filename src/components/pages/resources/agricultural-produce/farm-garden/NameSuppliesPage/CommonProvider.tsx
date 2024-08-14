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
import NameSuppliesFormData from '../../../../../../sharetype/form-data/resources/enterprise/farm-garden/NameSuppliesFormData';
import NameSuppliesResponse from '../../../../../../sharetype/response/resources/enterprise/farm-garden/NameSuppliesResponse';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';

export interface ICommonProviderProps { }

export const CommonContext = React.createContext<{
    idUpdate: string | undefined;
    displayForm: boolean;
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    resData?: any;
    lengthList?: number;
    supppliesOptions: IOption[];
    suppliesSelected: string | undefined;
    setSuppliesSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

export default function CommonProvider (props: React.PropsWithChildren<ICommonProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const nameRef = React.useRef<string>('');

    // State =========================================================

    const [resData, setResData] = React.useState<NameSuppliesResponse.IData[]>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [suppliesSelected, setSuppliesSelected] = React.useState<string>();
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);

    const [inputName, setInputName] = React.useState<string>('');

    // Update Ref
    nameRef.current = inputName;

    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.nameSupplies.list(numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure') {
            messageAlert('error', 'Lấy dữ liệu từ server thất bại.');
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);

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
                    value: item._id,
                } as IOption;
            });
        },
        [idUpdate],
    );

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


    // update ref ================================


    // Event handler ===================================================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback((_id: string) => {
        setIdUpdate(_id);
        setDisplayForm(true);
        function filterItem(array: any, _id: string) {
            const temp = array?.length > 0 ? array.filter((e: any) => e._id == _id) : []
            return temp?.length > 0 ? temp[0] : {}
        }
        const res = filterItem(resData, _id)

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


    const handlerBtnSaveClick = React.useCallback(async () => {
        setCheckValidAll(true);

        // CREATE ======================================================
        console.log(suppliesSelected);
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
                typeSupplies: suppliesSelected,
            });

            return;
        }

        // UPDATE ======================================================

        setCheckValidAll(false);
    }, [idUpdate, nameAdded, create, suppliesSelected]);

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        // ALL ==============================================

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
            return processKeyword(item.nameSupplies).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
                || processKeyword(item.name).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            item.name,
                            item.nameSupplies
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
                    item.nameSupplies
                ],
            } as ITableCell;
        }));
    }, [resData]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        if (displayForm) return;

        setIdUpdate(undefined);
        setInputName('');
        setSuppliesSelected(undefined)
    }, [displayForm]);

    return (
        <CommonContext.Provider
            value={{
                checkValidAll,
                idUpdate,
                displayForm,
                dataSheet,
                resData,
                lengthList,
                supppliesOptions,
                suppliesSelected,
                setSuppliesSelected,
                inputName,
                setInputName,
                searchInput,
                setSearchInput,

                handlerBtnSearchClick,
                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnCloseClick,
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};
