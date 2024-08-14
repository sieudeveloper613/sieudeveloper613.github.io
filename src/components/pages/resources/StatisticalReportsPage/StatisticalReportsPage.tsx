import * as React from 'react';
import ChartComponent from './components/ChartComponent';
import FilterChartInputData from './components/FilterChartInputData';
import FilterComponent from './components/FilterComponent';
import TableComponent from './components/TableComponent';
import style from './StatisticalReportsPage.module.scss';
import useStatisticalReportsStore from './useStatisticalReportsStore';

export interface IStatisticalReportsPageProps {}

function StatisticalReportsBasePage(props: IStatisticalReportsPageProps) {
    const {
        selectedProductType,
        showTable,
        selectedObjRole,
        selectedObj,
    } = useStatisticalReportsStore();
    let tableComponents;
    // switch (selectedProductType) {
    //     case 'nongsan':
    //         switch (selectedObjRole) {
    //             case 'Trang trại':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Thu hoạch (Nhập kho)'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Cơ sở chế biến':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng trước chế biến'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Nhập kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport4}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà phân phối':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Cửa hàng bán lẻ - Siêu thị':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà hàng kinh doanh':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Sản phẩm':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             headerCells={[
    //                                 'Vị trí',
    //                                 { groupBy: 'Nhập hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Nhập kho thành phẩm', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Xuất hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Tồn kho', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                             ]}
    //                             data={dataReport4}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //         }
    //         break;
    //     case 'sanphamtieudung':
    //         switch (selectedObjRole) {
    //             case 'Trang trại':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Thu hoạch (Nhập kho)'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Cơ sở chế biến':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng trước chế biến'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Nhập kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport4}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà phân phối':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Cửa hàng bán lẻ - Siêu thị':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà hàng kinh doanh':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà cung cấp nguyên liệu':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Sản phẩm':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             headerCells={[
    //                                 'Vị trí',
    //                                 { groupBy: 'Nhập hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Nhập kho thành phẩm', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Xuất hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Tồn kho', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                             ]}
    //                             data={dataReport4}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //         }
    //         break;
    //     case 'duocpham':
    //         switch (selectedObjRole) {
    //             case 'Trang trại':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Thu hoạch (Nhập kho)'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Cơ sở chế biến':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng trước chế biến'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Nhập kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng thành phẩm'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho thành phẩm'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport4}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Nhà phân phối':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Bệnh viện và nhà thuốc':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             title='Nhập hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport1}
    //                         />
    //                         <TableComponent
    //                             title='Tồn kho'
    //                             headerCells={['Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport2}
    //                             width='49%'
    //                         />
    //                         <TableComponent
    //                             title='Xuất hàng'
    //                             headerCells={['Tên đối tượng', 'Loại sản phẩm', 'Số lượng', 'Khối lượng (g)']}
    //                             data={dataReport3}
    //                             width='49%'
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //             case 'Sản phẩm':
    //                 tableComponents = (
    //                     <div className={style['product-reports']}>
    //                         <TableComponent
    //                             headerCells={[
    //                                 'Vị trí',
    //                                 { groupBy: 'Nhập hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Nhập kho thành phẩm', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Xuất hàng', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                                 { groupBy: 'Tồn kho', elements: ['Số lượng', 'Khối lượng (g)'] },
    //                             ]}
    //                             data={dataReport4}
    //                         />
    //                     </div>
    //                 );
    //                 break;
    //         }
    //         break;
        
    // }

    return (
        <div className={style['statistical-report-container']}>
            <h1>Báo cáo thống kê</h1>

            <hr />

            <FilterComponent />

            <hr />

            {showTable && tableComponents}

            {/* {selectedObj === 'sanpham' && (
                <div className={style['chart-container']}>
                    <h1>Biểu đồ thống kê</h1>
                    <FilterChartInputData />
                    <ChartComponent
                        data={chartData}
                        title='Biểu đồ xuất hàng theo tháng của sản phẩm'
                        xTitle='Thời gian'
                        yTitle='Số lượng'
                    />
                    <ChartComponent
                        data={chartDataBy}
                        title='Biểu đồ xuất hàng theo quý của sản phẩm'
                        xTitle='Thời gian'
                        yTitle='Số lượng'
                    />
                </div>
            )} */}
        </div>
    );
}

export default StatisticalReportsBasePage;
