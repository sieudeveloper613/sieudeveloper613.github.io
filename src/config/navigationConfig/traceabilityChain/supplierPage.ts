import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import RestaurantParticipantPage from '../../../components/pages/resources/participants/RestaurantParticipantPage';
import RetailStoreParticipantPage from '../../../components/pages/resources/participants/RetailStoreParticipantPage';
import PartnerPage from '../../../components/pages/resources/PartnerPage';
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import StatisticalReportsPage from '../../../components/pages/resources/StatisticalReportsPage';
import DriverPage from '../../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../../components/pages/resources/transportation/VehiclePage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';
import DistributionCenterStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/agricultural-produce/DistributionCenterStatisticalReportsPage';

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
        title: 'Đối tượng tham gia ',
        icon: images.navigationIcons.Participants,
        children: [
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
        PageComponent: NotFoundPage,
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
                icon: images.navigationIcons.TransportPage,
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
        PageComponent: DistributionCenterStatisticalReportsPage,
    },
];

const supplierPage: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default supplierPage;
