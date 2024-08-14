import * as React from 'react';
import { Self } from '../..';
import Selection from '../../../../../../../common/Selection';

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useTraceabilityPartnerStore from '../../useTraceabilityPartnerStore';
import styles from './TraceabilityPartnerForm.module.scss';

type ITraceabilityPartnerFormProps = {};

function TraceabilityPartnerForm(props: ITraceabilityPartnerFormProps) {
    const {
        displayForm,
        checkValidAll,
        partnerGroupOptions,
        partnerOptions,
        idUpdate,

        partnerGroupIdSelected,
        setPartnerGroupIdSelected,

        userIdOfPartnerSelected,
        setUserIdOfPartnerSelected,

        handlerBtnSaveClick,
        handlerBtnClose,
    } = useTraceabilityPartnerStore();

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
                        title={'Đối tác tham gia'}
                        placeholder={'Nhập và chọn'}
                        value={partnerGroupIdSelected}
                        onChange={setPartnerGroupIdSelected}
                        options={partnerGroupOptions}
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
                        title={'Tên đối tác'}
                        placeholder={
                            //==
                            Boolean(!partnerGroupIdSelected) //==
                                ? 'Bạn cần chọn "Đối tác tham gia" trước rồi chọn mục này !'
                                : 'Nhập và chọn' //==
                        }
                        readonly={Boolean(!partnerGroupIdSelected)}
                        value={userIdOfPartnerSelected}
                        onChange={setUserIdOfPartnerSelected}
                        options={partnerOptions}
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

export default TraceabilityPartnerForm;
