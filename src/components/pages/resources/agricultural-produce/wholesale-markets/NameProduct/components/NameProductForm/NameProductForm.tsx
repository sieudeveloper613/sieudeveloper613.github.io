import { useEffect } from 'react';
import { Self } from '../..';
import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useNameProductStore from '../../useNameProduct';
import styles from './NameProductForm.module.scss';

interface INameProductProps { }

export default function NameProduct(props: INameProductProps) {
    const {
        isDisplayForm,
        inputName,
        setInputName,
        inputPerUnit,
        setInputPerUnit,
        inputPerKg,
        setInputPerKg,
        unitChecked,
        setUnitChecked,
        handleSaveButtonClick,
        setIsDisplayForm,
        idUpdate
    } = useNameProductStore();

    return (
        <WindowFormContainer display={isDisplayForm}>
            <WindowForm
                title='Thông tin nguyên liệu'
                width='1000px'
                height='600px'
                buttons={[
                    {
                        label: 'Đóng'.toLocaleUpperCase(),
                        width: '50px',
                        fontFamily: 'Arial',
                        onClick: () => {
                            setIsDisplayForm(false);
                        },
                    },
                    {
                        label: 'Lưu',
                        onClick: handleSaveButtonClick,
                    },
                ]}
            >
                <div className={styles['container']}>
                    <div className={styles['input-wrap']}>

                        <TextField
                            validator={Self.validator.name}
                            className={styles['text-field']}
                            invalidMessage='Mục này không được để trống'
                            invalidColor='red'
                            title='Sản phẩm'
                            value={inputName}
                            onChange={setInputName}
                        />
                    </div>
                    <div className={styles['input-wrap']}>
                        <TextField
                            className={styles['text-field']}
                            invalidColor='red'
                            title='Đơn giá (VNĐ/KG)'
                            value={inputPerKg}
                            onChange={setInputPerKg}
                            readonly={unitChecked}
                        />
                        <input
                            className={styles['check-box']}
                            type='checkbox'
                            checked={!unitChecked}
                            onChange={() => {
                                setUnitChecked(false)
                            }} />
                    </div>
                    <div className={styles['input-wrap']}>
                        <TextField
                            className={styles['text-field']}
                            invalidColor='red'
                            title='Đơn giá'
                            value={inputPerUnit}
                            onChange={setInputPerUnit}
                            readonly={!unitChecked}
                        />
                        <input
                            className={styles['check-box']}
                            type='checkbox'
                            checked={unitChecked}
                            onChange={() => {
                                setUnitChecked(true)
                            }} />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
