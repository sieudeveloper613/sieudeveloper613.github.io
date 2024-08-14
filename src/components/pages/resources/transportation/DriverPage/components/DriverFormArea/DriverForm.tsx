import * as React from 'react';
import { Self } from '../..';
import TextField from '../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../common/WindowFormContainer';
import useDriverStore from '../../useDriverStore';

import styles from './DriverFormArea.module.scss';

export interface IDriverFormAreaProps { }

export default function DriverForm(props: IDriverFormAreaProps) {
    const {
        displayForm,
        idUpdate,
        setFormData,
        checkValidAll,
        formData,

        handlerBtnCloseClick,
        handlerBtnSaveClick,
    } = useDriverStore();

    const updateFormData = React.useMemo(() => {
        const keys: Self.TFormDataKey[] = ['name', 'phone']; //==

        return Object.freeze(
            keys.reduce((aggregate, k) => {
                aggregate[k] = (v: string) => {
                    setFormData((preState) => {
                        const newState = {
                            ...preState,
                        };
                        newState[k] = v;
                        return newState;
                    });
                };
                return aggregate;
            }, {} as Record<Self.TFormDataKey, (v: string) => void>),
        );
    }, [setFormData]);
    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm} key={'WindowAddNewDriver'}>
            <WindowForm
                featch={featch}
                title={
                    //==
                    Boolean(!idUpdate)
                        ? 'Tạo mới tài xế' //==
                        : 'Chỉnh sửa tài xế' //==
                }
                width='1000px'
                height='300px'
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
                <div className={styles['form-container']}>
                    <ul>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                title='Tên tài xế'
                                className={styles['text-field']}
                                value={formData.name}
                                touched={true}
                                validator={Self.driverValidate.name}
                                invalidMessage='Tên tài xế không được để trống !'
                                onChange={updateFormData['name']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                title='Số điện thoại'
                                className={styles['text-field']}
                                value={formData.phone}
                                validator={Self.driverValidate.phone}
                                invalidMessage='Số điện thoại không hợp lệ !'
                                onChange={updateFormData['phone']}
                            />
                        </li>
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
