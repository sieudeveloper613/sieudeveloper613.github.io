import wholesaleMarkets from '../../../api/agriculturalProduce/wholesale-markets';
import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import NameProductPage from '../../../components/pages/resources/agricultural-produce/wholesale-markets/NameProduct';
import DistributionCenterParticipantsPage from '../../../components/pages/resources/participants/DistributionCenterParticipantsPage';
import RestaurantParticipantPage from '../../../components/pages/resources/participants/RestaurantParticipantPage';
import RetailStoreParticipantPage from '../../../components/pages/resources/participants/RetailStoreParticipantPage';
import PartnerPage from '../../../components/pages/resources/PartnerPage';
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import StatisticalReportsPage from '../../../components/pages/resources/StatisticalReportsPage';
import DriverPage from '../../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../../components/pages/resources/transportation/VehiclePage';
import AccessInfoManagePage from '../../../components/pages/resources/agricultural-produce/farm-garden/AccessInfoManage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';
import ProcessingFacilityStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/agricultural-produce/ProcessingFacilityStatisticalReportsPage';

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
    {
        _id: generate.id(),
        slug: '/doi-tuong-tham-gia',
        title: 'Đối tượng tham gia',
        icon: images.navigationIcons.Participants,
        children: [
            {
                _id: generate.id(),
                slug: '/nha-phan-phoi',
                title: 'Nhà phân phối',
                icon: images.navigationIcons.deliveriesPage,
                PageComponent: DistributionCenterParticipantsPage,
            },
            {
                _id: generate.id(),
                slug: '/cua-hang-ban-le',
                title: 'Cửa hàng bán lẻ',
                icon: images.navigationIcons.delaerPage,
                PageComponent: RetailStoreParticipantPage,
            },
            {
                _id: generate.id(),
                slug: '/nha-hang',
                title: 'Nhà hàng',
                icon: images.navigationIcons.restaurantPage,
                PageComponent: RestaurantParticipantPage,
            },
        ],
    },
    {
        _id: generate.id(),
        slug: '/quan-li-thong-tin-truy-xuat',
        title: 'Quản lý thông tin truy xuất',
        icon: images.navigationIcons.ChainInformation,
        PageComponent: AccessInfoManagePage,
    },
    {
        _id: generate.id(),
        slug: '/van-chuyen',
        title: 'Vận chuyển',
        icon: images.navigationIcons.TransportPage,
        children: [
            {
                _id: generate.id(),
                slug: '/xe',
                title: 'Xe',
                icon: images.navigationIcons.car,
                PageComponent: VehiclePage,
            },
            {
                _id: generate.id(),
                slug: '/tai-xe',
                icon: images.navigationIcons.driverPage,
                title: 'Tài xế',
                PageComponent: DriverPage,
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
        PageComponent: ProcessingFacilityStatisticalReportsPage,
    },
];

const processingFacility: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default processingFacility;
