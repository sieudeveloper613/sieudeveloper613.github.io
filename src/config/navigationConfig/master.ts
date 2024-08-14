// import DistributionCenterPage from '../../components/pages/resources/master/agricultural-produce/DistributionCenterPage';
import FarmGarden from '../../components/pages/resources/master/agricultural-produce/FarmGardenPage';
import ProcessingOrPackingFacilityPage from '../../components/pages/resources/master/agricultural-produce/ProcessingOrPackingFacilityPage';
import TestMessageBoxPage from '../../components/pages/TestMessageBoxPage';
import RawMaterialSupplierPage from '../../components/pages/resources/master/traceability-chain/RawMaterialSupplierPage';
import DefaultLayout from '../../layout/DefaultLayout';
import images from '../../resources/images';
import generate from '../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from './Types';
import RestaurantPage from '../../components/pages/resources/customer/agricultural-produce/RestaurantPage';
import SupermarketPage from '../../components/pages/resources/master/agricultural-produce/SupermarketPage';
import StorehousePage from '../../components/pages/resources/master/transportation-system/Storehouse';
import MapDistributionCenterPage from '../../components/pages/resources/MapDistributionCenter';
import ProcessingFacilityPage from '../../components/pages/resources/master/customer-products/ProcessingFacilityPage';
import StatisticalReportsPage from '../../components/pages/resources/StatisticalReportsPage';
import FoodProcessingFacilityPage from '../../components/pages/resources/master/meat-produce/FoodProcessingFacilityPage';
import FeedProcessingFacilityPage from '../../components/pages/resources/master/meat-produce/FeedProcessingFacilityPage';
import ProcessingOrPackingFacilityPageMeat from '../../components/pages/resources/master/meat-produce/ProcessingOrPackingFacilityPage';
import SlaughterProcessingFacilityPage from '../../components/pages/resources/master/meat-produce/SlaughterProcessingFacilityPage';
import CatchFacilityPage from '../../components/pages/resources/master/fisheries/CatchFacilityPage';
import PortFacilityPage from '../../components/pages/resources/master/fisheries/PortFacilityPage';
import ProcessingOrPackingFacilityPageCatch from '../../components/pages/resources/master/fisheries/ProcessingOrPackingFacilityPage';
import FoodProcessingFacilityPageMolluscs from '../../components/pages/resources/master/molluscs/FoodProcessingFacilityPage';
import FeedProcessingFacilityPageMolluscs from '../../components/pages/resources/master/molluscs/FeedProcessingFacilityPage';
import ProcessingOrPackingFacilityPageMolluscs from '../../components/pages/resources/master/molluscs/ProcessingOrPackingFacilityPage';
import WholesaleMarketPage from '../../components/pages/resources/master/traceability-chain/WholesaleMarketPage';
import DealerPage from '../../components/pages/resources/master/traceability-chain/DealerPage';
import HospitalPage from '../../components/pages/resources/master/traceability-chain/HospitalPage';
import DrugStorePage from '../../components/pages/resources/master/traceability-chain/DrugStorePage';
import LogisticsPage from '../../components/pages/resources/master/traceability-chain/LogisticsPage';
import SupplierPage from '../../components/pages/resources/master/traceability-chain/SupplierPage';
import DistributionCenterPage from '../../components/pages/resources/master/traceability-chain/DistributionCenterPage';
import DataManagementPage from '../../components/pages/resources/DataManagementPage';
import MedicinePage from '../../components/pages/resources/master/medicine/MedicinePage';
import ProvincePage from '../../components/pages/resources/master/province/ProvincePage';
import NoContentPage from '../../components/pages/resources/agricultural-produce/farm-garden/NoContentPage';
import EnterprisePage from '../../components/pages/resources/master/enterprise/EnterprisePage';

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
        slug: '/doanh-nghiep',
        icon: images.navigationIcons.EntrePrise,
        title: 'Doanh nghiệp',
        PageComponent: EnterprisePage,
    },
    {
        _id: generate.id(),
        slug: '/logistic',
        icon: images.navigationIcons.Logistics,
        title: 'Logistics',
        PageComponent: LogisticsPage,
    },
    // {
    //     _id: generate.id(),
    //     slug: '/nong-san',
    //     icon: images.navigationIcons.AgriculturalPage,
    //     title: 'Nông sản',
    //     PageComponent: FarmGarden,
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/trang-trai',
    //             icon: images.navigationIcons.FarmGardenPage,
    //             title: 'Trang trại',
    //             PageComponent: FarmGarden,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: ProcessingOrPackingFacilityPage,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/test',
    //     icon: images.navigationIcons.agricultureProduce,
    //     title: 'Test MessageBox',
    //     PageComponent: TestMessageBoxPage,
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/no-content',
    //     icon: images.navigationIcons.RawMaterialSupplierPage,
    //     title: 'trang không có dữ liệu',
    //     PageComponent: NoContentPage,
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/thit',
    //     icon: images.navigationIcons.meatPage,
    //     title: 'Thịt',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-san-xuat-thuc-an',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở sản xuất thức ăn',
    //             PageComponent: FoodProcessingFacilityPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-chan-nuoi',
    //             icon: images.navigationIcons.breedFacilityPage,
    //             title: 'Cơ sở chăn nuôi',
    //             PageComponent: FeedProcessingFacilityPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-giet-mo',
    //             icon: images.navigationIcons.slaughterFacilityPage,
    //             title: 'Cơ sở giết mổ',
    //             PageComponent: SlaughterProcessingFacilityPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: ProcessingOrPackingFacilityPageMeat,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/thuy-san',
    //     icon: images.navigationIcons.fisheriesPage,
    //     title: 'Thủy sản',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-danh-bat',
    //             icon: images.navigationIcons.catchFacilityPage,
    //             title: 'Cơ sở đánh bắt',
    //             PageComponent: CatchFacilityPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-kinh-doanh-tai-cang',
    //             icon: images.navigationIcons.portFacilityPage,
    //             title: 'Cơ sở kinh doanh tại cảng',
    //             PageComponent: PortFacilityPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: ProcessingOrPackingFacilityPageCatch,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/nhuyen-the',
    //     icon: images.navigationIcons.molluscsPage,
    //     title: 'Nhuyễn thể',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-san-xuat-thuc-an',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở sản xuất thức ăn',
    //             PageComponent: FoodProcessingFacilityPageMolluscs,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-chan-nuoi',
    //             icon: images.navigationIcons.breedFacilityPage,
    //             title: 'Cơ sở chăn nuôi',
    //             PageComponent: FeedProcessingFacilityPageMolluscs,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: ProcessingOrPackingFacilityPageMolluscs,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/duoc-pham',
    //     icon: images.navigationIcons.medicine,
    //     title: 'Dược phẩm',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: MedicinePage,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/san-pham-tieu-dung',
    //     icon: images.navigationIcons.customerProducts,
    //     title: 'Sản phẩm tiêu dùng',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/co-so-che-bien',
    //             icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
    //             title: 'Cơ sở chế biến',
    //             PageComponent: ProcessingFacilityPage,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/quan-ly-chuoi-txng',
    //     icon: images.navigationIcons.TraceabilityChainManagement,
    //     title: 'Quản lý chuỗi TXNG',
    //     children: [
    //         {
    //             _id: generate.id(),
    //             slug: '/cho-dau-moi',
    //             icon: images.navigationIcons.wholesaleMarketPage,
    //             title: 'Chợ đầu mối',
    //             PageComponent: WholesaleMarketPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/nha-phan-phoi',
    //             icon: images.navigationIcons.deliveriesPage,
    //             title: 'Nhà phân phối',
    //             PageComponent: DistributionCenterPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/nha-cung-cap-nguyen-lieu',
    //             icon: images.navigationIcons.RawMaterialSupplierPage,
    //             title: 'Nhà cung cấp nguyên liệu',
    //             PageComponent: SupplierPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/cua-hang-ban-le',
    //             icon: images.navigationIcons.delaerPage,
    //             title: 'Cửa hàng bán lẻ',
    //             PageComponent: DealerPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/sieu-thi',
    //             icon: images.navigationIcons.supermarketPage,
    //             title: 'Siêu thị',
    //             PageComponent: SupermarketPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/nha-hang',
    //             icon: images.navigationIcons.restaurantPage,
    //             title: 'Nhà hàng',
    //             PageComponent: RestaurantPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/benh-vien',
    //             icon: images.navigationIcons.hospital,
    //             title: 'Bệnh viện',
    //             PageComponent: HospitalPage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/nha-thuoc',
    //             icon: images.navigationIcons.DrupStorePage,
    //             title: 'Nhà thuốc',
    //             PageComponent: DrugStorePage,
    //         },
    //         {
    //             _id: generate.id(),
    //             slug: '/logistics',
    //             icon: images.navigationIcons.logicticsPage,
    //             title: 'Logistics',
    //             PageComponent: LogisticsPage,
    //         },
    //     ],
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/ban-do-phan-phoi',
    //     title: 'Bản đồ phân phối',
    //     icon: images.navigationIcons.MapDistributionCenter,
    //     PageComponent: MapDistributionCenterPage,
    // },
    // // {
    // //     _id: generate.id(),
    // //     slug: '/kho-hang',
    // //     icon: images.navigationIcons.agricultureProduce,
    // //     title: 'Kho hàng',
    // //     PageComponent: StorehousePage,
    // // },
    // {
    //     _id: generate.id(),
    //     slug: '/bao-cao-thong-ke',
    //     title: 'Báo cáo thống kê',
    //     icon: images.navigationIcons.StatisticalReports,
    //     PageComponent: StatisticalReportsPage,
    // },
    // {
    //     _id: generate.id(),
    //     slug: '/don-vi-hanh-chinh',
    //     icon: images.navigationIcons.mapvn,
    //     title: 'Đơn vị hành chính VN',
    //     PageComponent: ProvincePage,
    // }
];

const master: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default master;
