import * as React from 'react';
import { Self } from '.';

import useMessageBox from '../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../redux/hooks';
import UserFormData from '../../../../sharetype/form-data/resources/master/UserFormData';
import { EParticipantsRole } from '../../../../sharetype/TPermission';
import IAddress from '../../../../sharetype/types/IAddress';
import Address from '../../../../utils/Address';
import messageAlert from '../../../../utils/messageAlert';
import preProcess from '../../../../utils/preProcess';
import Prettier from '../../../../utils/Prettier';
import Validate from '../../../../utils/Validate';
import { ITableCell } from '../../../common/DataTable';

export interface IParticipantsProviderProps {
    role: EParticipantsRole;
}
export const ParticipantsContext = React.createContext<{
    dataSheet: ITableCell[];
    displayForm: boolean;
    idUpdate: string | undefined;
    resData?: any;
    lengthList?: number
    checkValidAll: boolean;
    formData: Self.TFormData;
    setFormData: React.Dispatch<
        React.SetStateAction<
            Partial<
                Omit<UserFormData.IData, 'address'> & {
                    address: Partial<IAddress>;
                }
            >
        >
    >;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

export default function ParticipantsProvider(props: React.PropsWithChildren<IParticipantsProviderProps>) {
    // Hook declaration ===================================

    const messageBox = useMessageBox();

    // [END] Hook declaration ===================================

    // Ref =======================================================
    const disableAddressDependency = React.useRef<boolean>(false);
    // [END] Ref =================================================

    // State ================================================================
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [formData, setFormData] = React.useState<Self.TFormData>({});
    const [resData, setResData] = React.useState<Self.TResponseData>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false)
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    // [END] State ===========================================================

    // Function declaration =================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await Self.contextApi.list(props.role, numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure' || !res.data) {
            messageAlert('error', 'Lấy data thất bại');
            return undefined;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [props.role, numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: Self.TCreateFormData) => {
            const res = await Self.contextApi.create(formDataValidated, props.role);

            if (res.status === 'existed') {
                messageAlert('error', `${res.data}`);
                return;
            }
            if (res.status !== 'successfully') {
                messageAlert('error', 'Đăng ký thất bại');
                return;
            }

            loadData();
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
        },
        [loadData, props.role],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: Self.TUpdateFormData) => {
            const res = await Self.contextApi.update(_id, formDataValidated, props.role);

            if (res.status !== 'successfully') {
                messageAlert('error', 'Thất bại');
                return;
            }

            loadData();
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
        },
        [loadData, props.role],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.contextApi.remove(_id, props.role);

            if (res.status !== 'successfully') {
                messageAlert('error', 'Xóa thất bại');
                return;
            }

            messageAlert('success', 'Xóa thành công');
            loadData();
        },
        [loadData, props.role],
    );
    // [END] Function declaration =================================

    // Event handler ============================================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback(
        (_id: string) => {
            const updatingItem = resData?.find((item) => item._id === _id);
            if (!updatingItem) return;

            disableAddressDependency.current = true;

            setIdUpdate(_id);
            setFormData((prev) => ({
                ...prev,
                ...updatingItem,
                address: {
                    ...updatingItem.address,
                },
            }));
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
        },
        [resData],
    );

    const handlerBtnRemoveClick = React.useCallback(
        async (_id: string) => {
            messageBox({
                message: 'Bạn có chắc muốn xóa',
                buttons: [
                    {
                        label: 'Có',
                        onClick() {
                            remove(_id);
                        },
                    },
                    {
                        label: 'Đóng',
                    },
                ],
            });

            return;
        },
        [remove, messageBox],
    );

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true)
        // validatez
        if (!(await Validate.check(formData, Self.validateKernel))) {
            // <= Important!
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }

        const { name, address, email, phone } = formData as Self.TFormDataProcessed;

        const formDataValidated: Self.TFormDataProcessed = {
            name: name.trim(),
            phone: preProcess.removeAllSpace(phone),
            email: email.trim(),
            address: {
                city: address.city,
                district: address.district,
                ward: address.ward,
                addressLine: address.addressLine.trim(),
                lat: '',
                lng: '',
            },
        };

        // create
        if (!idUpdate) {
            create(formDataValidated);
            setCheckValidAll(false)
            return;
        }

        // update
        update(idUpdate, formDataValidated);
        setCheckValidAll(false)
        return;
    };

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false)
        setDisplayForm(false);
    }, []);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.name.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase())
                || item.phone.includes(searchInput.trim())
                || item.email.includes(searchInput.trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.name, //==
                            Address.instance.makeAddressName(item.address), //==
                            Prettier.phoneNumber(item.phone), //==
                            item.email, //==
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // [End] Event handler ============================================

    // Effect =========================================================

    // Load datasheet
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: [
                    //==
                    item.name,
                    Address.instance.makeAddressName(item.address),
                    Prettier.phoneNumber(item.phone),
                    item.email,
                ],
            } as ITableCell;
        }))
    }, [resData]);

    // Update options in district selection and ward selection when city changed
    React.useEffect(() => {
        if (disableAddressDependency.current) {
            return;
        }
        setFormData((preState) => {
            return {
                ...preState,
                address: {
                    ...preState.address,
                    district: undefined,
                    ward: undefined,
                },
            };
        });
    }, [formData.address?.city, disableAddressDependency]);

    // Update options in ward selection when district changed
    React.useEffect(() => {
        if (disableAddressDependency.current) {
            return;
        }
        setFormData((preState) => {
            return {
                ...preState,
                address: {
                    ...preState.address,
                    ward: undefined,
                },
            };
        });
    }, [formData.address?.district]);

    // Enable address dependency when fromData changed
    React.useEffect(() => {
        disableAddressDependency.current = false;
    }, [formData]);

    // Reset formData after close form
    React.useEffect(() => {
        if (displayForm) return;
        setFormData({});
        setIdUpdate(undefined);
    }, [displayForm]);

    // Load data when page did mount
    React.useEffect(() => {
        loadData();
    }, [loadData]);

    // [END] Effect ======================================================

    return (
        <ParticipantsContext.Provider
            value={{
                dataSheet,
                displayForm,
                idUpdate,
                resData,
                lengthList,
                formData,
                setFormData,
                checkValidAll,

                searchInput,
                setSearchInput,

                //
                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnCloseClick,
                handlerBtnSearchClick,
            }}
        >
            {props.children}
        </ParticipantsContext.Provider>
    );
}
