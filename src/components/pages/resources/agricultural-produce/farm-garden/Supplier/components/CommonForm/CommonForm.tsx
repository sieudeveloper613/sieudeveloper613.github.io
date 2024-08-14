import * as React from 'react';
import TextField from '../../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';

import useCommonStore from '../../useCommonStore';
import DataTable from '../../../../../../../common/DataTable';
import { Self } from '../..';

import styles from './CommonForm.module.scss';
import InputCertificate from '../../../../../../common/UserAccountPage/components/InputCertificate';
import Selection from '../../../../../../../common/Selection';
import IAddress from '../../../../../../../../sharetype/types/IAddress';
import Address from '../../../../../../../../utils/Address';
import InputPicture from '../../../../../../common/UserAccountPage/components/InputPicture';

interface ICommonFormProps { }

export default function CommonForm(props: ICommonFormProps) {
    const {
        displayForm,
        idUpdate,
        supppliesOptions,
        suppliesSelected,
        setSuppliesSelected,
        suppliersDataSheet,
        checkValidAll,
        inputSupplierName,
        setInputSupplierName,
        formData,
        setFormData,
        inputTaxCode,
        setInputTaxCode,
        inputGLN,
        setInputGLN,

        handlerBtnSaveClick,
        handlerBtnCloseClick,
        handlerBtnAddSupplierClick,
        handlerBtnRemoveSupplierClick,
    } = useCommonStore();

    const updateAddress = React.useMemo(() => {
        const addressKeys: (keyof IAddress)[] = ['city', 'district', 'ward', 'addressLine', 'lng', 'lat'];
        const result = {

            // ===========
        } as Record<keyof IAddress, (v: string | undefined) => void>;
        for (const key of addressKeys) {
            result[key] = (v: string | undefined) => {
                setFormData((preState: any) => {
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
                title={
                    Boolean(!idUpdate) //==
                        ? `Tạo mới thông tin ${Self.title}`
                        : `Chỉnh sửa thông tin ${Self.title}`
                }
                featch={featch}
                width='80vw'
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
                                title={`${Self.title}`}
                                validator={Self.validator.name}
                                invalidMessage='Mục này không được để trống'
                                value={inputSupplierName}
                                touched={true}
                                readonly={Boolean(idUpdate)}
                                // nonButton={1}
                                onChange={setInputSupplierName}
                            />
                        </li>
                        <li>
                            <InputPicture
                                // ==============
                                idUpdate={idUpdate}
                                picture={[]}
                                title='Hình ảnh'
                                displayForm={displayForm}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                markIsRequired
                                className={styles['text-field']}
                                title={`Mã số thuế`}
                                value={inputTaxCode}
                                validator={Self.validator.name}
                                readonly={Boolean(idUpdate)}
                                // nonButton={1}
                                invalidMessage='Bạn không được để trống mục này'
                                onChange={setInputTaxCode}
                            />
                        </li>
                        <li></li>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                className={styles['selection']}
                                title={'Loại vật tư'}
                                placeholder={'Nhập và chọn'}
                                value={suppliesSelected}
                                onChange={setSuppliesSelected}
                                options={supppliesOptions}
                                sortBy={1}
                                maxLength={5}
                                invalidMessage='Bạn không được để trống mục này'
                                buttons={buttonsOfInputSupplier}
                            />
                        </li>
                        <li>
                            <TextField
                                checkValidAll={checkValidAll}
                                className={styles['text-field']}
                                title={`GLN`}
                                validator={Self.validator.name}
                                value={inputGLN}
                                touched={true}
                                invalidMessage='Bạn không được để trống mục này'
                                // nonButton={1}
                                onChange={setInputGLN}
                            />
                        </li>
                        <li>
                            <DataTable
                                displayHeader={false}
                                data={suppliersDataSheet}
                                numberRowConfig='default'
                                maxHeight={5}
                                displayFooter={false}
                                headerCells={['Loại vật tư']}
                                displayButtons={{ remove: true }}
                                hideWhenDataIsEmpty
                                //
                                onButtonRemoveClick={handlerBtnRemoveSupplierClick}
                            />
                        </li>
                        <li className={styles['location']}>
                                <Selection
                                    checkValidAll={checkValidAll}
                                    className={styles['selection']}
                                    title='Địa chỉ'
                                    placeholder={'Chọn thành phố - tỉnh...'}
                                    options={Address.instance.getCityOptions()}
                                    value={formData.address?.city}
                                    maxLength={5}
                                    sortBy={1}
                                    validator={Self.validator.address.city}
                                    invalidMessage='Bạn không được để trống mục này'
                                    // =========
                                    onChange={updateAddress['city']}
                                />
                            <div>
                                <Selection
                                    checkValidAll={checkValidAll}
                                    title=''
                                    className={styles['selection']}
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
                                    validator={Self.validator.address.district}
                                    invalidMessage='Bạn không được để trống mục này'
                                    // ============
                                    onChange={updateAddress['district']}
                                />
                                <Selection
                                    checkValidAll={checkValidAll}
                                    className={styles['selection']}
                                    title=''
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
                                    validator={Self.validator.address.ward}
                                    invalidMessage='Bạn không được để trống mục này'
                                    // =========
                                    onChange={updateAddress['ward']}
                                />

                            </div>
                            <TextField
                                checkValidAll={checkValidAll}
                                className={styles['text-field']}
                                placeholder='Nhập địa chỉ, tên đường'
                                value={formData.address?.addressLine}
                                validator={Self.validator.address.addressLine}
                                invalidMessage='Tên đường không hợp lệ'
                                onChange={updateAddress['addressLine']}
                            />
                            <div>
                                <TextField
                                    checkValidAll={checkValidAll}
                                    // markIsRequired
                                    className={styles['text-field']}
                                    placeholder='Toạ độ LAT'
                                    value={formData.address?.lat}
                                    // validator={Self.validator.address.lat}
                                    invalidMessage='LAT không hợp lệ !'
                                    onChange={updateAddress['lat']}
                                />
                                <TextField
                                    checkValidAll={checkValidAll}
                                    // markIsRequired
                                    className={styles['text-field']}
                                    placeholder='Toạ độ LNG'
                                    value={formData.address?.lng}
                                    // validator={Self.validator.address.lng}
                                    invalidMessage='LNG không hợp lệ !'
                                    onChange={updateAddress['lng']}
                                />
                            </div>
                        </li>

                        <li>

                        </li>
                    </ul>
                </div >
            </WindowForm >
        </WindowFormContainer >
    );
}
