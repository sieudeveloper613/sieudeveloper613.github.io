import * as React from 'react';
import { Self } from '../..';
import Selection from '../../../../../common/Selection';

import WindowFormContainer, { WindowForm } from '../../../../../common/WindowFormContainer';
import usePartnerStore from '../../usePartnerStore';
import styles from './PartnerForm.module.scss';

type IPartnerFormProps = {};

function PartnerForm(props: IPartnerFormProps) {
    const {
        displayForm,
        enterpriseOptions,
                modelOptions,
                objectTypeOptions,
                objectNameOptions,
        idUpdate,
        checkValidAll,

        enterpriseSelected,
        setEnterpriseSelected,

        modelSelected,
        setModelSelected,

        objectTypeSelected,
        setObjectTypeSelected,

        objectNameSelected,
        setObjectNameSelected,


        handlerBtnSaveClick,
        handlerBtnClose,
    } = usePartnerStore();

    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={
                    //==
                    !idUpdate //==
                        ? 'Thêm mới đối tác' //==
                        : 'Chỉnh sửa đối tác' //==
                }
                width='80vw'
                height='400px'
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
                <div className={styles['wp']}>
                    <Selection
                        checkValidAll={checkValidAll}
                        className={styles['selection']}
                        title={'Tên doanh nghiệp'}
                        placeholder={'Nhập và chọn'}
                        value={enterpriseSelected}
                        onChange={setEnterpriseSelected}
                        options={enterpriseOptions}
                        validator={Self.validatorContext.partnerGroupSelection}
                        markIsRequired
                        invalidMessage='Mục này không được để trống !'
                        sortBy={1}
                        maxLength={5}
                    />
                    <Selection
                        checkValidAll={checkValidAll}
                        markIsRequired
                        className={styles['selection']}
                        title={'Mô hình'}
                        placeholder={
                            //==
                            Boolean(!enterpriseSelected) //==
                                ? 'Bạn cần chọn "Tên doanh nghiệp" trước rồi chọn mục này !'
                                : 'Nhập và chọn' //==
                        }
                        readonly={Boolean(!enterpriseSelected)}
                        value={modelSelected}
                        onChange={setModelSelected}
                        options={modelOptions}
                        validator={Self.validatorContext.partnerSelection}
                        invalidMessage='Mục này không được để trống !'
                        sortBy={1}
                        maxLength={5}
                    />
                     <Selection
                        checkValidAll={checkValidAll}
                        markIsRequired
                        className={styles['selection']}
                        title={'Loại đối tượng'}
                        placeholder={
                            //==
                            Boolean(!modelSelected) //==
                                ? 'Bạn cần chọn "Mô hình" trước rồi chọn mục này !'
                                : 'Nhập và chọn' //==
                        }
                        readonly={Boolean(!modelSelected)}
                        value={objectTypeSelected}
                        onChange={setObjectTypeSelected}
                        options={objectTypeOptions}
                        validator={Self.validatorContext.partnerSelection}
                        invalidMessage='Mục này không được để trống !'
                        sortBy={1}
                        maxLength={5}
                    />
                     <Selection
                        checkValidAll={checkValidAll}
                        markIsRequired
                        className={styles['selection']}
                        title={'Tên đối tượng'}
                        placeholder={
                            //==
                            Boolean(!objectTypeSelected) //==
                                ? 'Bạn cần chọn "Loại đối tượng" trước rồi chọn mục này !'
                                : 'Nhập và chọn' //==
                        }
                        readonly={Boolean(!objectTypeSelected)}
                        value={objectNameSelected}
                        onChange={setObjectNameSelected}
                        options={objectNameOptions}
                        validator={Self.validatorContext.partnerSelection}
                        invalidMessage='Mục này không được để trống !'
                        sortBy={1}
                        maxLength={5}
                    />
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}

export default PartnerForm;
