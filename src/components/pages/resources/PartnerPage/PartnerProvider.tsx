import * as React from 'react';
//
import { Self } from '.';
import useAsyncMemo from '../../../../hooks/useAsyncMemo';
import useMessageBox from '../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../redux/hooks';
import PartnerFormData from '../../../../sharetype/form-data/resources/PartnerFormData';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';
import Address from '../../../../utils/Address';
import make from '../../../../utils/make';
import messageAlert from '../../../../utils/messageAlert';
import { ITableCell } from '../../../common/DataTable';
import { IOption } from '../../../common/Selection';
import Prettier from '../../../../utils/Prettier';
import { ETypeUser } from '../../../../sharetype/TPermission';
import { EnterpriseRole } from '../../../../sharetype/TPermission';

export const PartnerContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number
    enterpriseOptions: IOption[];
    modelOptions: IOption[];
    objectTypeOptions: IOption[];
    objectNameOptions: IOption[];
    idUpdate: string | undefined;

    enterpriseSelected: string | undefined;
    setEnterpriseSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    modelSelected: string | undefined;
    setModelSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    objectTypeSelected: string | undefined;
    setObjectTypeSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    objectNameSelected: string | undefined;
    setObjectNameSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

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
    const [enterpriseSelected, setEnterpriseSelected] = React.useState<string>();
    const [modelSelected, setModelSelected] = React.useState<string>();
    const [objectTypeSelected, setObjectTypeSelected] = React.useState<string>();
    const [objectNameSelected, setObjectNameSelected] = React.useState<any>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);

    // Options
    const DataModel = [
        {
            name: 'Nông sản',
            _id: ETypeUser.agriculturalProduce
        },
        // {
        //     name: 'Tiêu dùng',
        //     _id: ETypeUser.customerProducts
        // },
        // {
        //     name: 'Thuỷ sản',
        //     _id: ETypeUser.fisheries
        // },
        {
            name: 'Đối tượng tham gia khác',
            _id: ETypeUser.other
        },
    ]
    const DataTypeForOther = [
        {
            name: 'Nhà phân phối',
            _id: EnterpriseRole.distributionCenter
        },
        {
            name: 'Cửa hàng bán lẻ',
            _id: EnterpriseRole.dealerStore
        },
        {
            name: 'Siêu thị',
            _id: EnterpriseRole.supermarket
        },
        {
            name: 'Nhà hàng',
            _id: EnterpriseRole.restaurant
        },

    ]
    const DataTypeForAgriculturalProduce = [
        {
            name: 'Cơ sở chế biến',
            _id: EnterpriseRole.processingFacility
        },
        {
            name: 'Trang trại',
            _id: EnterpriseRole.farmOrGarden
        },

    ]

    function returnRole(item: any) {
        switch (item) {
            case 'farm_garden':
                return 'Trang trại';
            case 'processing-facility':
                return 'Cơ sở chế biến';
            case 'enterprise':
                return 'Doanh nghiệp';
            case 'distribution-center':
                return 'Nhà phân phối';
            case 'dealerStore':
                return 'Cửa hàng bán lẻ';
            case 'supermarket':
                return 'Siêu thị';
            case 'restaurant':
                return 'Nhà hàng';
            default:
                return '';
        }

    }



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
            console.log('Log data', formDataValidated);
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
                return messageAlert('error', 'Tạo thất bại !');
            }

            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            if (_id == "") return messageAlert('error', 'Không thể xoá đối tượng này');
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

    // const IdObjectAdded = React.useMemo<Set<string>>(() => {
    //     if (!resData || resData.length === 0) return new Set();

    //     return resData.reduce((result, { data }) => {
    //         const _id = data?._id;
    //         if (!_id) return result;

    //         result.add(_id);

    //         return result;
    //     }, new Set<string>());
    // }, [resData]);

    const enterpriseOptions = useAsyncMemo(
        [],
        async () => {
            const res = await Self.apiContext.listEnterprise();

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
        [],
    );
    const modelOptions = useAsyncMemo(
        [],
        async () => {
            if (!enterpriseSelected) return [];
            return DataModel.map((item) => {
                return {
                    label: item.name,
                    value: item._id,
                } as IOption;
            });
        },
        [enterpriseSelected],
    );
    const objectTypeOptions = useAsyncMemo(
        [],
        async () => {
            if (!modelSelected) return [];
            switch (modelSelected) {
                case 'agricultural-produce':
                    return DataTypeForAgriculturalProduce.map((item) => {
                        return {
                            label: item.name,
                            value: item._id,
                        } as IOption;
                    });
                default:
                    return DataTypeForOther.map((item) => {
                        return {
                            label: item.name,
                            value: item._id,
                        } as IOption;
                    });

            }
        },
        [modelSelected],
    );

    const objectNameOptions = useAsyncMemo(
        [],
        async () => {
            if (!objectTypeSelected) return [];
            if (enterpriseSelected != undefined){
                const res = await Self.apiContext.listPartnerById(enterpriseSelected, modelSelected, objectTypeSelected)

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
            }
            return []

        },          
        [enterpriseSelected, modelSelected, objectTypeSelected,],
    );

    
    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnRemoveClick = React.useCallback(
        (_id: string) => {
            if (_id == "") return messageAlert("warning", "Bạn không thể xoá đối tượng này")
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
            setEnterpriseSelected(partner.data?._idPartnerOption);
            // setUserIdOfPartnerSelected(partner.data?._id); Mẫu cũ
            setModelSelected(partner.data?._id);
            setObjectTypeSelected(partner.data?._id);
            setObjectNameSelected(partner.data?._id);
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
        },
        [resData],
    );

    const handlerBtnSaveClick = () => {
        setCheckValidAll(true);
        if (!enterpriseSelected) {
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }

        // if (IdObjectAdded.has(objectNameSelected)) {
        //     return messageAlert('warning', 'Bạn đã thêm đối tác này rồi !');
        // }

        const formDataValidated: PartnerFormData.IData = {
            userId: objectNameSelected,

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
            return item.data?.ownerName.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase())
                || item.data?.name.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase())
            // || item.data?.email.includes(searchInput.trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item.data) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.data.ownerName,
                            returnRole(item.data.role),
                            item.data.name,
                            Address.instance.makeAddressName(item.data.address),
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // Effect =======================================

    // Load datasheet
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);

        const itemsDeleted = make.array({ stop: 4 }, () => '<Mục này đã bị xóa>');
        //Vị trí kết xuất table
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: item.data ? [
                    // item.data.name,
                    // Address.instance.makeAddressName(item.data.address),
                    // Prettier.phoneNumber(item.data.phone),
                    // item.data.email,

                    item.data.ownerName,
                    returnRole(item.data.role),
                    item.data.name,
                    Address.instance.makeAddressName(item.data.address),

                ] : itemsDeleted
            };
        }));
    }, [resData]);
    // Load data when page did mount
    React.useEffect(() => {
        loadData();
    }, [loadData]);

    // Unselected userIdOfPartner when partnerGroupIdSelected changed
    // React.useEffect(() => {
    //     if (disableDependency.current) {
    //         disableDependency.current = false;
    //         return;
    //     }
    //     setUserIdOfPartnerSelected(undefined);
    // }, [partnerGroupIdSelected]);
    React.useEffect(() => {
        if (disableDependency.current) {
            disableDependency.current = false;
            return;
        }
        setModelSelected(undefined);
        setObjectTypeSelected(undefined);
        setObjectNameSelected(undefined);
    }, [enterpriseSelected]);

    React.useEffect(() => {
        if (disableDependency.current) {
            disableDependency.current = false;
            return;
        }
        setObjectTypeSelected(undefined);
        setObjectNameSelected(undefined);
    }, [modelSelected]);

    React.useEffect(() => {
        if (disableDependency.current) {
            disableDependency.current = false;
            return;
        }
        setObjectNameSelected(undefined);
    }, [objectTypeSelected]);

    // Clear up formData when Form close
    // React.useEffect(() => {
    //     if (displayForm) return;

    //     setPartnerGroupIdSelected(undefined);
    //     setUserIdOfPartnerSelected(undefined);
    // }, [displayForm]);

    React.useEffect(() => {
        if (displayForm) return;

        setEnterpriseSelected(undefined);
        setModelSelected(undefined);
        setObjectTypeSelected(undefined);
        setObjectNameSelected(undefined);
    }, [displayForm]);

    return (
        <PartnerContext.Provider
            value={{
                checkValidAll,
                displayForm,

                dataSheet,
                resData,
                lengthList,
                enterpriseOptions,
                modelOptions,
                objectTypeOptions,
                objectNameOptions,
                idUpdate,

                enterpriseSelected,
                setEnterpriseSelected,

                modelSelected,
                setModelSelected,

                objectTypeSelected,
                setObjectTypeSelected,

                objectNameSelected,
                setObjectNameSelected,

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
        </PartnerContext.Provider>
    );
}
