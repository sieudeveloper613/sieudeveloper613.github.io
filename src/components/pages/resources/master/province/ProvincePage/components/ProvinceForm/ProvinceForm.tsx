import * as React from 'react';

import make from '../../../../../../../../utils/make';
import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import Validate from '../../../../../../../../utils/Validate';
import styles from './ProvinceForm.module.scss';
import { useAppSelector } from '../../../../../../../../redux/hooks';
import useProvincePageStore from '../../useProvincePageStore';
import { IWards } from '../../../../../../../../sharetype/response/resources/master/UserResponse/UserResponse';
import Address from '../../../../../../../../utils/Address';
import messageAlert from '../../../../../../../../utils/messageAlert';

export interface IUserAccountFormProps { }
type TKeysOfIData = keyof IWards
const keysOfIData: TKeysOfIData[] = [
    'code',
    'name',
    'class',
    'codeCity',
    'codeDistrict'
];

export default function UserAccountForm(props: IUserAccountFormProps) {
    const {
        displayForm,
        idUpdate,
        checkValidAll,

        formData,
        setFormData,
        selectedObj,
        selectedProductType,
        handlerBtnSaveClick,
        handlerBtnCloseClick,
        setCheckValidAll,
    } = useProvincePageStore();
    const [featch, setFeatch] = React.useState(false);
    const isUploadingCer = useAppSelector((state) => state.user.isUploadingCer);
    const {updatedAt,..._formData} = formData
    const lengthData = Object.keys(_formData).length
    const userAccountValidate = Object.freeze({
        name: Validate.minLengthWithTrim(1),
        // code: Validate.checkCode(formData.code?.length || 1),
        code: Validate.minLengthWithTrim(1),
        class: Validate.minLengthWithTrim(1),
    });
    const handleClickSave =async () => {
        setCheckValidAll(true);
        // validate
        console.log(formData,userAccountValidate)
        if (!(await Validate.check(formData, userAccountValidate))) {
            // <= Important!
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }
        handlerBtnSaveClick()
    }
    const updateFormData = React.useMemo(() => {
        const result = {
        } as Record<TKeysOfIData, (v: string) => void>;

        for (const key of keysOfIData) {
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

   
 
    React.useEffect(()=>{
        setFeatch(isUploadingCer)
    },[isUploadingCer])
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={make.result(() => {
                    if (!idUpdate) return `Thêm mới ${!selectedProductType ? 'Tỉnh -  Thành phố': !selectedObj? 'Quận - Huyện':' Xã - Phường - Thị trấn'}`;
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
                            handleClickSave()
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
                                title='Mã hành chính'
                                value={formData.code}
                                touched={true}
                                validator={userAccountValidate.code}
                                invalidMessage='Mã hành chính không được để trống !'
                                onChange={updateFormData['code']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Tên hành chính'
                                value={formData.name}
                                validator={userAccountValidate.name}
                                invalidMessage='Tên hành chính không được bỏ trống !'
                                onChange={updateFormData['name']}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Cấp hành chính'
                                value={formData.class}
                                validator={userAccountValidate.class}
                                invalidMessage='Cấp hành chính không được để trống !'
                                onChange={updateFormData['class']}
                            />
                        </li>
                        { (lengthData > 4 || selectedProductType) &&
                            <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title=' Tỉnh - Thành phố trực thuộc'
                                readonly={true}
                                value={idUpdate ? Address.instance.getCityName(formData.codeCity || '')  : Address.instance.getCityName(selectedProductType || '')}
                            />
                        </li>
                        }
                        {(lengthData > 5 || selectedObj) &&
                            <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Mã Quận - Huyện trực thuộc'
                                readonly={true}
                                value={idUpdate ? Address.instance.getDistrictName(formData.codeDistrict || '') : Address.instance.getDistrictName(selectedObj || '')}
                            />
                        </li>
                        }
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
