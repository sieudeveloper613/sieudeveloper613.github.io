import * as React from 'react';
import { Self } from '.';
import DataTable from '../../../../../common/DataTable';
import Selection from '../../../../../common/Selection';
import WindowFormContainer, { WindowForm } from '../../../../../common/WindowFormContainer';
import useUserAccountStore from '../../useUserAccountStore';
import styles from './PartnerForm.module.scss';
import usePartnerFormStore from './usePartnerFormStore';
import { EnterpriseRole } from '../../../../../../sharetype/TPermission';

export interface IPartnerFormProps {}

export default function PartnerForm(props: IPartnerFormProps) {
    const { displayFormView, setDisplayFormView } = useUserAccountStore();
    const {
        permission,
        typePartner,
        resources,
        setTypePartner,
        partnerGroupSelected,
        setPartnerGroupSelected,
        dataPartnerSheet,
        dataParticipantSheet,
    } = usePartnerFormStore();
    const onBtnCloseClick = () => {
        setTypePartner(undefined);
        setDisplayFormView(false);
    };
    const data = typePartner === Self.KEY_SELECT.partner ? dataPartnerSheet : dataParticipantSheet;
    // const typeSelected = 
    let headerAndColum = {
        header:['Tên đối tượng','Loại đối tượng','Hình thức','Email','GLN'],
        column:['minWidth:180px', 'minWidth:180px', 'minWidth:180px', 'minWidth:180px','minWidth:150px']
    }
    if(permission && permission.role != EnterpriseRole.enterprise){
        headerAndColum = {
            header:['Tên đối tượng','Loại đối tượng','Hình thức','Email','GLN'],
            column:['minWidth:180px', 'minWidth:180px', 'minWidth:180px', 'minWidth:180px','minWidth:150px']
        }
    }
    return (
        <WindowFormContainer display={displayFormView}>
            <WindowForm
                title={Self.title}
                width='90vw'
                height='90vh'
                buttons={[
                    {
                        label: 'x',
                        onClick: onBtnCloseClick,
                    },
                    {
                        label: 'Đóng',
                        onClick: onBtnCloseClick,
                    },
                ]}
            >
                <div className={styles['container']}>
                    <div className={styles['selection-container']}>
                        <Selection

                            options={Self.typeOptions}
                            placeholder={'Nhập và chọn'}
                            invalidColor={'red'}
                            title='Loại'
                            onChange={setTypePartner}
                            value={typePartner}
                            validator={Self.validatorContext.partnerGroupSelection}
                            invalidMessage='Mục này không được bỏ trống'
                            className={styles['selection']}
                        />
                        {typePartner === Self.KEY_SELECT.participant && (
                            <Selection
                                options={resources==='enterprise'? Self.roleEnterprise: Self.roleOptions}
                                placeholder={
                                    Boolean(!typePartner) //==
                                        ? 'Bạn cần chọn "Loại" trước rồi chọn mục này !'
                                        : 'Nhập và chọn' //==
                                }
                                invalidColor={'red'}
                                title='Nhóm đối tượng'
                                readonly={Boolean(!typePartner)}
                                onChange={setPartnerGroupSelected}
                                value={partnerGroupSelected}
                                validator={Self.validatorContext.partnerGroupSelection}
                                invalidMessage='Mục này không được bỏ trống'
                                className={styles['selection']}
                            />
                        )}
                    </div>
                    <div className={styles['table-data']}>
                        <DataTable
                            displayFooter={false}
                            displayHeader={false}
                            headerCells={(typePartner === Self.KEY_SELECT.partner) || !typePartner ?['Tên', 'Địa chỉ', 'Số điện thoại', 'Email']:headerAndColum.header}
                            data={data}
                            columnWidth={headerAndColum.column}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
