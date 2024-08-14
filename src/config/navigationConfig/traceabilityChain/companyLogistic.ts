import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import NameProductPage from '../../../components/pages/resources/agricultural-produce/wholesale-markets/NameProduct';
import DistributionCenterPageParticipants from '../../../components/pages/resources/customer-products/processing-facility/Participants/DistributionCenterParticipantsPage';
import RetailStoreParticipantPage from '../../../components/pages/resources/customer-products/processing-facility/Participants/RetailStoreParticipantPage'
import RestaurantParticipantPage from '../../../components/pages/resources/customer-products/processing-facility/Participants/RestaurantParticipantPage';
import MaterialsPage from '../../../components/pages/resources/customer-products/processing-facility/MaterialsPage'

import PartnerPage from '../../../components/pages/resources/PartnerPage';
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import StatisticalReportsPage from '../../../components/pages/resources/StatisticalReportsPage';
import DriverPage from '../../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../../components/pages/resources/transportation/VehiclePage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';
import FarmGardenPage from '../../../components/pages/resources/customer/FarmGardenPage';
import TraceabilityPartnerPage from '../../../components/pages/resources/customer-products/processing-facility/TraceabilityPartnerPage';
import DistributionCenterPage from '../../../components/pages/resources/master/traceability-chain/DistributionCenterPage';
import ProductTypePage from '../../../components/pages/resources/customer-products/processing-facility/ProductTypePage';
import ProductManagePage from '../../../components/pages/resources/customer-products/processing-facility/ProductManagePage';
import AccessInfoManagePage from '../../../components/pages/resources/customer-products/processing-facility/AccessInfoManage';
// import WarehousePage from '../../../components/pages/resources/transportation/WarehousePage';
import CompanyLogisticStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/CompanyLogisticStatisticalReportsPage';

const children: TNavigateItemConfig[] = [
    {
        _id: generate.id(),
        slug: '/quan-tri-du-lieu',
        title: 'Quản trị dữ liệu',
        icon: images.navigationIcons.dataManagement,
        PageComponent: DataManagementPage,
    },
    {
        _id: generate.id(),
        slug: '/doi-tac',
        title: 'Đối tác',
        icon: images.navigationIcons.PartnerPage,
        PageComponent: PartnerPage,
    },
    // {
    //     _id: generate.id(),
    //     slug: '/kho-hang',
    //     title: 'Kho hàng',
    //     icon: images.navigationIcons.wholesaleMarketPage,
    //     PageComponent: WarehousePage,
    // },
    {
        _id: generate.id(),
        slug: '/van-chuyen',
        title: 'Vận chuyển',
        icon: images.navigationIcons.TransportPage,
        children: [
            {
                _id: generate.id(),
                slug: '/tai-xe',
                icon: images.navigationIcons.driverPage,
                title: 'Tài xế',
                PageComponent: DriverPage,
            },
            {
                _id: generate.id(),
                slug: '/xe',
                title: 'Xe',
                icon: images.navigationIcons.TransportPage,
                PageComponent: VehiclePage,
            },
        ],
    },
    {
        _id: generate.id(),
        slug: '/ban-do-phan-phoi',
        title: 'Bản đồ phân phối',
        icon: images.navigationIcons.MapDistributionCenter,
        PageComponent: MapDistributionCenterPage,
    },
    {
        _id: generate.id(),
        slug: '/bao-cao-thong-ke',
        title: 'Báo cáo thống kê',
        icon: images.navigationIcons.StatisticalReports,
        PageComponent: CompanyLogisticStatisticalReportsPage,
    },
];

const companyLogistic: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default companyLogistic;