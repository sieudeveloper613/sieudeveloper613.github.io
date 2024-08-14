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

export interface ICommonFormProps {
    formType: string;
}

export default function CommonForm(props: React.PropsWithChildren<ICommonFormProps>) {
    const {
        checkValidAll,
        materialsDataSheet,
        productsDataSheet,

        barcode,
        setBarcode,
        country,
        setCountry,
        countryData,
        productName,
        setProductName,

        materialsDropdown,
        productsDropdown,
        productContainersDropdown,
        idUpdate,
        selectedItem,
        setSelectedItem,

        unitType,
        setUnitType,

        unitByPercent,
        setUnitByPercent,

        unitByWeight,
        setUnitByWeight,

        unitByQuantity,
        setUnitByQuantity,

        handlerBtnClose,
        handlerBtnSaveClick,
        handlerBtnAddItemsClick,
        handlerBtnRemoveItemsClick,

    } = useProductTypeStore();

    const buttonsOfInputMaterials = React.useMemo(() => {
        return [
            {
                icon: 'add',
                iconColor: 'white',
                backgroundColor: '#0844a4',
                onClick: handlerBtnAddItemsClick,
            },
        ];
    }, [handlerBtnAddItemsClick]);

    let titleName;
    if (props.formType === 'DON') titleName = 'Sản Phẩm'
    else if (props.formType === 'HOP') titleName = 'Hộp Chứa Sản Phẩm'
    else if (props.formType === 'THUNG') titleName = 'Thùng Chứa Hộp'

    let name;
    if (props.formType === 'DON') name = 'sản phẩm'
    else if (props.formType === 'HOP') name = 'hộp'
    else if (props.formType === 'THUNG') name = 'thùng'

    let dropdown;
    if (props.formType === 'DON') dropdown = materialsDropdown
    else if (props.formType === 'HOP') dropdown = productsDropdown
    else if (props.formType === 'THUNG') dropdown = productContainersDropdown

    let selectionTitle;
    if (props.formType === 'DON') selectionTitle = 'nguyên liệu'
    else if (props.formType === 'HOP') selectionTitle = 'sản phẩm'
    else if (props.formType === 'THUNG') selectionTitle = 'hộp'

    return (
        <WindowFormContainer display={Boolean(props.formType)}>
            <WindowForm
                title={
                    //==
                    // `Tạo Mới Loại ${titleName}`
                    !idUpdate //==
                        ? `Tạo Mới Loại ${titleName}` //==
                        : `Chỉnh Sửa Loại ${titleName}` //==
                }
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
                                title={`Mã vạch ${name}`}
                                value={barcode}
                                touched={true}
                                validator={Self.validatorContext.barcode}
                                invalidMessage={`Mã ${name} không được để trống !`}
                                onChange={setBarcode}
                            />
                        </li>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['selection']}
                                title={'Quốc gia'}
                                placeholder={'Chọn quốc gia...'}
                                options={countryData}
                                value={country}
                                maxLength={5}
                                sortBy={1}
                                validator={Self.validatorContext.country}
                                invalidMessage='Bạn không được để trống mục này'
                                // ============
                                onChange={(v)=>{setCountry(v)}}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Tên loại ${name}`}
                                value={productName}
                                validator={Self.validatorContext.name}
                                touched={true}
                                invalidMessage={`Tên ${name} không được để trống !`}
                                onChange={setProductName}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <ImageField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Ảnh đại diện'
                                // value={formData.name}
                                touched={true}
                                // validator={userAccountValidate.name}
                                invalidMessage='Tên đối tượng không được để trống !'
                            // onChange={updateFormData['name']}
                            />
                        </li>
                        <li>
                            <ImageField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title='Hình ảnh'
                                // value={formData.name}
                                touched={true}
                                // validator={userAccountValidate.name}
                                invalidMessage='Tên đối tượng không được để trống !'
                            // onChange={updateFormData['name']}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li className={styles['text-editor-container']}>
                            <TextEditor title={`Mô tả ${name}`} />
                        </li>
                    </ul>
                    <ul className={styles['selection-container']}>
                        <li>
                            <Selection
                                markIsRequired
                                checkValidAll={checkValidAll}
                                title={`Nhập và chọn ${selectionTitle}`}
                                className={styles['selection']}
                                placeholder={`Tên ${selectionTitle}`}
                                sortBy={1}
                                invalidMessage={`Bạn phải chọn ${selectionTitle}`}
                                invalidColor='red'
                                options={dropdown}
                                maxLength={5}
                                value={selectedItem}
                                onChange={setSelectedItem}
                            />
                        </li>

                        {props.formType === 'DON'
                            ?
                            <>
                                <li>
                                    <TextField
                                        checkValidAll={checkValidAll}
                                        className={styles['text-field']}
                                        value={unitByPercent}
                                        onChange={setUnitByPercent}
                                        touched={true}
                                        validator={Self.validatorContext.unitByPercent}
                                        invalidMessage='Số lượng nhập không phù hợp'
                                        placeholder='Nhập số lượng đơn vị'
                                        readonly={unitType !== 1}
                                    />
                                    <div className={styles['text']}>%</div>
                                    <input
                                        type='checkbox'
                                        checked={unitType === 1}
                                        onChange={() => setUnitType(1)}
                                    />
                                </li>

                                <li>
                                    <TextField
                                        checkValidAll={checkValidAll}
                                        className={styles['text-field']}
                                        value={unitByWeight}
                                        onChange={setUnitByWeight}
                                        touched={true}
                                        validator={Self.validatorContext.unitByWeight}
                                        invalidMessage='Số lượng nhập không phù hợp'
                                        placeholder='Nhập số lượng đơn vị'
                                        readonly={unitType !== 2}
                                    />
                                    <div className={styles['text']}>g</div>
                                    <input
                                        type='checkbox'
                                        checked={unitType === 2}
                                        onChange={() => setUnitType(2)}
                                    />
                                </li>
                            </>
                            :
                            <li>
                                <TextField
                                    checkValidAll={checkValidAll}
                                    className={styles['text-field']}
                                    value={unitByQuantity}
                                    onChange={setUnitByQuantity}
                                    touched={true}
                                    validator={Self.validatorContext.quantity}
                                    invalidMessage='Số lượng nhập không phù hợp'
                                    placeholder='Nhập số lượng'
                                />
                            </li>
                        }

                        <li className={styles['button']}>
                            <Buttons
                                buttons={buttonsOfInputMaterials}
                            />
                        </li>
                    </ul>
                    <div className={styles['data-table-wrap']}>
                        {props.formType === 'DON'
                            ?
                            <DataTable
                                displayHeader={false}
                                data={materialsDataSheet}
                                numberRowConfig='default'
                                maxHeight={5}
                                displayFooter={false}
                                headerCells={['Tên nguyên liệu', 'Số lượng (%)', 'Số lượng (g)']}
                                columnWidth={['500px', '140px', '140px']}
                                displayButtons={{ remove: true }}
                                hideWhenDataIsEmpty
                                //
                                onButtonRemoveClick={handlerBtnRemoveItemsClick}
                            />
                            :
                            <DataTable
                                displayHeader={false}
                                data={productsDataSheet}
                                numberRowConfig='default'
                                maxHeight={5}
                                displayFooter={false}
                                headerCells={['Mã sản phẩm', 'Tên sản phẩm', 'Số lượng']}
                                columnWidth={['200px', '400px', '80px']}
                                displayButtons={{ remove: true }}
                                hideWhenDataIsEmpty
                                //
                                onButtonRemoveClick={handlerBtnRemoveItemsClick}
                            />
                        }
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}