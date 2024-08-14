import Selection from '../../../../../common/Selection';
import useStatisticalReportsStore from '../../useStatisticalReportsStore';
import styles from './FilterComponent.module.scss';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { EnterpriseRole } from '../../../../../../sharetype/TPermission';

const { RangePicker } = DatePicker;
type IFilterComponentProps = {};

export default function FilterComponent(props: IFilterComponentProps) {
    const {
        userRole,
        formalites,
        objectTypes,
        productCollection,

        selectedFormality,
        setSelectedFormality,
        selectedObjectType,
        setSelectedObjectType,
        selectedProduct,
        setSelectedProduct,

        buttons,
        nameButton,
        selectedObj,
        setSelectedObj,
        objNameList,
        btnChooseTimeClick,

        dates,
        setDates,

        selectedProductType,

        selectedObjName,
        setSelectedObjName,

    } = useStatisticalReportsStore();

    const btn = buttons.filter((item) => !item.value.startsWith('nam'));
    const dateArr = dates?.map((item) => dayjs(item, 'YYYY-MM-DD')) || [];

    let dataForObj;
    // switch (selectedProductType) {
    //     case 'nongsan':
    //         dataForObj = agriculturalData;
    //         break;
    //     case 'sanphamtieudung':
    //         dataForObj = customerProductData;
    //         break;
    //     case 'duocpham':
    //         dataForObj = medicineData;
    //         break;
    // }
    return (
        <div className={styles['filter-container']}>
            <div className={styles['time-container']}>
                <span>Thời gian:</span>
                {btn.map((item) => {
                    return (
                        <button
                            className={nameButton === item.value ? styles['active'] : ''}
                            onClick={() => btnChooseTimeClick(item)}
                            key={item.value}
                        >
                            {item.label}
                        </button>
                    );
                })}
                <div className={styles['day-select-input']}>
                    <RangePicker
                        locale={locale}
                        format={'DD-MM-YYYY'}
                        onChange={(values) => {
                            setDates(
                                values?.map((item) => {
                                    return dayjs(item).format('YYYY-MM-DD');
                                }),
                            );
                        }}
                        value={[dateArr[0], dateArr[1]]}
                    />
                </div>
                <button className={styles['btn-report']} onClick={() => {}}>
                    Xem báo cáo
                </button>
                <button className={styles['btn-export']}>Xuất file Excel</button>
            </div>
            <div className={styles['participant-container']}>
                <div className={styles['selection-container']}>
                    {
                        userRole === EnterpriseRole.enterprise && (
                            <>
                                <Selection
                                    className={styles['select-obj']}
                                    title='Hình thức'
                                    placeholder='Chọn hình thức'
                                    options={formalites}
                                    onChange={setSelectedFormality}
                                    value={selectedFormality}
                                />

                                {
                                    selectedFormality && (
                                        <Selection
                                            className={styles['select-obj']}
                                            title='Loại đối tượng'
                                            placeholder='Chọn đối tượng'
                                            options={objectTypes}
                                            onChange={setSelectedObjectType}
                                            value={selectedObjectType}
                                        />
                                    )
                                }
                            </>
                        )
                    }

                    {
                        selectedObjectType && (
                            <Selection
                                    className={styles['select-obj']}
                                    title='Loại sản phẩm'
                                    placeholder='Chọn sản phẩm'
                                    options={productCollection}
                                    onChange={setSelectedProduct}
                                    value={selectedProduct}
                                />
                        )
                    }
                    <Selection
                        className={styles['select-obj']}
                        title='Đối tượng:'
                        placeholder='Chọn đối tượng'
                        options={dataForObj}
                        onChange={setSelectedObj}
                        value={selectedObj}
                        maxLength={5}
                    />
                    {/* <Selection
                        className={styles['select-obj']}
                        title='Loại sản phẩm:'
                        placeholder='Chọn đối tượng'
                        options={data}
                        onChange={(v) => onChangeSelectProductType(v)}
                        value={selectedProductType}
                    />
                    <Selection
                        className={styles['select-obj']}
                        title='Đối tượng:'
                        placeholder='Chọn đối tượng'
                        options={dataForObj}
                        onChange={setSelectedObj}
                        value={selectedObj}
                        maxLength={5}
                    />
                    {selectedObj === 'sanpham' ? 
                    (
                        <Selection
                            className={styles['select-obj']}
                            title='Tên sản phẩm:'
                            placeholder='Chọn sản phẩm'
                            options={objNameList}
                            onChange={setSelectedObjName}
                            value={selectedObjName}
                            maxLength={5}
                        />
                    ) : (
                        <Selection
                            className={styles['select-obj']}
                            title='Tên đối tượng:'
                            placeholder='Chọn đối tượng'
                            options={objNameList}
                            onChange={setSelectedObjName}
                            value={selectedObjName}
                            maxLength={5}
                        />
                    )} */}
                </div>
            </div>
        </div>
    );
}
