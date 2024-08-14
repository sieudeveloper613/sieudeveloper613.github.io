import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
import StatisticalReportsPage from '../../../components/pages/resources/StatisticalReportsPage';
import PartnerPage from '../../../components/pages/resources/customer-products/processing-facility/PartnerPage';
import ProductTypePage from '../../../components/pages/resources/customer-products/processing-facility/ProductTypePage';
import DistributionCenterPage from '../../../components/pages/resources/master/enterprise/DistributionCenterPage';
import FarmGardenPage from '../../../components/pages/resources/master/enterprise/FarmGardenPage';
import ProcessingOrPackingFacilityPage from '../../../components/pages/resources/master/enterprise/ProcessingOrPackingFacilityPage';
import DealerPage from '../../../components/pages/resources/master/enterprise/DealerPage';
import RestaurantPage from '../../../components/pages/resources/master/enterprise/RestaurantPage';
import SupermarketPage from '../../../components/pages/resources/master/enterprise/SupermarketPage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';
import ProductAgriPage from '../../../components/pages/resources/agricultural-produce/farm-garden/ProductAgriPage';
import ProductProcessingPage from '../../../components/pages/resources/agricultural-produce/farm-garden/ProductProcessingPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import FarmProductsPage from '../../../components/pages/resources/agricultural-produce/farm-garden/FarmProductsPage'
import ProcessingFacilityProductsPage from '../../../components/pages/resources/agricultural-produce/farm-garden/ProcessingFacilityProductsPage';

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
        slug: '/nong-san',
        icon: images.navigationIcons.AgriculturalPage,
        title: 'Nông sản',
        children: [
            {
                _id: generate.id(),
                slug: '/trang-trai',
                icon: images.navigationIcons.FarmGardenPage,
                title: 'Trang trại',
                children: [
                    {
                        _id: generate.id(),
                        slug: '/thong-tin-trang-trai',
                        // icon: images.navigationIcons.FarmGardenPage,
                        title: 'Thông tin trang trại',
                        PageComponent: FarmGardenPage,
                    },
                    {
                        _id: generate.id(),
                        slug: '/san-pham-trang-trai',
                        title: 'Sản phẩm trang trại',
                        // icon: images.navigationIcons.productType,
                        PageComponent: FarmProductsPage,
                    },
                ],
            },
            {
                _id: generate.id(),
                slug: '/co-so-che-bien',
                icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
                title: 'Cơ sở chế biến',
                children: [
                    {
                        _id: generate.id(),
                        slug: '/thong-tin-cscb',
                        // icon: images.navigationIcons.FarmGardenPage,
                        title: 'Thông tin cơ sở chế biến',
                        PageComponent: ProcessingOrPackingFacilityPage,
                    },
                    {
                        _id: generate.id(),
                        slug: '/san-pham-cscb',
                        title: 'Sản phẩm cơ sở chế biến',
                        // icon: images.navigationIcons.productType,
                        PageComponent: ProcessingFacilityProductsPage,
                    },
                ],
            },
        ],
    },
  
    {
        _id: generate.id(),
        slug: '/quan-ly-chuoi-txng',
        icon: images.navigationIcons.TraceabilityChainManagement,
        title: 'Đối tượng tham gia khác',
        children: [
            // {
            //     _id: generate.id(),
            //     slug: '/cho-dau-moi',
            //     icon: images.navigationIcons.wholesaleMarketPage,
            //     title: 'Chợ đầu mối',
            //     PageComponent: WholesaleMarketPage,
            // },
            {
                _id: generate.id(),
                slug: '/nha-phan-phoi',
                icon: images.navigationIcons.Distributor,
                title: 'Nhà phân phối',
                PageComponent: DistributionCenterPage,
            },
            // {
            //     _id: generate.id(),
            //     slug: '/nha-cung-cap-nguyen-lieu',
            //     icon: images.navigationIcons.RawMaterialSupplierPage,
            //     title: 'Nhà cung cấp nguyên liệu',
            //     PageComponent: SupplierPage,
            // },
            {
                _id: generate.id(),
                slug: '/cua-hang-ban-le',
                icon: images.navigationIcons.RetailStore,
                title: 'Cửa hàng bán lẻ',
                PageComponent: DealerPage,
            },
            {
                _id: generate.id(),
                slug: '/sieu-thi',
                icon: images.navigationIcons.Supermarket,
                title: 'Siêu thị',
                PageComponent: SupermarketPage,
            },
            {
                _id: generate.id(),
                slug: '/nha-hang',
                icon: images.navigationIcons.Restaurant,
                title: 'Nhà hàng',
                PageComponent: RestaurantPage,
            },
            // {
            //     _id: generate.id(),
            //     slug: '/benh-vien',
            //     icon: images.navigationIcons.hospital,
            //     title: 'Bệnh viện',
            //     PageComponent: HospitalPage,
            // },
            // {
            //     _id: generate.id(),
            //     slug: '/nha-thuoc',
            //     icon: images.navigationIcons.DrupStorePage,
            //     title: 'Nhà thuốc',
            //     PageComponent: DrugStorePage,
            // },
            // {
            //     _id: generate.id(),
            //     slug: '/logistics',
            //     icon: images.navigationIcons.logicticsPage,
            //     title: 'Logistics',
            //     PageComponent: LogisticsPage,
            // },
        ],
    },
    {
        _id: generate.id(),
        slug: '/ban-do-phan-phoi',
        title: 'Bản đồ phân phối',
        icon: images.navigationIcons.MapDistributionCenter,
        PageComponent: MapDistributionCenterPage,
    },
    // // {
    // //     _id: generate.id(),
    // //     slug: '/kho-hang',
    // //     icon: images.navigationIcons.agricultureProduce,
    // //     title: 'Kho hàng',
    // //     PageComponent: StorehousePage,
    // // },
    {
        _id: generate.id(),
        slug: '/bao-cao-thong-ke',
        title: 'Báo cáo thống kê',
        icon: images.navigationIcons.StatisticalReports,
        PageComponent: StatisticalReportsPage,
    },
    // {
    //     _id: generate.id(),
    //     slug: '/don-vi-hanh-chinh',
    //     icon: images.navigationIcons.mapvn,
    //     title: 'Đơn vị hành chính VN',
    //     PageComponent: ProvincePage,
    // }
];

const enterprise: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default enterprise;
