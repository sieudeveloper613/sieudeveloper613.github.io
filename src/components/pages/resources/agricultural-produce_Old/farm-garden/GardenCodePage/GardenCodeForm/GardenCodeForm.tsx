import * as React from 'react';
import { gardenCodeValidate } from '..';
import GardenCodeFormData from '../../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';
import TextField from '../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../common/WindowFormContainer';
import useGardenCodeStore from '../useGardenCodeStore';
import styles from './GardenCodeForm.module.scss';
export interface IGardenCodeFormProps {}

export default function GardenCodeForm(props: IGardenCodeFormProps) {
    const {
        idUpdate,
        checkValidAll,
        formData,
        setFormData,
        displayForm,
        handlerBtnCloseClick,
        handlerBtnSaveClick,
        //==
    } = useGardenCodeStore();

    const updateFormData = React.useMemo(() => {
        const result = GardenCodeFormData.dataKeys.reduce((aggregate, k) => {
            aggregate[k] = (v: string) => {
                setFormData((preState) => {
                    const newState = {
                        ...preState,
                    };
                    newState[k] = v;
                    return newState;
                });
            };
            return aggregate;
        }, {} as Record<keyof GardenCodeFormData.IData, (v: string) => void>);

        return Object.freeze(result);
    }, [setFormData]);
    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm} key={'GardenCodeForm'}>
            <WindowForm
                featch={featch}
                title={
                    Boolean(!idUpdate)
                        ? 'Thêm mới thông tin khu vườn' //==
                        : 'Cập nhật thông tin khu vườn' //==
                }
                width='800px'
                height='400px'
                buttons={[
                    { label: 'X', onClick: handlerBtnCloseClick },
                    { label: 'Đóng', onClick: handlerBtnCloseClick },
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
                <div className={styles['container']}>
                    <TextField
                        checkValidAll={checkValidAll}
                        className={styles['text-field']}
                        title='Mã khu vườn'
                        validator={gardenCodeValidate.code}
                        invalidMessage='Mục này không được để trống !'
                        value={formData.code}
                        touched={true}
                        markIsRequired
                        //==
                        onChange={updateFormData['code']}
                    />
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
