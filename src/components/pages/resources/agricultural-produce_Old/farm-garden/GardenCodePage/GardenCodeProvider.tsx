import * as React from 'react';

import { gardenCodeApi, gardenCodeValidate } from '.';
import api from '../../../../../../api';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppSelector } from '../../../../../../redux/hooks';
import GardenCodeFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';
import GardenCodeResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenCodeResponse';
import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import { TFormData } from '.';
import Validate from '../../../../../../utils/Validate';

export interface IGardenCodeProviderProps { }

export const GardenCodeContext = React.createContext<{
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    displayForm: boolean;
    idUpdate: string | undefined;

    qrcodeDisplay: string | undefined;
    setQRCodeDisplay: React.Dispatch<React.SetStateAction<string | undefined>>;

    formData: TFormData;
    resData?: any;
    lengthList?: number;
    setFormData: React.Dispatch<React.SetStateAction<TFormData>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnViewClick: (id: string) => any;
    handlerBtnSaveClick: () => void;
    handlerBtnCloseClick: () => any;
    handlerBtnResetClick: (id: string) => any;
}>({} as any);

export default function GardenCodeProvider(props: React.PropsWithChildren<IGardenCodeProviderProps>) {
    const messageBox = useMessageBox();

    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [qrcodeDisplay, setQRCodeDisplay] = React.useState<string>();
    const [idUpdate, setIdUpdate] = React.useState<string>();

    const [resData, setResData] = React.useState<GardenCodeResponse.IData[]>();
    const [formData, setFormData] = React.useState<TFormData>({});
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)

    // Function declaration ========================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await api.agriculturalProduce.farmGarden.gardenCode.list(numberOfRowsRedux, numberOfRows);

        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu từ máy chủ thất bại !');
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: GardenCodeFormData.ICreate) => {
            const res = await gardenCodeApi.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
            loadData();
        },
        [loadData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: GardenCodeFormData.ICreate) => {
            const res = await gardenCodeApi.update(_id, formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            setDisplayForm(false);
            messageAlert('success', 'Thành công !');
            loadData();
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await gardenCodeApi.remove(_id);

            if (res.status === 'failure') {
                return messageAlert('error', 'Thất bại !');
            }

            messageAlert('success', 'Thành công !');
            loadData();
        },
        [loadData],
    );

    const reset = React.useCallback(
        async (_id: string) => {
            const res = await gardenCodeApi.reset(_id);

            if (res.status === 'failure') {
                if (res.data === 'khuvuonchuacapnhatthongtin') {
                    messageBox({
                        message: 'Reset dữ liệu thất bại! // Khu vườn chưa cập nhật thông tin, bạn không được phép tạo vòng đời mới',
                        messageColor: 'red',
                        buttons: [
                            {
                                label: 'OK',
                                onClick() {
                                    setQRCodeDisplay(undefined)
                                }
                            },
                        ],
                    });
                }
                if (res.data === 'chuathuhoach') {
                    messageBox({
                        message: 'Reset dữ liệu thất bại! // Khu vườn chưa thu hoạch, bạn không được phép tạo vòng đời mới',
                        messageColor: 'red',
                        buttons: [
                            {
                                label: 'OK',
                                onClick() {
                                    setQRCodeDisplay(undefined)
                                }
                            },
                        ],
                    });
                }
                return
            }

            messageBox({
                message: 'Reset dữ liệu thành công!',
                messageColor: 'green',
                buttons: [
                    {
                        label: 'OK',
                        onClick() {
                            setQRCodeDisplay(undefined)
                        }
                    },
                ],
            });
            loadData();
        },
        [loadData]
    );

    // Memo ==========================================================

    const dataSheet: ITableCell[] = React.useMemo(() => {
        if (!resData) return [];

        return resData.map((item, i) => {
            return {
                _id: item._id,
                items: [item.code],
            } as ITableCell;
        });
    }, [resData]);

    const gardenCodeAdded: Map<string, GardenCodeResponse.IData> = React.useMemo(() => {
        if (!resData) return new Map();
        return resData.reduce((aggregate, item) => {
            aggregate.set(item.code.trim().toLowerCase(), item);
            return aggregate;
        }, new Map<string, GardenCodeResponse.IData>());
    }, [resData]);

    // Event handler =================================================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback(
        (_id: string) => {
            if (!resData) {
                return messageAlert('warning', 'Bạn không thể sửa khi chưa lấy được dữ liệu !');
            }

            const result = resData.find((x) => x._id === _id);
            if (!result) {
                return messageAlert(
                    'error',
                    'Hệ thống bị lỗi, bạn nên thông báo cho quản trị viên về trường hợp này !',
                );
            }

            setIdUpdate(_id);
            setFormData({
                //= avoid format by prettier
                code: result.code,
            });
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
                message: 'Bạn có chắc muốn xóa ?',
                buttons: [
                    {
                        label: 'Xóa',
                        onClick() {
                            remove(_id);
                        },
                    },
                    { label: 'Đóng' },
                ],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnViewClick = React.useCallback((_id: string) => {
        setQRCodeDisplay(_id);
    }, []);

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true);
        if (!(await Validate.check(formData, gardenCodeValidate))) {
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }

        const code = String(formData.code).trim();
        const idGardenCodeAdded = gardenCodeAdded.get(code.toLowerCase());

        const formDataValidated = {
            code, //==
        } as GardenCodeFormData.IData;

        // create ===================
        if (!idUpdate) {
            setCheckValidAll(false);
            if (idGardenCodeAdded) {
                return messageAlert('warning', 'Bạn đã thêm mục này rồi !');
            }
            return create(formDataValidated);
        }

        // update ===============

        if (idGardenCodeAdded) {
            if (idGardenCodeAdded._id !== idUpdate) {
                return messageAlert('error', 'Mục này đã được thêm !');
            }

            // Not change
            if (idGardenCodeAdded.code === formData.code) {
                messageAlert('info', 'Không có thay đổi nào được thực hiện !');
                setDisplayForm(false);
                return;
            }
        }
        setCheckValidAll(false);

        return update(idUpdate, formDataValidated);
    };

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnResetClick = React.useCallback(
        (_id: string) => {
            messageBox({
                message: 'Dữ liệu sau khi reset sẽ bị mất hết. Bạn có muốn thực hiện thao tác này không?',
                buttons: [
                    {
                        label: 'Đồng ý',
                        onClick() {
                            reset(_id)
                        }
                    },
                    {
                        label: 'Không',
                        onClick() {
                            setQRCodeDisplay(undefined)
                        }
                    },
                ],
            });
        }, [messageBox, reset]);

    // Effect ======================

    React.useEffect(() => {
        if (displayForm) return;

        setIdUpdate(undefined);
        setFormData({});
    }, [displayForm]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <GardenCodeContext.Provider
            value={{
                dataSheet,
                resData,
                lengthList,
                displayForm,
                idUpdate,
                checkValidAll,

                qrcodeDisplay,
                setQRCodeDisplay,

                formData,
                setFormData,

                handlerBtnCreateClick,
                handlerBtnSaveClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnCloseClick,
                handlerBtnViewClick,
                handlerBtnResetClick
            }}
        >
            {props.children}
        </GardenCodeContext.Provider>
    );
}
