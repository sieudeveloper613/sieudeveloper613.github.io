import * as React from 'react';
import { Self } from '../.';
import make from '../../../../../../utils/make';

import TextField from '../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../common/WindowFormContainer';
import { useVehicleStore } from '../useVehicleStore';

import styles from './VehicleForm.module.scss';

type Props = {};

const VehicleForm = (props: Props) => {
    const {
        //==
        checkValidAll,
        formData,
        idUpdate,
        setFormData,
        displayForm,
        handlerBtnSaveClick,
        handlerBtnCloseClick, //==
    } = useVehicleStore();

    const updateFormData = React.useMemo(() => {
        const keys: Self.TFormDataKey[] = ['email', 'licensePlates', 'vehicleType'];

        return Object.freeze(
            keys.reduce((aggregate, k) => {
                aggregate[k] = (v) => {
                    setFormData((preState) => {
                        const newState = { ...preState };
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
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={
                    //==
                    Boolean(!idUpdate) //==
                        ? 'Tạo mới xe' //==
                        : 'Chỉnh sửa xe' //==
                }
                width='1000px'
                height='450px'
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
                                className={styles['text-field']}
                                title='Biển số xe*'
                                value={formData.licensePlates}
                                touched={true}
                                validator={Self.vehicleValidate.licensePlates}
                                invalidMessage='Biển số xe không được để trống !'
                                onChange={updateFormData['licensePlates']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Email*'
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                                value={formData.email}
                                validator={Self.vehicleValidate.email}
                                invalidMessage='Email không hợp lệ !'
                                onChange={updateFormData['email']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Loại xe*'
                                value={formData.vehicleType}
                                validator={Self.vehicleValidate.vehicleType}
                                invalidMessage='Loại xe không được để trống !'
                                onChange={updateFormData['vehicleType']}
                            />
                        </li>
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
};

export default VehicleForm;
