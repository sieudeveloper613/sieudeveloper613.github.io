import * as React from 'react';
import styles from './CommonForm.module.scss'
import WindowFormContainer, { WindowForm } from '../../../../../../../../common/WindowFormContainer';
import useProductTypeStore from '../../../useProductTypeStore';
import TextField from '../../../../../../../../common/TextField';
import ImageField from '../../../../../../../../common/ImageField';
import TextEditor from '../../../../../../../../common/TextEditor';
import DataTable from '../../../../../../../../common/DataTable';
import { Self } from '../../..'
import Selection from '../../../../../../../../common/Selection';
import Buttons from '../../../../../../../../common/TextField/components/Buttons';
import InputPicture from '../../../../../../../common/UserAccountPage/components/InputPicture';
import { useAppSelector } from '../../../../../../../../../redux/hooks';
import make from '../../../../../../../../../utils/make';

export interface ICommonFormProps {
    formType: string;
    displayForm:boolean
}

export default function CommonForm(props: React.PropsWithChildren<ICommonFormProps>) {
    const {
        checkValidAll,
        productGTIN,
        setProductGTIN,
        productName,
        setProductName,
        expireDate,
        setExpireDate,
        productVolume,
        setProductVolume,
        idUpdate,
        handlerBtnClose,
        handlerBtnSaveClick,
    } = useProductTypeStore();
    const [featch, setFeatch] = React.useState(false);
    const isUploadingCer = useAppSelector((state) => state.user.isUploadingCer);
   
    // let titleName;
    // if (props.formType === 'DON') titleName = 'Sản Phẩm'
    // else if (props.formType === 'HOP') titleName = 'Hộp Chứa Sản Phẩm'
    // else if (props.formType === 'THUNG') titleName = 'Thùng Chứa Hộp'

    // let name;
    // if (props.formType === 'DON') name = 'sản phẩm'
    // else if (props.formType === 'HOP') name = 'hộp'
    // else if (props.formType === 'THUNG') name = 'thùng'

    // let dropdown;
    // if (props.formType === 'DON') dropdown = materialsDropdown
    // else if (props.formType === 'HOP') dropdown = productsDropdown
    // else if (props.formType === 'THUNG') dropdown = productContainersDropdown

    // let selectionTitle;
    // if (props.formType === 'DON') selectionTitle = 'nguyên liệu'
    // else if (props.formType === 'HOP') selectionTitle = 'sản phẩm'
    // else if (props.formType === 'THUNG') selectionTitle = 'hộp'
    React.useEffect(()=>{
        setFeatch(isUploadingCer)
    },[isUploadingCer])
    // console.log('representPicture',representPicture)
    return (
        <WindowFormContainer display={Boolean(props.formType)}>
            <WindowForm
                title={
                    //==
                    // `Tạo Mới Loại ${titleName}`
                    !idUpdate //==
                        ? `Tạo mới sản phẩm` //==
                        : `Chỉnh sửa sản phẩm` //==
                }
                featch={featch}
                width='80vw'
                height='90vh'
                buttons={[
                    {
                        label: 'X',
                        onClick: handlerBtnClose,
                    },
                    {
                        label: 'Đóng',
                        onClick: handlerBtnClose,
                    },
                    {
                        label: 'Lưu',
                        onClick: handlerBtnSaveClick,
                    }
                ]}
            >
                <div className={styles['form-container']}>
                    <ul>
                            <li>
                                <TextField
                                    checkValidAll={checkValidAll}
                                    markIsRequired
                                    className={styles['text-field']}
                                    title={`Tên sản phẩm`}
                                    value={productName}
                                    validator={Self.validatorContext.name}
                                    touched={true}
                                    invalidMessage={`Tên không được để trống !`}
                                    onChange={setProductName}
                                    readonly={make.result(() => {
                                        if (!idUpdate) return false;
                                        return true;
                                    })}
                                />
                            </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={'Hạn sử dụng (Ngày)'}
                                value={expireDate}
                                validator={Self.validatorContext.expireDate}
                                touched={true}
                                invalidMessage={'Yêu cầu nhập số ngày và lớn hơn 0. Vd: 10, 20,..'}
                                onChange={setExpireDate}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Mã GTIN của sản phẩm`}
                                value={productGTIN}
                                touched={true}
                                validator={Self.validatorContext.barcode}
                                invalidMessage={`Mã GTIN không được để trống !`}
                                onChange={setProductGTIN}
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                            />
                        </li>
                       {props.formType === 'FIXED' && <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Khối lượng sản phẩm (Kg)`}
                                value={productVolume}
                                touched={true}
                                validator={Self.validatorContext.productVolume}
                                invalidMessage={`Yêu cầu nhập khối lượng và lớn hơn 0. Vd: 10, 20,..`}
                                onChange={setProductVolume}
                            />
                        </li>}
                        
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}