import * as React from 'react';
import { Self } from '../..';

import UserFormData from '../../../../../../sharetype/form-data/resources/master/UserFormData';
import IAddress from '../../../../../../sharetype/types/IAddress';
import Address from '../../../../../../utils/Address';
import make from '../../../../../../utils/make';
import Selection from '../../../../../common/Selection';
import TextField from '../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../common/WindowFormContainer';
import useParticipantsStore from '../../useParticipantsStore';

import styles from './ParticipantsForm.module.scss';

export interface IParticipantsFormProps { }

export default function ParticipantsForm(props: IParticipantsFormProps) {
    const {
        displayForm,
        idUpdate,
        formData,
        setFormData,
        checkValidAll,

        handlerBtnSaveClick,
        handlerBtnCloseClick,
    } = useParticipantsStore();

    const updateFormData = React.useMemo(() => {
        const result = {
            // ======
        } as Record<UserFormData.TKeysOfIData, (v: string) => void>;

        for (const key of UserFormData.keysOfIData) {
            result[key] = (v: string) => {
                setFormData((preState) => {
                    const newState = {
                        ...preState,
                    };
                    newState[key] = v;
                    return newState;
                });
            };
        }

        return Object.freeze(result);
    }, [setFormData, formData]);

    const updateAddress = React.useMemo(() => {
        const addressKeys: (keyof IAddress)[] = ['city', 'district', 'ward', 'addressLine', 'lng', 'lat'];
        const result = {
            // ===========
        } as Record<keyof IAddress, (v: string | undefined) => void>;

        for (const key of addressKeys) {
            result[key] = (v: string | undefined) => {
                setFormData((preState) => {
                    const newState = {
                        ...preState,
                    };

                    newState.address = {
                        ...preState.address,
                    };

                    newState.address[key] = v;
                    return newState;
                });
            };
        }

        return Object.freeze(result);
    }, [setFormData]);
    const [featch, setFeatch] = React.useState(false);

    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={make.result(() => {
                    if (!idUpdate) return 'Tạo mới đối tượng';
                    return 'Cập nhật đối tượng';
                })}
                width='70vw'
                height='80vh'
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
                                title='Tên đối tượng'
                                value={formData.name}
                                touched={true}
                                validator={Self.validateKernel.name}
                                invalidMessage='Tên đối tượng không được để trống !'
                                onChange={updateFormData['name']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Email'
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                                value={formData.email}
                                validator={Self.validateKernel.email}
                                invalidMessage='Email không hợp lệ !'
                                onChange={updateFormData['email']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Số điện thoại'
                                value={formData.phone}
                                validator={Self.validateKernel.phone}
                                invalidMessage='Số điện thoại không hợp lệ !'
                                onChange={updateFormData['phone']}
                            />
                        </li>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['selection']}
                                title='Thành phố - Tỉnh'
                                placeholder={'Chọn tỉnh...'}
                                options={Address.instance.getCityOptions()}
                                value={formData.address?.city}
                                maxLength={5}
                                sortBy={1}
                                validator={Self.validateKernel.address.city}
                                invalidMessage='Bạn không được để trống mục này'
                                // ============
                                onChange={updateAddress['city']}
                            />
                        </li>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['selection']}
                                title='Quận - Huyện'
                                placeholder={
                                    //==
                                    Boolean(!formData.address?.city) //==
                                        ? 'Chọn "Thành phố - Tỉnh" trước rồi chọn mục này !'
                                        : 'Chọn quận, huyện...' //==
                                }
                                readonly={Boolean(!formData.address?.city)}
                                options={Address.instance.getDistrictOptions(formData.address?.city)}
                                value={formData.address?.district}
                                maxLength={5}
                                sortBy={1}
                                validator={Self.validateKernel.address.district}
                                invalidMessage='Bạn không được để trống mục này'
                                // ============
                                onChange={updateAddress['district']}
                            />
                        </li>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['selection']}
                                title='Phường - Xã'
                                placeholder={
                                    //==
                                    Boolean(!formData.address?.district) //==
                                        ? 'Chọn "Quận - Huyện" trước rồi chọn mục này !'
                                        : 'Chọn phường - xã...' //==
                                }
                                readonly={Boolean(!formData.address?.district)}
                                options={Address.instance.getWardOptions([
                                    // ===========
                                    formData.address?.city,
                                    formData.address?.district,
                                ])}
                                value={formData.address?.ward}
                                maxLength={5}
                                sortBy={1}
                                validator={Self.validateKernel.address.ward}
                                invalidMessage='Bạn không được để trống mục này'
                                // =========
                                onChange={updateAddress['ward']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Số nhà, tên đường'
                                value={formData.address?.addressLine}
                                validator={Self.validateKernel.address.addressLine}
                                invalidMessage='Tên đường không hợp lệ'
                                onChange={updateAddress['addressLine']}
                            />
                        </li>
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
