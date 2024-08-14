import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import DistributionCenterPageParticipants from '../../../components/pages/resources/medicine/processing-facility/Participants/DistributionCenterParticipantsPage';
import HospitalPage from '../../../components/pages/resources/medicine/processing-facility/Participants/HospitalPage'
import DrugStorePage from '../../../components/pages/resources/medicine/processing-facility/Participants/DrugStorePage';
import MaterialsPage from '../../../components/pages/resources/medicine/processing-facility/MaterialsPage'
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import DriverPage from '../../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../../components/pages/resources/transportation/VehiclePage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';
import TraceabilityPartnerPage from '../../../components/pages/resources/medicine/processing-facility/TraceabilityPartnerPage';
import ProductTypePage from '../../../components/pages/resources/medicine/processing-facility/ProductTypePage';
import ProductManagePage from '../../../components/pages/resources/medicine/processing-facility/ProductManagePage';
import AccessInfoManagePage from '../../../components/pages/resources/medicine/processing-facility/AccessInfoManage';
import ProcessingFacilityStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/medicine/ProcessingFacilityStatisticalReportsPage';
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
        slug: '/doi-tac-txng',
        title: 'Đối tác TXNG',
        icon: images.navigationIcons.PartnerPage,
        PageComponent: TraceabilityPartnerPage,
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
                PageComponent: DistributionCenterPageParticipants,
            },
            {
                _id: generate.id(),
                slug: '/benh-vien',
                title: 'Bệnh viện',
                icon: images.navigationIcons.hospital,
                PageComponent: HospitalPage,
            },
            {
                _id: generate.id(),
                slug: '/nha-thuoc',
                title: 'Nhà thuốc',
                icon: images.navigationIcons.DrupStorePage,
                PageComponent: DrugStorePage,
            },
        ],
    },
    {
        _id: generate.id(),
        slug: '/loai-san-pham',
        title: 'Loại sản phẩm',
        icon: images.navigationIcons.productType,
        PageComponent: ProductTypePage,
    },
    {
        _id: generate.id(),
        slug: '/nguyen-lieu',
        title: 'Nguyên liệu',
        icon: images.navigationIcons.ingredient,
        PageComponent: MaterialsPage,
    },
    {
        _id: generate.id(),
        slug: '/quan-ly-san-pham',
        title: 'Quản lý sản phẩm',
        icon: images.navigationIcons.productManagement,
        PageComponent: ProductManagePage,
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