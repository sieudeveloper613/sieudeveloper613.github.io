import * as React from 'react';
import { Self } from '.';

import useMessageBox from '../../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../../redux/hooks';
import DriverFormData from '../../../../../sharetype/form-data/resources/transportation/DriverFormData';
import DriverResponse from '../../../../../sharetype/response/resources/transportation/DriverResponse';
import make from '../../../../../utils/make';
import messageAlert from '../../../../../utils/messageAlert';
import preProcess from '../../../../../utils/preProcess';
import Prettier from '../../../../../utils/Prettier';
import Validate from '../../../../../utils/Validate';
import { ITableCell } from '../../../../common/DataTable';
import processKeyword from '../../../../../utils/preProcess/processKeyword';

export interface IDriverProviderProps { }

export const DriverContext = React.createContext<{
    dataSheet: ITableCell[];
    displayForm: boolean;
    idUpdate?: string;
    checkValidAll: boolean;
    formData: Self.TFormData;
    resData: any;
    lengthList?: number;
    setFormData: React.Dispatch<React.SetStateAction<Self.TFormData>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCloseClick: () => void;
    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (id: string) => void;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

export default function DriverProvider(props: React.PropsWithChildren<IDriverProviderProps>) {
    const messageBox = useMessageBox();

    // hook useState
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<Self.TFormData>({});
    const [resData, setResData] = React.useState<DriverResponse.IData[]>();
    const [idUpdate, setIdUpdate] = React.useState<string>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);

    // Function declaration ==================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await Self.contextApi.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            return messageAlert('error', 'Tải dữ liệu thất bại !');
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRowsRedux, numberOfRows]);

    const create = React.useCallback(
        async (formDataValidated: DriverFormData.ICreate) => {
            const res = await Self.contextApi.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Tạo thất bại !');
            }
            //
            loadData();
            messageAlert('success', 'Tạo thành công !');
            setDisplayForm(false);
        },
        [loadData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: DriverFormData.IUpdate) => {
            const res = await Self.contextApi.update(_id, formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Lưu chỉnh sửa thất bại !');
            }
            //
            loadData();
            messageAlert('success', 'Cập nhập thành công !');
            setDisplayForm(false);
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.contextApi.remove(_id);
            if (res.status === 'failure') {
                return messageAlert('error', 'Xóa thất bại');
            }
            //
            loadData();
            messageAlert('success', 'Xóa thành công !');
        },
        [loadData],
    );

    // Memo ===========================
    const phoneAdded = React.useMemo(() => {
        if (!resData) return new Set();

        const remainingData = make.result(() => {
            if (!idUpdate) return resData;

            return resData.filter((item) => item._id !== idUpdate);
        });

        return remainingData.reduce((aggregate, item) => {
            aggregate.add(preProcess.removeAllSpace(item.phone));
            return aggregate;
        }, new Set<string>());
    }, [resData, idUpdate]);

    //-----------------------------Event Handler-----------------------------

    const handlerBtnCreateClick = React.useCallback(() => {
        setDisplayForm(true);
        setIdUpdate(undefined);
    }, []);

    const handlerBtnUpdateClick = (id: string) => {
        if (!resData) return;

        const itemUpdating = resData.find((item) => item._id === id);
        if (!itemUpdating) {
            return messageAlert('error', 'Lỗi hệ thống !');
        }

        setIdUpdate(id);
        setFormData(itemUpdating);
        setDisplayForm(true);
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    };

    const handlerBtnRemoveClick = React.useCallback(
        async (_id: string) => {
            messageBox({
                message: 'Bạn chắc chắn muốn xóa tài xế này?',
                buttons: [{ label: 'Xóa', onClick: () => remove(_id) }, { label: 'Đóng' }],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true);
        if (!(await Validate.check(formData, Self.driverValidate))) {
            return messageAlert('warning', 'Bạn cần hoàn thiện các mục trước khi lưu !');
        }

        const phone = preProcess.removeAllSpace(formData.phone as string);

        if (phoneAdded.has(phone)) {
            messageAlert('warning', `Số điện thoại "${phone}" này đã tồn tại.`);
            return;
        }

        const formDataProcessed: DriverFormData.IData = {
            name: (formData.name as string).trim(),
            phone, // processed
        };

        // create
        if (!idUpdate) {
            setCheckValidAll(false);
            create(formDataProcessed);
            return;
        }

        // update
        setCheckValidAll(false);

        update(idUpdate, formDataProcessed);
    };

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return processKeyword(item.name).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
                || item.phone.includes(searchInput.trim())
        })
        
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                return {
                    _id: item._id,
                    items: [
                        item.name, //==
                        Prettier.phoneNumber(item.phone), //==
                    ],
                } as ITableCell;
            }))
        }
    }, [searchInput, resData])
    // Load datasheet
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: [
                    item.name, //==
                    Prettier.phoneNumber(item.phone), //==
                ],
            } as ITableCell;
        }))
    }, [resData]);

    React.useEffect(() => {
        if (displayForm) return;

        setFormData({});
        setIdUpdate(undefined);
    }, [displayForm]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <DriverContext.Provider
            value={{
                checkValidAll,
                dataSheet,
                displayForm,
                idUpdate,

                formData,
                resData,
                lengthList,
                setFormData,

                searchInput,
                setSearchInput,

                handlerBtnCloseClick,
                handlerBtnCreateClick,
                handlerBtnRemoveClick,
                handlerBtnUpdateClick,
                handlerBtnSaveClick,
                handlerBtnSearchClick,
            }}
        >
            {props.children}
        </DriverContext.Provider>
    );
}
