import * as React from 'react';
import useStatisticalReportsStore from '../../useStatisticalReportsStore';
import styles from './FilterChartInputData.module.scss';
import dayjs from 'dayjs';
type IFilterChartInputDataProps = {};

export default function FilterChartInputData(props: IFilterChartInputDataProps) {
    const { buttons, nameButtonChart, btnChooseTimeChartClick, datesChart,setSelectedObjName, objNameList,selectedObjName } = useStatisticalReportsStore();
    const buttonTimes = buttons.filter((item) => item.value.startsWith('nam'));
    const [year, setYear] = React.useState<number>(dayjs().year());
    const onchangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const chooseYear = e.target.value
        setYear(Number(chooseYear))
        // setDatesChart([
        //     `${chooseYear}-${'01'}-${'01'}`,
        //     `${chooseYear}-${'12'}-${'31'}T23:59:00`,
        // ])
    };
    const onChangeSanPham = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productSelect = e.target.value
        setSelectedObjName(productSelect)
    };
    const yearOption = React.useMemo(()=>{
        const curYear = dayjs().year()
        const yearList = []
        for(let i=0 ; i<=23; i++){ // 23 <=> year history can have review
            const tmp = curYear - i
            yearList.push(tmp)
        }
        return yearList
    },[])
    return (
        <div className={styles['filter-chart-container']}>
            <span>Thời gian:</span>
            {buttonTimes.map((item) => {
                return (
                    <button
                        className={nameButtonChart === item.value ? styles['active'] : ''}
                        onClick={() => {
                            const curYear = dayjs().year()
                            if(item.value === 'namnay'){
                                setYear(curYear)
                            }else{
                                setYear(curYear -1)
                            }
                            btnChooseTimeChartClick(item)
                        }}
                        key={item.value}
                    >
                        {item.label}
                    </button>
                );
            })}
            <select className={styles['select']} onChange={onchangeYear} placeholder='Năm'>
                {yearOption.map((year)=>{
                    return (<option value={year}>{year}</option>)
                })}
            </select>
            <span>Loại sản phẩm: </span>
            <select className={styles['select']} placeholder='sản phẩm' onChange={(e) => onChangeSanPham(e)}>
                <option key={'undefined'} value={undefined}>{'Chọn sản phẩm'}</option>
                {objNameList.map((item)=>{
                    return (<option key={item.value} value={item.value}>{item.label}</option>)
                })}
                
            </select>
            <button className={styles['btn-view']} onClick={() => {}}>
                Xem
            </button>
        </div>
    );
}
