import * as React from 'react';
import { IValidateResult } from '../../../../../../core/types';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import generate from '../../../../../../utils/generate';
import { ITableCell } from '../../../../../common/DataTable';

export interface IStorehouseProviderProps {}
export interface IFormData {
    _id: string;
    storeCode: string;
    storeName: string;
    storeAddress: string;
}

export const StorehouseContext = React.createContext<{
    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;

    formData: IFormData;
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>;

    processData: ITableCell[];

    handleOnUpdateClick: (id: string) => void;
    handleOnCreateClick: () => void;
    handleOnCloseClick: () => void;
    handleOnSaveClick: () => void;

    validateFormData: (v: string, key: string) => IValidateResult;
}>({} as any);
export default function StorehouseProvider(props: React.PropsWithChildren<IStorehouseProviderProps>) {
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<IFormData>({
        _id: '',
        storeAddress: '',
        storeCode: '',
        storeName: '',
    });
    const [resData, setResData] = React.useState<IFormData[]>([
        { _id: generate.id(), storeCode: 'MA1', storeName: 'Nhà kho 1', storeAddress: 'Địa chỉ 1' },
        { _id: generate.id(), storeCode: 'MA2', storeName: 'Nhà kho 2', storeAddress: 'Địa chỉ 2' },
    ]);

    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);

    const messageBox = useMessageBox();
    const handleOnUpdateClick = (id: string) => {
        setDisplayForm(true);
        setIdUpdate(id);
        const result = resData.find((item) => item._id === id);
        if (!result) {
            messageBox('Lỗi hệ thống');
            return;
        }
        setFormData(result);
    };
    const handleOnCreateClick = () => {
        setDisplayForm(true);
    };
    const handleOnCloseClick = () => {
        setDisplayForm(false);
        setFormData({
            _id: '',
            storeAddress: '',
            storeCode: '',
            storeName: '',
        });
        setIdUpdate(undefined);
    };
    const handleOnSaveClick = () => {
        console.log(formData);
    };
    const processData: ITableCell[] = React.useMemo(() => {
        if (!resData) return [];

        return resData.map((item, i) => {
            return {
                _id: item._id,
                items: [item.storeCode, item.storeName, item.storeAddress],
            } as ITableCell;
        });
    }, [resData]);
    const validateFormData = (v: string, key: string): IValidateResult => {
        if (!idUpdate) {
            if (v.length < 1) {
                return {
                    status: 'invalid',
                    invalidColor: 'red',
                    message: 'Vui lòng điền thông tin',
                };
            }
            if (key === 'storeCode') {
                const result = resData.find((item) => item.storeCode === v);
                if (result) {
                    return {
                        status: 'invalid',
                        invalidColor: 'red',
                        message: 'Mã nhà kho đã tồn tại! Vui lòng nhập lại',
                    };
                }
            }
        }
        return {
            status: 'valid',
        };
    };

    return (
        <StorehouseContext.Provider
            value={{
                displayForm,
                setDisplayForm,

                formData,
                setFormData,

                processData,

                handleOnUpdateClick,
                handleOnCreateClick,
                handleOnCloseClick,
                handleOnSaveClick,
                validateFormData,
            }}
        >
            {props.children}
        </StorehouseContext.Provider>
    );
}
