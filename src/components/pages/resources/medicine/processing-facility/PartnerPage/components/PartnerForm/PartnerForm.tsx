import * as React from 'react';
import { Self } from '../..';
import Selection from '../../../../../../../common/Selection';

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import usePartnerStore from '../../usePartnerStore';
import styles from './PartnerForm.module.scss';

type IPartnerFormProps = {};

function PartnerForm(props: IPartnerFormProps) {
    const {
        displayForm,
        checkValidAll,
        partnerOptions,
        idUpdate,

        partnerSelected,
        setPartnerSelected,

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
                        title={'Đối tác'}
                        placeholder={'Nhập và chọn'}
                        value={partnerSelected}
                        onChange={setPartnerSelected}
                        options={partnerOptions}
                        validator={Self.validatorContext.partnerSelection}
                        markIsRequired
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
