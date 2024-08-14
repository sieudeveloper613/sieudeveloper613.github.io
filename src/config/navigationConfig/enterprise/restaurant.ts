import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import MapDistributionCenterPage from '../../../components/pages/resources/MapDistributionCenter';
import PartnerPage from '../../../components/pages/resources/PartnerPage';
import StatisticalReportsPage from '../../../components/pages/resources/StatisticalReportsPage';
import DefaultLayout from '../../../layout/DefaultLayout';
import images from '../../../resources/images';
import generate from '../../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from '../Types';

const children: TNavigateItemConfig[] = [
    {
        _id: generate.id(),
        slug: '/doi-tac',
        title: 'Đối tác',
        icon: images.navigationIcons.PartnerPage,
        PageComponent: PartnerPage,
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
        PageComponent: StatisticalReportsPage,
    },
];

const restaurant: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default restaurant;
