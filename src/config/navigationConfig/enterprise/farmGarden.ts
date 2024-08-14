import SSCCPage from "../../../components/pages/common/SSCC";
import PartnerPage from "../../../components/pages/resources/PartnerPage";
import DriverPage from "../../../components/pages/resources/transportation/DriverPage";
import DataManagementPage from "../../../components/pages/resources/DataManagementPage";
import VehiclePage from "../../../components/pages/resources/transportation/VehiclePage";
import NhanSuPage from "../../../components/pages/resources/agricultural-produce/farm-garden/NhanSu";
// import ProviderSuppliesPage from "../../../components/pages/resources/master/enterprise/ProviderSuppliesPage";
import Supplier from "../../../components/pages/resources/agricultural-produce/farm-garden/Supplier";
import GardenCodePage from "../../../components/pages/resources/agricultural-produce/farm-garden/GardenCodePage";
import NameSupppliesPage from "../../../components/pages/resources/agricultural-produce/farm-garden/NameSuppliesPage";
import ProductAgriPage from "../../../components/pages/resources/agricultural-produce/farm-garden/ProductAgriPage";
import ProductsFarmGardenPage from "../../../components/pages/resources/agricultural-produce/farm-garden/ProductsFarmGardenPage";
import TypeSuppliesPage from "../../../components/pages/resources/agricultural-produce/farm-garden/TypeSupliesPage";
import AccessInfoManagePage from "../../../components/pages/resources/agricultural-produce/farm-garden/AccessInfoManage";
import ProviderManagePage from "../../../components/pages/resources/agricultural-produce/farm-garden/ProviderManagePage";
import FarmGardenStatisticalReportsPage from "../../../components/pages/resources/StatisticalReports/agricultural-produce/FarmGardenStatisticalReportsPage";

import images from "../../../resources/images";
import generate from "../../../utils/generate";
import DefaultLayout from "../../../layout/DefaultLayout";

import { TNavigateItemConfig, TNavigationConfig } from "../Types";

const children: TNavigateItemConfig[] = [
    {
        _id: generate.id(),
        slug: "/quan-tri-du-lieu",
        title: "Quản trị dữ liệu",
        icon: images.navigationIcons.dataManagement,
        PageComponent: DataManagementPage,
    },
    {
        _id: generate.id(),
        slug: "/doi-tac",
        title: "Đối tác",
        icon: images.navigationIcons.PartnerPage,
        PageComponent: PartnerPage,
    },
    {
        _id: generate.id(),
        slug: "/nhan-su",
        icon: images.navigationIcons.Personnel,
        title: "Nhân sự",
        PageComponent: NhanSuPage,
    },
    {
        _id: generate.id(),
        slug: "/ma-khu-vuon",
        title: "Mã khu vườn",
        icon: images.navigationIcons.GardenCodePage,
        PageComponent: GardenCodePage,
    },
    {
        _id: generate.id(),
        slug: "/vat-tu",
        title: "Vật tư",
        icon: images.navigationIcons.Supplies,
        children: [
            {
                _id: generate.id(),
                slug: "/loai-vat-tu",
                // icon: images.navigationIcons.ProcessingOrPackingFacilityPage,
                title: "Loại vật tư",
                PageComponent: TypeSuppliesPage,
            },
            {
                _id: generate.id(),
                slug: "/nha-cung-cap",
                title: "Nhà cung cấp",
                // icon: images.navigationIcons.deliveriesPage,
                PageComponent: Supplier,
            },
            {
                _id: generate.id(),
                slug: "/ten-vat-tu",
                title: "Tên vật tư",
                // icon: images.navigationIcons.PlantVarietiesPage,
                PageComponent: NameSupppliesPage,
            },
            {
                _id: generate.id(),
                slug: "/quan-ly-ncc",
                title: "Quản lý nhà cung cấp",
                // icon: images.navigationIcons.productType,
                PageComponent: ProviderManagePage,
            },
        ],
    },
    {
        _id: generate.id(),
        slug: "/san-pham",
        title: "Sản phẩm",
        icon: images.navigationIcons.Product,
        PageComponent: ProductsFarmGardenPage,
    },
    {
        _id: generate.id(),
        slug: "/quan-ly-thong-tin-truy-xuat",
        title: "Quản lý thông tin truy xuất",
        icon: images.navigationIcons.retrieveProductInformation,
        PageComponent: AccessInfoManagePage,
    },
    {
        _id: generate.id(),
        slug: "/van-chuyen",
        title: "Vận chuyển",
        icon: images.navigationIcons.TransportPage,
        children: [
            {
                _id: generate.id(),
                slug: "/sscc",
                title: "SSCC",
                // icon: images.navigationIcons.TransportPage,
                PageComponent: SSCCPage,
            },
            {
                _id: generate.id(),
                slug: "/xe",
                title: "Xe",
                // icon: images.navigationIcons.TransportPage,
                PageComponent: VehiclePage,
            },
            {
                _id: generate.id(),
                slug: "/tai-xe",
                // icon: images.navigationIcons.driverPage,
                title: "Tài xế",
                PageComponent: DriverPage,
            },
        ],
    },
    // {
    //     _id: generate.id(),
    //     slug: "/ban-do-phan-phoi",
    //     title: "Bản đồ phân phối",
    //     icon: images.navigationIcons.MapDistributionCenter,
    //     PageComponent: MapDistributionCenterPage,
    // },
    {
        _id: generate.id(),
        slug: "/bao-cao-thong-ke",
        title: "Báo cáo thống kê",
        icon: images.navigationIcons.StatisticalReports,
        PageComponent: FarmGardenStatisticalReportsPage,
    },
];

const farmGarden: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default farmGarden;
