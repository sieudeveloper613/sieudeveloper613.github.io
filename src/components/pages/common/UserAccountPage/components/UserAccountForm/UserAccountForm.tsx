import * as React from 'react';
import { userAccountValidate, userAccountValidate_Agri, userAccountValidate_Orther } from '../..';
import UserFormData from '../../../../../../sharetype/form-data/resources/master/UserFormData';
import IAddress from '../../../../../../sharetype/types/IAddress';
import Address from '../../../../../../utils/Address';
import make from '../../../../../../utils/make';
import Selection from '../../../../../common/Selection';
import TextField from '../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../common/WindowFormContainer';
import useUserAccountStore from '../../useUserAccountStore';
import InputCertificate from '../InputCertificate';

import styles from './UserAccountForm.module.scss';
import { useAppSelector } from '../../../../../../redux/hooks';
import { ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';

export interface IUserAccountFormProps { }

export default function UserAccountForm(props: IUserAccountFormProps) {
    const {
        displayForm,
        idUpdate,
        checkValidAll,
        permission,
        formData,
        setFormData,
        typeUser,
        handlerBtnSaveClick,
        handlerBtnCloseClick,
    } = useUserAccountStore();
    const [featch, setFeatch] = React.useState(false);
    const isUploadingCer = useAppSelector((state) => state.user.isUploadingCer);
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
    }, [setFormData]);

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
    
    React.useEffect(()=>{
        setFeatch(isUploadingCer)
    },[isUploadingCer])
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={make.result(() => {
                    if (!idUpdate) return 'Tạo mới đối tượng';
                    return 'Cập nhật đối tượng';
                })}
                width='90vw'
                height='90vh'
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
                            }, 2500);
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
                                validator={userAccountValidate.name}
                                invalidMessage='Tên đối tượng không được để trống !'
                                onChange={updateFormData['name']}
                            />
                        </li>
                        {typeUser == ETypeUser.other ? <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                // markIsRequired
                                className={styles['text-field']}
                                title='Số điện thoại'
                                value={formData.phone}
                                validator={userAccountValidate_Orther.phone}
                                invalidMessage='Số điện thoại không hợp lệ !'
                                onChange={updateFormData['phone']}
                            />
                        </li> :
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Mã số thuế'
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                                value={formData.taxCode}
                                validator={userAccountValidate.taxCode}
                                invalidMessage='Mã số thuế không hợp lệ !'
                                onChange={updateFormData['taxCode']}
                            />
                        </li>}
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
                                validator={userAccountValidate.email}
                                invalidMessage='Email không hợp lệ !'
                                onChange={updateFormData['email']}
                            />
                        </li>
                        {permission?.role == EnterpriseRole.enterprise ?<li>
                            <TextField
                                checkValidAll={checkValidAll}
                                // markIsRequired
                                className={styles['text-field']}
                                title='Số điện thoại'
                                value={formData.phone}
                                validator={userAccountValidate.phone}
                                invalidMessage='Số điện thoại không hợp lệ !'
                                onChange={updateFormData['phone']}
                            />
                        </li> :
                        <li>
                        <TextField
                            checkValidAll={checkValidAll}
                            markIsRequired
                            className={styles['text-field']}
                            title='GLN'
                            value={formData.gln}
                            validator={userAccountValidate_Agri.gln}
                            invalidMessage='Mã GLN không được để trống !'
                            onChange={updateFormData['gln']}
                        />
                    </li>}
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
                                validator={userAccountValidate.address.city}
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
                                validator={userAccountValidate.address.district}
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
                                validator={userAccountValidate.address.ward}
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
                                validator={userAccountValidate.address.addressLine}
                                invalidMessage='Tên đường không hợp lệ'
                                onChange={updateAddress['addressLine']}
                            />
                        </li>
                        <li className={styles['location']}>
                            <div>
                                <TextField
                                    checkValidAll={checkValidAll}
                                    // markIsRequired
                                    className={styles['text-field']}
                                    title='LAT'
                                    value={formData.address?.lat}
                                    // validator={userAccountValidate.address.lat}
                                    // invalidMessage='LAT không hợp lệ !'
                                    onChange={updateAddress['lat']}
                                />
                            </div>
                            <div>
                                <TextField
                                    checkValidAll={checkValidAll}
                                    // markIsRequired
                                    className={styles['text-field']}
                                    title='LNG'
                                    value={formData.address?.lng}
                                    // validator={userAccountValidate.address.lng}
                                    // invalidMessage='LNG không hợp lệ !'
                                    onChange={updateAddress['lng']}
                                />
                            </div>
                        </li>
                        <li className={styles['certificate']}>
                            <InputCertificate
                                // ==============
                                idUpdate={idUpdate}
                                certificate={formData.certificate || []}
                                title='Chứng chỉ'
                                displayForm={displayForm}
                            />
                        </li>
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
