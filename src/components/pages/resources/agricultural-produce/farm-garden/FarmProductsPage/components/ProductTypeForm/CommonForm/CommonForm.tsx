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
    displayForm: boolean
}

export default function CommonForm(props: React.PropsWithChildren<ICommonFormProps>) {
    const {
        checkValidAll,

        productName,
        setProductName,

        productGtin,
        setProductGtin,

        idUpdate,

        handlerBtnClose,
        handlerBtnSaveClick,
        handlerBtnRemoveItemsClick,
        representPicture
    } = useProductTypeStore();
    const [featch, setFeatch] = React.useState(false);
    const isUploadingCer = useAppSelector((state) => state.user.isUploadingCer);

    let titleName = 'Sản Phẩm'
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
    React.useEffect(() => {
        setFeatch(isUploadingCer)
    }, [isUploadingCer])
    // console.log('representPicture',representPicture)
    return (
        <WindowFormContainer display={props.displayForm}>
            <WindowForm
                title={
                    //==
                    // `Tạo Mới Loại ${titleName}`
                    !idUpdate //==
                        ? `Tạo Mới Thông tin Sản phẩm` //==
                        : `Chỉnh Sửa Thông tin Sản phẩm` //==
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
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Mã GTIN của sản phẩm`}
                                value={productGtin}
                                touched={true}
                                validator={Self.validatorContext.name}
                                invalidMessage={`Mã GTIN không được để trống !`}
                                onChange={setProductGtin}
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                            />
                        </li>
                        {/* {false ?<li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Mã GTIN của sản phẩm`}
                                value={barcode}
                                touched={true}
                                validator={Self.validatorContext.barcode}
                                invalidMessage={`Mã GTIN không được để trống !`}
                                onChange={setBarcode}
                                readonly={make.result(() => {
                                    if (!idUpdate) return false;
                                    return true;
                                })}
                            />
                        </li> : <li>
                            <div className={styles['input-add-wrap']}>
                                <Selection
                                buttons= {buttonsOfInputSupplier}
                                checkValidAll={checkValidAll}
                                className={styles['selection']}
                                title={'Loại vật tư'}
                                placeholder={'Nhập và chọn'}
                                value={'1'}
                                onChange={()=>{}}
                                options={[{label:'test',value:'1'}]}
                                validator={Self.validatorContext.name}
                                markIsRequired
                                invalidMessage='Mục này không được để trống !'
                                sortBy={1}
                                maxLength={5}
                                />
                            </div>
                            <div>
                                <DataTable
                                    displayHeader={false}
                                    data={[{_id:'1',items:['123']},{_id:'1',items:['123']}]}
                                    numberRowConfig='default'
                                    maxHeight={5}
                                    displayFooter={false}
                                    headerCells={['Nhà cung cấp']}
                                    displayButtons={{ remove: true }}
                                    hideWhenDataIsEmpty
                                    //
                                    onButtonRemoveClick={()=>{}}
                                />
                            </div>
                        </li>} */}
                        {/* <li style={{ height: 250 }}>
                            <InputPicture
                                // ==============
                                idUpdate={idUpdate}
                                picture={representPicture || []}
                                title='Hình ảnh'
                                displayForm={props.displayForm}
                            />
                        </li> */}
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}