import * as React from 'react';
import FilterComponent from './components/FilterComponent';
import style from './ProvincePage.module.scss';
import useProvincePageStore from './useProvincePageStore';
import DataTable from '../../../../../common/DataTable';
import ProvinceForm from './components/ProvinceForm';
import { ThreeDots } from 'react-loader-spinner';
export interface IProvincePageProps {}

function ProvinceBasePage(props: IProvincePageProps) {
    const {
        dataTableCity,
        dataTableDistrict,
        dataTableWard,
        resCity,
        resDistrict,
        resWard,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
    } = useProvincePageStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const dataSheet = dataTableCity ? dataTableCity : dataTableDistrict ? dataTableDistrict : (dataTableWard || [])
    const resData = resCity || resDistrict || resWard
    React.useEffect(() => {
        if (!!dataSheet && dataSheet.length) {
            setIsLoading(false);
        } else if (dataSheet.length === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else setIsLoading(true);
    }, [dataSheet]);
    React.useEffect(() => {
        if (!!resData) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [resData]);
    let tableComponents = (
        <div className={style['product-reports']}>
            <DataTable
                title='Đơn vị hành chính'
                headerCells={['Mã', `Tên ${dataTableCity ? 'Tỉnh - Thành phố' : dataTableDistrict ? 'Quận - Huyện': 'Xã - Phường'}`, 'Cấp']}
                columnWidth={['maxWidth:80px', 'maxWidth:200px', 'maxWidth:100px']}
                data={dataSheet}
                minWidth='1000px'
                rowHeight={'40px'}
                displayButtons={{
                    update: true,
                    remove: true,
                }}
                displayFooter = {false}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
            />
            {isLoading && (
                <div
                    style={{
                        display:'flex',
                        zIndex:1,
                        backgroundColor: '#eee',
                        opacity:0.9,
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%)',
                        width:'100%',
                        height:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:'2px',
                        boxShadow: '-2px -2px 8px 3px #eee'
                        
                    }}
                >
                    <ThreeDots
                        height='60'
                        width='60'
                        radius='9'
                        color='#0847e3'
                        ariaLabel='three-dots-loading'
                        visible={true}
                    />
                </div>
            )}
        </div>
    );
   
    return (
        <div className={style['statistical-report-container']}>
            <FilterComponent />
            <hr />
            { tableComponents}
            <ProvinceForm/>
        </div>
    );
}

export default ProvinceBasePage;
