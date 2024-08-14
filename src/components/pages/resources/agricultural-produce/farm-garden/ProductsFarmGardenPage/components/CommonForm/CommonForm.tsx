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
        productOptions,
        productSelected,
        setProductSelected,
        suppliersDataSheet,
        checkValidAll,
        formData,
        setFormData,

        handlerBtnSaveClick,
        handlerBtnCloseClick,
        handlerBtnAddSupplierClick,
        handlerBtnRemoveSupplierClick,
    } = useCommonStore();
    console.log(productSelected, 'piupiu');
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
                            <Selection
                                checkValidAll={checkValidAll}
                                className={styles['selection']}
                                title={'Tên sản phẩm'}
                                placeholder={'Nhập và chọn'}
                                value={productSelected}
                                onChange={setProductSelected}
                                options={productOptions}
                                readonly={Boolean(idUpdate)}
                                sortBy={1}
                                maxLength={5}
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
                                buttons={buttonsOfInputSupplier}
                            />
                        </li>
                        <li />
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
                    </ul>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
