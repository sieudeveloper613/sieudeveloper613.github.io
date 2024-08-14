import AccessInfoManagePage from '../../../components/pages/resources/agricultural-produce/farm-garden/AccessInfoManage';
import FertilizersPage from '../../../components/pages/resources/agricultural-produce/farm-garden/FertilizersPage';
import GardenCodePage from '../../../components/pages/resources/agricultural-produce/farm-garden/GardenCodePage';
import PesticidesPage from '../../../components/pages/resources/agricultural-produce/farm-garden/PesticidesPage';
import PlantVarietiesPage from '../../../components/pages/resources/agricultural-produce/farm-garden/PlantVarietiesPage';
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import DistributionCenterPartticipantPage from '../../../components/pages/resources/participants/DistributionCenterParticipantsPage';
import ProcessingOrPackingParticipantPage from '../../../components/pages/resources/participants/ProcessingOrPackingFacilityPage';
import RestaurantParticipantPage from '../../../components/pages/resources/participants/RestaurantParticipantPage';
import RetailStoreParticipantPage from '../../../components/pages/resources/participants/RetailStoreParticipantPage';
import SupermarketParticipantPage from '../../../components/pages/resources/participants/SupermarketParticipantPage';
import PartnerPage from '../../../components/pages/resources/PartnerPage';
import FarmGardenStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/agricultural-produce/FarmGardenStatisticalReportsPage';
import DriverPage from '../../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../../components/pages/resources/transportation/VehiclePage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';

import { TNavigateItemConfig, TNavigationConfig } from '../Types';

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
        icon: images.navigationIcons.agricultureProduce,
        children: [
            {
                _id: generate.id(),
                slug: '/co-so-che-bien',
                icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
                title: 'Cơ sở chế biến',
                PageComponent: ProcessingOrPackingParticipantPage,
            },
            {
                _id: generate.id(),
                slug: '/nha-phan-phoi',
                title: 'Nhà phân phối',
                icon: images.navigationIcons.deliveriesPage,
                PageComponent: DistributionCenterPartticipantPage,
            },
            {
                _id: generate.id(),
                slug: '/cua-hang-ban-le',
                title: 'Cửa hàng bán lẻ',
                icon: images.navigationIcons.supermarketPage,
                PageComponent: RetailStoreParticipantPage,
            },
            {
                _id: generate.id(),
                slug: '/sieu-thi',
                title: 'Siêu thị',
                icon: images.navigationIcons.supermarketPage,
                PageComponent: SupermarketParticipantPage,
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
        slug: '/ma-khu-vuon',
        title: 'Mã khu vườn',
        icon: images.navigationIcons.GardenCodePage,
        PageComponent: GardenCodePage,
    },
    {
        _id: generate.id(),
        slug: '/loai-giong',
        title: 'Loại giống',
        icon: images.navigationIcons.PlantVarietiesPage,
        PageComponent: PlantVarietiesPage,
    },
    {
        _id: generate.id(),
        slug: '/loai-phan',
        title: 'Loại phân',
        icon: images.navigationIcons.FertilizersPage,
        PageComponent: FertilizersPage,
    },
    {
        _id: generate.id(),
        slug: '/thuoc-bao-ve-thuc-vat',
        title: 'Thuốc bảo vệ thực vật',
        icon: images.navigationIcons.PesticidesPage,
        PageComponent: PesticidesPage,
    },
    {
        _id: generate.id(),
        slug: '/quan-ly-thong-tin-truy-xuat',
        title: 'Quản lý thông tin truy xuất',
        icon: images.navigationIcons.retrieveProductInformation,
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
        PageComponent: FarmGardenStatisticalReportsPage,
    },
];

const farmGarden: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default farmGarden;
