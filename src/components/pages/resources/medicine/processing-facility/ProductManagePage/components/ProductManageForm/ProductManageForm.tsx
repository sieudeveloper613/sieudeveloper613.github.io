import * as React from 'react';
import { Self } from '../..';
import Selection from '../../../../../../../common/Selection';

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useProductManageStore from '../../useProductManageStore';
import ListData from './ListData';
import styles from './ProductManageForm.module.scss';

type IProductManageFormProps = {};

function ProductManageForm(props: IProductManageFormProps) {
    const {
        displayForm,
        checkValidAll,
        idUpdate,
        productOptions,

        productSelected,
        setProductSelected,

        dateStart,
        setDateStart,

        dateEnd,
        setDateEnd,

        handlerBtnSaveClick,
        handlerBtnClose,
    } = useProductManageStore();

    const [featch, setFeatch] = React.useState(false);
    return (
        <WindowFormContainer display={displayForm}>
            <WindowForm
                featch={featch}
                title={
                    //==
                    !idUpdate //==
                        ? 'Thêm mới quản lý sản phẩm' //==
                        : 'Chỉnh sửa quản lý sản phẩm' //==
                }
                width='80vw'
                height={productSelected ? '600px' : '400px'}
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

                <div className={styles['form-container']}>
                    <ul>
                        <li className={styles['date-container']}>
                            <label htmlFor="date-start">Thời gian bắt đầu</label>
                            <input
                                type="datetime-local"
                                id="date-start"
                                name="date-start"
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                            />
                        </li>
                        <li className={styles['date-container']}>
                            <label htmlFor="date-end">Thời gian kết thúc</label>
                            <input
                                type="datetime-local"
                                id="date-end"
                                name="date-end"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Selection
                                checkValidAll={checkValidAll}
                                className={styles['selection']}
                                title={'Tên sản phẩm'}
                                placeholder={'Chọn tên sản phẩm'}
                                value={productSelected}
                                onChange={setProductSelected}
                                options={productOptions}
                                validator={Self.validatorContext.productSelection}
                                markIsRequired
                                invalidMessage='Tên sản phẩm không được để trống !'
                                sortBy={1}
                                maxLength={5}
                            />
                        </li>
                    </ul>
                    {
                        productSelected ? <ListData /> : null
                    }

                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}

export default ProductManageForm;