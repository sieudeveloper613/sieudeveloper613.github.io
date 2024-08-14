import * as React from 'react';
import WindowFormContainer,{WindowForm} from '../../../../../common/WindowFormContainer';
import useStatisticalReportsStore from '../../useStatisticalReportsStore';
import styles from './FormDetail.module.scss';
import { IDetailIngredient } from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenDetailResponse/GardenDetailResponse';
import moment from 'moment';

export interface ICFormDetailProps { }
export default function FormDetail(props: ICFormDetailProps) {
    const {
        //==
        dataDetail,
        setDataDetail,
    } = useStatisticalReportsStore();

    const handlerBtnCloseClick = React.useCallback(() => {
        setDataDetail(undefined);
    }, [setDataDetail]);
    const ItemDetail = ({item,index}:{item:IDetailIngredient,index:number}) =>{
                return (<div className={styles['item']}>
                                <h4>{`Lần ${index + 1}: ${moment(item.date).format('DD/MM/YYYY')}`}</h4>
                                <div style={{display:'flex',marginTop:'2px'}}>
                                    <div className={styles['info']}>
                                        {item.name}
                                    </div>
                                    <div className={styles['info']}>
                                        {item.supplierName}
                                    </div>
                                </div>
                            </div>)
    }
    return (
        <WindowFormContainer
            display={Boolean(dataDetail)}
        //==
        >
            <WindowForm
                width='900px'
                buttons={[
                    {
                        label: 'Đóng'.toLocaleUpperCase(),
                        width: '50px',
                        fontFamily: 'Arial',
                        onClick: handlerBtnCloseClick,
                    }
                ]}
                title='CHI TIẾT QUY TRÌNH GIEO TRỒNG'
                backgroundColor='#ffffff'
                footer
                height='auto'
            >
                <div className={styles['garden-detail-container']}>
                    <div className={styles['wrapper1']}>
                        <h3>{`Bón phân`}</h3>
                        <div className={styles['content']}>
                            {dataDetail?.fertilizers.map((item,index)=>{
                                return <ItemDetail key={`${index}bonphan`} item={item} index={index} />
                            })}
                        </div>
                    </div>
                    <div className={styles['wrapper']}>
                        <h3>{`Phun thuốc`}</h3>
                        <div className={styles['content']}>
                            {dataDetail?.pesticides.map((item,index)=>{
                                return <ItemDetail key={`${index}phunthuoc`} item={item} index={index}/>
                            })}
                        </div>
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
