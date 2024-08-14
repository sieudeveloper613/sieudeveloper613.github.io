import * as React from 'react';
import { gardenCodeValidate } from '..';
import TextField from '../../../../../../common/TextField';
import WindowFormContainer, { WindowForm } from '../../../../../../common/WindowFormContainer';
import useGardenCodeStore from '../useGardenCodeStore';
import styles from './GardenCodeForm.module.scss';
import GardenFormData from '../../../../../../../sharetype/form-data/resources/enterprise/farm-garden/GardenFormData';
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
        const result = GardenFormData.dataKeys.reduce((aggregate, k) => {
            aggregate[k] = (v: string) => {
                setFormData((preState: any) => {
                    const newState = {
                        ...preState,
                    };
                    newState[k] = v;
                    return newState;
                });
            };
            return aggregate;
        }, {} as Record<keyof GardenFormData.ICreate, (v: string) => void>);

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
                        validator={gardenCodeValidate.gardenCode}
                        invalidMessage='Mục này không được để trống !'
                        value={formData.gardenCode}
                        readonly={Boolean(idUpdate)}
                        touched={true}
                        markIsRequired
                        //==
                        onChange={updateFormData['gardenCode']}
                    />

                    <TextField
                        checkValidAll={checkValidAll}
                        className={styles['text-field']}
                        title='Tên khu vườn'
                        validator={gardenCodeValidate.gardenName}
                        invalidMessage='Mục này không được để trống !'
                        value={formData.gardenName}
                        touched={true}
                        markIsRequired
                        //==
                        onChange={updateFormData['gardenName']}
                    />
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
