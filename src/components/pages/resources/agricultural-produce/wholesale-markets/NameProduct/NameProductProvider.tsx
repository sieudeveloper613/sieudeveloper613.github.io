import React, { useEffect, useState, useRef } from 'react';
import { Self } from '.';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import ProductsNamesResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
import make from '../../../../../../utils/make';
import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import preProcess from '../../../../../../utils/preProcess';
import { IData } from '../../../../../../sharetype/form-data/resources/PartnerFormData/PartnerFormData';

export interface INameProductProviderProps { }

export interface IChangeDataForm {
    name: (value: string) => void;
}

export const NameProductContext = React.createContext<{
    //
    resData: any;
    dataSheet: ITableCell[];

    isDisplayForm: boolean;
    setIsDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;

    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;

    inputPerUnit: string;
    setInputPerUnit: React.Dispatch<React.SetStateAction<string>>;

    inputPerKg: string;
    setInputPerKg: React.Dispatch<React.SetStateAction<string>>;

    unitChecked: boolean;
    setUnitChecked: React.Dispatch<React.SetStateAction<boolean>>;

    idUpdate: string | undefined;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handleSaveButtonClick: () => Promise<void>;
    handlerButtonRemoveClick: (_id: string) => void;
    updateDataButtonClick: (_id: string) => void;
    handlerButtonSearchClick: () => void;
}>({} as any);

export interface IDataForm {
    name: string;
}

const NameProductProvider = (props: React.PropsWithChildren<INameProductProviderProps>) => {
    // --- Declare ---
    const messageBox = useMessageBox();

    const [dataSheet, setDataSheet] = useState<ITableCell[]>([]);
    const [resData, setResData] = useState<ProductsNamesResponse.IData[]>([]);
    const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>('');
    const [inputPerUnit, setInputPerUnit] = useState<string>('')
    const [inputPerKg, setInputPerKg] = useState<string>('')
    const [unitChecked, setUnitChecked] = useState<boolean>(false)
    const [idUpdate, setIdUpdate] = useState<string | undefined>();
    const [searchInput, setSearchInput] = useState<string>('')

    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list();

        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu từ máy chủ thất bại !');
        }

        setResData(res.data);
    }, []);

    // const nameAdded = React.useMemo(() => {
    //     if (!resData) return new Set();

    //     const remainingData = make.result(() => {
    //         if (!idUpdate) return resData;

    //         return resData.filter((item) => item._id !== idUpdate);
    //     });

    //     return remainingData.reduce((aggregate, item) => {
    //         aggregate.add(preProcess.removeAllSpace(item.name));
    //         return aggregate;
    //     }, new Set<string>());
    // }, [resData, idUpdate]);

    const handleSaveButtonClick = async () => {
        if (inputName.trim() === '') {
            messageAlert('warning', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const name = preProcess.removeAllSpace(inputName as string);
        const perUnit = preProcess.removeAllSpace(inputPerUnit as string);
        const perKg = preProcess.removeAllSpace(inputPerKg as string);
        // if (nameAdded.has(name)) {
        //     messageAlert('warning', `Tên sản phẩm "${inputName}" này đã tồn tại.`);
        //     return;
        // }
        if (idUpdate) {
            await Self.update(idUpdate, { name: inputName, price: unitChecked ? Number(perUnit) : Number(perKg), typePrice: unitChecked });
        } else {
            await Self.create({ name: inputName });
        }

        loadData();
        setIsDisplayForm(false);
    };

    const handlerButtonRemoveClick = (_id: string) => {
        const remove = async () => {
            const res = await Self.apiContext.remove(_id);

            if (res.statusCode === 404) {
                messageAlert(
                    'error',
                    '_id cần xóa không tồn tại hoặc không phải objectId hoặc đã xóa rồi hoặc không phải là người tạo',
                );
                return;
            }
            if (res.status === 'failure') {
                messageAlert('error', res.message || 'xóa thất bại.');
            }
            messageAlert('success', 'Xóa thành công.');

            loadData();
        };

        messageBox({
            message: 'Bạn xác nhận xóa ?.',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        remove();
                    },
                },
                { label: 'Đóng', onClick: () => { } },
            ],
        });
    };

    const updateDataButtonClick = React.useCallback(((_id: string) => {
        setIdUpdate(_id);
        const objectUpdate = resData.find((item) => item._id === _id);
        if (!objectUpdate) {
            messageAlert('error', 'Không tìm thấy bản đối tượng cần chỉnh sửa.');
            return;
        }
        setInputName(objectUpdate.name);
        if (objectUpdate.typePrice === true) {
            setInputPerUnit(String(objectUpdate.price))
            setInputPerKg('')
        }
        else if (objectUpdate.typePrice === false) {
            setInputPerKg(String(objectUpdate.price))
            setInputPerUnit('')
        }
        else {
            setInputPerKg('')
            setInputPerUnit('')
        }

        setIsDisplayForm(true);
    }), [resData]);

    const handlerButtonSearchClick = React.useCallback(() => {
        const filterData = resData.filter(item => item.name.includes(searchInput.trim()))
        setDataSheet(filterData.map((item, i) => {
            if (item.typePrice === true) {
                return { _id: item._id, items: [i + 1, item.name, null, item.price] } as ITableCell
            }
            else if (item.typePrice === false) {
                return { _id: item._id, items: [i + 1, item.name, item.price, null] } as ITableCell
            }
            return { _id: item._id, items: [i + 1, item.name, null, null] } as ITableCell
        }))
    }, [searchInput, resData])

    useEffect(() => {
        setDataSheet(resData.map((item, i) => {
            if (item.typePrice === true) {
                return { _id: item._id, items: [i + 1, item.name, null, item.price] } as ITableCell
            }
            else if (item.typePrice === false) {
                return { _id: item._id, items: [i + 1, item.name, item.price, null] } as ITableCell
            }
            return { _id: item._id, items: [i + 1, item.name, null, null] } as ITableCell
        }));
    }, [resData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (isDisplayForm) return;

        setIdUpdate(undefined);
    }, [isDisplayForm]);

    return (
        <NameProductContext.Provider
            value={{
                //
                resData,
                dataSheet,

                isDisplayForm,
                setIsDisplayForm,

                inputName,
                setInputName,

                inputPerUnit,
                setInputPerUnit,

                inputPerKg,
                setInputPerKg,

                unitChecked,
                setUnitChecked,

                idUpdate,

                searchInput,
                setSearchInput,

                handleSaveButtonClick,
                handlerButtonRemoveClick,
                updateDataButtonClick,
                handlerButtonSearchClick,
            }}
        >
            {props.children}
        </NameProductContext.Provider>
    );
};

export default NameProductProvider;
