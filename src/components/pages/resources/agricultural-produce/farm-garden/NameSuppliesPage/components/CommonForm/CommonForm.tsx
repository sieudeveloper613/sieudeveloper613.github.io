import * as React from 'react';
import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';

import useCommonStore from '../../useCommonStore';
import { Self } from '../..';

import styles from './CommonForm.module.scss';
import Selection from '../../../../../../../common/Selection';

interface ICommonFormProps { }

export default function CommonForm(props: ICommonFormProps) {
    const {
        displayForm,
        idUpdate,
        checkValidAll,
        inputName,
        setInputName,
        supppliesOptions,
        suppliesSelected,
        setSuppliesSelected,

        handlerBtnSaveClick,
        handlerBtnCloseClick,
    } = useCommonStore();

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
                         '700px' //==
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
                        <Selection
                            checkValidAll={checkValidAll}
                            className={styles['selection']}
                            title={'Loại vật tư'}
                            placeholder={'Nhập và chọn'}
                            value={suppliesSelected}
                            onChange={setSuppliesSelected}
                            options={supppliesOptions}
                            validator={Self.validator.name}
                            markIsRequired
                            invalidMessage='Mục này không được để trống !'
                            sortBy={1}
                            maxLength={5}
                        />
                    </div>
                    <div className={styles['input-wrap']}>
                        <TextField
                            checkValidAll={checkValidAll}
                            markIsRequired
                            className={styles['text-field']}
                            title={`Tên ${Self.title.toLowerCase()}`}
                            validator={Self.validator.name}
                            invalidMessage='Mục này không được để trống'
                            value={inputName}
                            touched={true}
                            nonButton={1}
                            onChange={setInputName}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
