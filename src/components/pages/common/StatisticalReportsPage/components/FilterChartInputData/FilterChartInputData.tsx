import * as React from 'react';
import useStatisticalReportsStore from '../../useStatisticalReportsStore';
import Selection from '../../../../../common/Selection';
import styles from './FilterChartInputData.module.scss';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Audio } from  'react-loader-spinner'
const { RangePicker } = DatePicker;
type IFilterChartInputDataProps = {};

export default function FilterChartInputData(props: IFilterChartInputDataProps) {
    const {
        buttons,
        nameButton,
        btnChooseTimeClick,
        viewChartClick,
        dates,
        loadingChart,
        setDates,
        datesForChart,
        setDatesForChart,
        sanPham,
        selectedProductForChart,
        setSelectedProductForChart,
        yearsForChart,
        selectedYearForChart,
        setSelectedYearForChart,

    } = useStatisticalReportsStore();
    const buttonTimes = buttons.filter((item) => item.value.startsWith('nam'));
    const [year, setYear] = React.useState<string | undefined>();
    // const dateArr = datesForChart?.map(item => dayjs(item, 'YYYY-MM-DD')) || []
    const dateArr = dates?.map((item) => dayjs(item, 'YYYY-MM-DD')) || [];
    const onchangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value);
    };

    // const viewBtnClick = () => {
    //     console.log('====================================');
    //     console.log(year, sanpham);
    //     console.log('====================================');
    // };

    return (
        <div className={styles['filter-chart-container']}>
            <span>Thời gian:</span>
            {buttonTimes.map((item) => {
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
            <div className={styles['year-select-input']}>
                <Selection
                    className={styles['select-obj']}
                    placeholder='Chọn năm'
                    options={yearsForChart}
                    onChange={setSelectedYearForChart}
                    value={selectedYearForChart}
                />
            </div>
            {/* <div className={styles['day-select-input']}>
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
            </div> */}
            <span>Loại sản phẩm: </span>
            <div className={styles['product-select-input']}>
                <Selection
                    className={styles['select-obj']}
                    placeholder='Chọn đối tượng'
                    options={sanPham}
                    onChange={setSelectedProductForChart}
                    value={selectedProductForChart}
                />
            </div>
            {loadingChart ? <button disabled style={{backgroundColor: 'blue',padding:3,cursor:'unset'}} >
                <Audio
                    height="23.5"
                    width="62"
                    color="#4fa94d"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                />
            </button> :
            <button className={styles['btn-view']} onClick={viewChartClick}>
                Xem
            </button>
            }
            
            
        </div>
    );
}
