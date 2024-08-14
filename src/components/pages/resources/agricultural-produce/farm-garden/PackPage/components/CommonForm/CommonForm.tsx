import * as React from 'react';
import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useCommonStore from '../../useCommonStore';
import { Self } from '../..';

import styles from './CommonForm.module.scss';

interface ICommonFormProps {}

export default function CommonForm(props: ICommonFormProps) {
    const {
        displayForm,
        idUpdate,
        isSupplierFormDataEmpty,
        checkValidAll,
        inputName,
        setInputName,

        handlerBtnSaveClick,
        handlerBtnCloseClick,
        handlerBtnAddSupplierClick,
    } = useCommonStore();

    const buttonsOfInputSupplier = React.useMemo(() => {
        return [
            {
                icon: 'add',
                iconColor: 'white',
                backgroundColor: '#0844a4',
                onClick: handlerBtnAddSupplierClick,
            },
        ];
    }, [handlerBtnAddSupplierClick]);
    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={
                    Boolean(!idUpdate) //==
                        ? `Tạo mới thông tin ${Self.title}`
                        : `Chỉnh sửa thông tin ${Self.title}`
                }
                width='1000px'
                height={
                    isSupplierFormDataEmpty //==
                        ? '500px' //==
                        : '700px' //==
                }
                buttons={[
                    {
                        label: 'X',
                        onClick: handlerBtnCloseClick,
                    },
                    {
                        label: 'Đóng',
                        onClick: handlerBtnCloseClick,
                    },
                    {
                        label: 'Lưu',
                        onClick: () => {
                            setFeatch(true);
                            handlerBtnSaveClick();
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
                            title={`${Self.title}`}
                            validator={Self.validator.name}
                            invalidMessage='Mục này không được để trống'
                            value={inputName}
                            touched={true}
                            readonly={Boolean(idUpdate)}
                            nonButton={1}
                            markIsRequired
                            //
                            onChange={setInputName}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
