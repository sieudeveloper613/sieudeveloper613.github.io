import wholesaleMarkets from '../../../api/agriculturalProduce/wholesale-markets';
import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import NameProductPage from '../../../components/pages/resources/agricultural-produce/wholesale-markets/NameProduct';
import NameProduct from '../../../components/pages/resources/agricultural-produce/wholesale-markets/NameProduct/components/NameProductForm/NameProductForm';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import PartnerPage from '../../../components/pages/resources/PartnerPage';
import SupermarketStatisticalReportsPage from '../../../components/pages/resources/StatisticalReports/agricultural-produce/SupermarketStatisticalReportsPage';
import DataManagementPage from '../../../components/pages/resources/DataManagementPage';
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
        slug: '/ban-hang',
        title: 'Bán hàng',
        icon: images.navigationIcons.ChainInformation,
        PageComponent: NameProductPage,
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
        PageComponent: SupermarketStatisticalReportsPage,
    },
];

const supermarket: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default supermarket;
