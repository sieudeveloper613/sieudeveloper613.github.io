import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useStorehouseStore from '../../useStorehouseStore';
import styles from './StorehouseForm.module.scss';
type TInputkey = 'storeAddress' | 'storeCode' | 'storeName';

export interface IStorehouseFormProps {}

export default function StorehouseForm(props: IStorehouseFormProps) {
    const { displayForm, formData, setFormData, handleOnCloseClick, handleOnSaveClick, validateFormData } =
        useStorehouseStore();
    const updateFormData = (k: TInputkey) => (v: string) => {
        setFormData((preState) => {
            const newState = { ...preState };
            newState[k] = v;
            return newState;
        });
    };

    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                title='Tạo kho hàng'
                buttons={[
                    { label: 'x', onClick: handleOnCloseClick },
                    { label: 'Đóng', onClick: handleOnCloseClick },
                    { label: 'Lưu', onClick: handleOnSaveClick },
                ]}
                width='1000px'
            >
                <div className={styles['input-container']}>
                    <div className={styles['top-input-container']}>
                        <TextField
                            title='Mã kho hàng'
                            onChange={updateFormData('storeCode')}
                            validator={(v) => validateFormData(v, 'storeCode')}
                            value={formData.storeCode}
                        />
                        <TextField
                            title='Tên kho hàng'
                            onChange={updateFormData('storeName')}
                            validator={(v) => validateFormData(v, 'storeName')}
                            value={formData.storeName}
                        />
                    </div>
                    <div className={styles['bottom-input-container']}>
                        <TextField
                            title='Địa chỉ'
                            onChange={updateFormData('storeAddress')}
                            validator={(v) => validateFormData(v, 'storeAddress')}
                            value={formData.storeAddress}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
