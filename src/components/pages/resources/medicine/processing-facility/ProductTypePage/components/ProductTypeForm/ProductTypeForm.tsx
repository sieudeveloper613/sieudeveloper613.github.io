import * as React from 'react';
import { Self } from '../..';
import CommonForm from './CommonForm'

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useProductTypeStore from '../../useProductTypeStore';
import styles from './ProductTypeForm.module.scss';

type IPartnerFormProps = {};

function PartnerForm(props: IPartnerFormProps) {
    const {
        displayForm,
        handlerBtnClose,
        formType,
        setFormType
    } = useProductTypeStore();



    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                // title={
                //     //==
                //     !idUpdate //==
                //         ? 'Thêm mới đối tác' //==
                //         : 'Chỉnh sửa đối tác' //==
                // }
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
                ]}
            >
                <div className={styles['wp']}>
                    <div className={styles['item']}>
                        <button
                            className={styles['button']}
                            onClick={() => {
                                setFormType('DON')
                            }}
                        >
                            Sản phẩm
                        </button>
                    </div>
                    <div className={styles['item']}>
                        <button
                            className={styles['button']}
                            onClick={() => {
                                setFormType('HOP')
                            }}
                        >
                            Hộp
                        </button>
                    </div>
                    <div className={styles['item']}>
                        <button
                            className={styles['button']}
                            onClick={() => {
                                setFormType('THUNG')
                            }}
                        >
                            Thùng
                        </button>
                    </div>
                </div>
            </WindowForm>
            <CommonForm formType={formType} />
        </WindowFormContainer>
    );
}

export default PartnerForm;
