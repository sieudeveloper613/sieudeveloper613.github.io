import * as React from 'react';
//
import { Self } from './';
import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../../../redux/hooks';
import PartnerFormData from '../../../../../../sharetype/form-data/resources/PartnerFormData';
import PartnerResponse from '../../../../../../sharetype/response/resources/PartnerResponse';
import Address from '../../../../../../utils/Address';
import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import { IOption } from '../../../../../common/Selection';
import Prettier from '../../../../../../utils/Prettier';

export const TraceabilityPartnerContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number
    partnerGroupOptions: IOption[];
    partnerOptions: IOption[];
    idUpdate: string | undefined;

    userIdOfPartnerSelected: string | undefined;
    setUserIdOfPartnerSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    partnerGroupIdSelected: string | undefined;
    setPartnerGroupIdSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnClose: () => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

interface IPartnerProviderProps { }

export default function PartnerProvider(props: React.PropsWithChildren<IPartnerProviderProps>) {
    const messageBox = useMessageBox();

    const disableDependency = React.useRef<boolean>(false);

    const [resData, setResData] = React.useState<PartnerResponse.TList | undefined>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [userIdOfPartnerSelected, setUserIdOfPartnerSelected] = React.useState<string>();
    const [partnerGroupIdSelected, setPartnerGroupIdSelected] = React.useState<string>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);

    // Function definition ===============================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu thất bại !');
        }
        setLengthList(res.count)
        setResData(res.data)
    }, [numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: PartnerFormData.ICreate) => {
            const res = await Self.apiContext.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Tạo thất bại !');
            }

            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const update = React.useCallback(
        async (
            _id: string,
            formDataValidated: PartnerFormData.ICreate,
            // ============
        ) => {
            const res = await Self.apiContext.update(_id, formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Cập nhật thất bại !');
            }

            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.apiContext.remove(_id);

            if (res.status === 'failure') {
                messageAlert('error', 'Thất bại');
                return;
            }

            messageAlert('success', 'Thành công');
            loadData();
        },
        [loadData],
    );

    // Memo ==================================

    const userIdOfPartnerAdded = React.useMemo<Set<string>>(() => {
        if (!resData || resData.length === 0) return new Set();

        return resData.reduce((result, { data }) => {
            const _id = data?._id;
            if (!_id) return result;

            result.add(_id);

            return result;
        }, new Set<string>());
    }, [resData]);

    const partnerGroupOptions = useAsyncMemo(
        [],
        async () => {
            const res = await Self.apiContext.listPartnerGroupOptions();
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các nhóm đối tác từ máy chủ !');
                return [];
            }

            return res.data;
        },
        [],
    );

    const unfilteredPartnerOptions = useAsyncMemo(
        [],
        async () => {
            if (!partnerGroupIdSelected) return [];

            const res = await Self.apiContext.listUsersByPartnerGroupId(partnerGroupIdSelected);
            if (res.status === 'failure') {
                messageAlert('error', 'Không thể tải danh sách các đối tác ứng với nhóm đối tác được chọn !');
                return [];
            }

            return res.data.map((item) => {
                return {
                    label: item.name,
                    value: item._id,
                } as IOption;
            });
        },
        [partnerGroupIdSelected],
    );

    const partnerOptions = React.useMemo(() => {
        return unfilteredPartnerOptions.filter((item) => {
            return (
                //
                !userIdOfPartnerAdded.has(item.value) || item.value === userIdOfPartnerSelected
            );
        });
    }, [unfilteredPartnerOptions, userIdOfPartnerAdded, userIdOfPartnerSelected]);

    // Event handler ===============================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback(
        (_id: string) => {
            if (!resData) {
                messageAlert('error', 'Không có dữ liệu trả về để chỉnh sửa !');
                return;
            }

            const partner = resData.find((item) => item._id === _id);
            if (!partner) return; // <== never happen !

            disableDependency.current = true;
            setIdUpdate(_id);
            setPartnerGroupIdSelected(partner.data?._idPartnerOption);
            setUserIdOfPartnerSelected(partner.data?._id);
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
        },
        [resData],
    );

    const handlerBtnRemoveClick = React.useCallback(
        (_id: string) => {
            messageBox({
                message: 'Bạn có chắc muốn xóa không ?',
                buttons: [
                    {
                        label: 'Có',
                        onClick: () => {
                            remove(_id);
                        },
                    },
                    {
                        label: 'Đóng',
                    },
                ],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnSaveClick = () => {
        setCheckValidAll(true);
        if (!userIdOfPartnerSelected) {
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }

        // console.log(userIdOfPartnerAdded, userIdOfPartnerSelected);

        if (userIdOfPartnerAdded.has(userIdOfPartnerSelected)) {
            return messageAlert('warning', 'Bạn đã thêm đối tác này rồi !');
        }

        const formDataValidated: PartnerFormData.IData = {
            userId: userIdOfPartnerSelected,
        };

        // create
        if (!idUpdate) {
            create(formDataValidated);
            setCheckValidAll(false);
            return;
        }

        update(idUpdate, formDataValidated);
        setCheckValidAll(false);
    };

    const handlerBtnClose = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.data?.name.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase())
                || item.data?.phone.includes(searchInput.trim())
                || item.data?.email.includes(searchInput.trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item.data) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.data?.name, //==
                            Address.instance.makeAddressName(item.data.address), //==
                            Prettier.phoneNumber(item.data.phone), //==
                            item.data?.email, //==
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // Effect =======================================
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            if (item.data) {
                return {
                    _id: item._id,
                    items: [
                        //==
                        item.data?.name, //==
                        Address.instance.makeAddressName(item.data.address), //==
                        Prettier.phoneNumber(item.data.phone), //==
                        item.data.email, //==
                    ],
                } as ITableCell;
            }
            return {} as ITableCell;
        }))
    }, [resData]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    // Clear up formData when Form close
    React.useEffect(() => {
        if (displayForm) return;

        setPartnerGroupIdSelected(undefined);
        setUserIdOfPartnerSelected(undefined);
    }, [displayForm]);

    return (
        <TraceabilityPartnerContext.Provider
            value={{
                checkValidAll,
                displayForm,
                dataSheet,
                resData,
                lengthList,
                partnerGroupOptions,
                partnerOptions,
                idUpdate,

                partnerGroupIdSelected,
                setPartnerGroupIdSelected,

                userIdOfPartnerSelected,
                setUserIdOfPartnerSelected,

                searchInput,
                setSearchInput,

                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnClose,
                handlerBtnSearchClick,
            }}
        >
            {props.children}
        </TraceabilityPartnerContext.Provider>
    );
}
