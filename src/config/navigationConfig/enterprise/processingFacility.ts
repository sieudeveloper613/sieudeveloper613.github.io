/* pages */
import DefaultLayout from "../../../layout/DefaultLayout";
import SSCCPage from "../../../components/pages/common/SSCC";
import PartnerPage from "../../../components/pages/resources/PartnerPage";
import DriverPage from "../../../components/pages/resources/transportation/DriverPage";
import DataManagementPage from "../../../components/pages/resources/DataManagementPage";
import VehiclePage from "../../../components/pages/resources/transportation/VehiclePage";
import PackPage from "../../../components/pages/resources/agricultural-produce/farm-garden/PackPage";
import Ingredient from "../../../components/pages/resources/agricultural-produce/farm-garden/Ingredient";
import ProcessCode from "../../../components/pages/resources/agricultural-produce/processing-facility/ProcessCode";
import ProceduresPage from "../../../components/pages/resources/agricultural-produce/farm-garden/FertilizersPage";
import ProductsProcessingPage from "../../../components/pages/resources/customer-products/processing-facility/ProductsProcessingPage";
import ProductTypePage from "../../../components/pages/resources/customer-products/processing-facility/ProductTypePage";
import AccessInfoManagePage from "../../../components/pages/resources/agricultural-produce/farm-garden/AccessInfoManage";
import ProcessingFacilityStatisticalReportsPage from "../../../components/pages/resources/StatisticalReports/agricultural-produce/ProcessingFacilityStatisticalReportsPage";

/* configurations, resources, utils */
import images from "../../../resources/images";
import generate from "../../../utils/generate";

/* types */
import { TNavigateItemConfig, TNavigationConfig } from "../Types";

const children: TNavigateItemConfig[] = [
    {
        _id: generate.id(),
        slug: "/data-management",
        title: "Quản trị dữ liệu",
        icon: images.navigationIcons.dataManagement,
        PageComponent: DataManagementPage,
    },
    {
        _id: generate.id(),
        slug: "/partners",
        title: "Đối tác",
        icon: images.navigationIcons.PartnerPage,
        PageComponent: PartnerPage,
    },
    {
        _id: generate.id(),
        slug: "/procedures",
        title: "Quy Trình",
        icon: images.navigationIcons.Procedure,
        PageComponent: ProceduresPage,
    },
    {
        _id: generate.id(),
        slug: "/materials",
        title: "Nguyên Liệu",
        icon: images.navigationIcons.Personnel,
        PageComponent: Ingredient,   
    },
    {
        _id: generate.id(),
        slug: "/products",
        title: "Sản Phẩm",
        icon: images.navigationIcons.Product2,
        PageComponent: ProductsProcessingPage,
    },
    {
        _id: generate.id(),
        slug: "/packaging-types",
        title: "Quy cách đóng gói",
        icon: images.navigationIcons.Packing,
        PageComponent: PackPage,
    },
    {
        _id: generate.id(),
        slug: "/process-code",
        title: "Mã quy trình",
        icon: images.navigationIcons.ProcessCode,
        PageComponent: ProcessCode,
    },
    {
        _id: generate.id(),
        slug: "/management-of-retrieval-information",
        title: "Quản lý thông tin truy xuất",
        icon: images.navigationIcons.ChainInformation,
        PageComponent: AccessInfoManagePage,
    },
    {
        _id: generate.id(),
        slug: "/transportations",
        title: "Vận chuyển",
        icon: images.navigationIcons.TransportPage,
        children: [
            {
                _id: generate.id(),
                slug: "/sscc",
                title: "SSCC",
                icon: images.navigationIcons.TransportPage,
                PageComponent: SSCCPage,
            },
            {
                _id: generate.id(),
                slug: "/vehicles",
                title: "Xe",
                icon: images.navigationIcons.car,
                PageComponent: VehiclePage,
            },
            {
                _id: generate.id(),
                slug: "/drivers",
                icon: images.navigationIcons.driverPage,
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
        slug: "/statistic",
        title: "Báo cáo thống kê",
        icon: images.navigationIcons.StatisticalReports,
        PageComponent: ProcessingFacilityStatisticalReportsPage,
    },
];

const processingFacility: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default processingFacility;
