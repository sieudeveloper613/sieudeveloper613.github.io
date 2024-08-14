import React from 'react';

import TextField from '../../../../../../../common/TextField';
import { Self } from '../..'
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useAccessInfoManageStore from '../../useAccessInfoManageStore';

import styles from './CreateForm.module.scss'


interface ICreateFormProps { }

export default function CreateForm(props: ICreateFormProps) {
    const {
        displayCreateForm,
        checkValidAll,
        inputName,
        setInputName,
        handleButtonCloseClick,
        handleButtonSaveCreateFormClick
    } = useAccessInfoManageStore();
    const [featch, setFeatch] = React.useState(false);

    return (
        <WindowFormContainer display={displayCreateForm}>
            <WindowForm
                featch={featch}
                title={'Tạo thông tin sản phẩm mới'}
                width='1000px'
                height='600px'
                buttons={[
                    {
                        label: 'X',
                        onClick: handleButtonCloseClick
                    },
                    {
                        label: 'Đóng',
                        onClick: handleButtonCloseClick
                    },
                    {
                        label: 'Lưu',
                        onClick: () => {
                            setFeatch(true);
                            handleButtonSaveCreateFormClick();
                            setTimeout(() => {
                                setFeatch(false);
                            }, 4000);
                        },
                    },
                ]}
            >
                <div className={styles['container']}>
                    <div className={styles['input-wrap']}>
                        <TextField
                            checkValidAll={checkValidAll}
                            className={styles['text-field']}
                            title={`Tên ${Self.title.toLowerCase()}`}
                            validator={Self.validator.name}
                            invalidMessage='Mục này không được để trống'
                            value={inputName}
                            touched={true}
                            onChange={setInputName}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
