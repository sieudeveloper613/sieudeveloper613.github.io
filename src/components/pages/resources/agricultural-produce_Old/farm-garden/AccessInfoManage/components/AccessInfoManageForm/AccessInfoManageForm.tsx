import React from 'react';

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import ListData from '../ListData/index';
import useAccessInfoManageStore from '../../useAccessInfoManageStore';
import generate from '../../../../../../../../utils/generate';

interface IAccessInfoManageFormProps {}

export default function AccessInfoManageForm(props: IAccessInfoManageFormProps) {
    const { displayForm, setDisplayForm, setDataInput, handleButtonSaveClick } = useAccessInfoManageStore();
    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title='Thông tin nguyên liệu'
                width='1000px'
                height='600px'
                buttons={[
                    {
                        label: 'X',
                        onClick: () => {
                            setDisplayForm(false);
                        },
                    },
                    {
                        label: 'Lưu',
                        onClick: () => {
                            setFeatch(true);
                            handleButtonSaveClick();
                            setTimeout(() => {
                                setFeatch(false);
                            }, 4000);
                        },
                    },
                    {
                        label: 'Thêm mới',
                        onClick: () => {
                            setDataInput((prev) => [...prev, [generate.id(), '', '']]);
                        },
                    },
                ]}
            >
                <ListData />
            </WindowForm>
        </WindowFormContainer>
    );
}
