import PartnerPage from '../../components/pages/resources/PartnerPage';
import DriverPage from '../../components/pages/resources/transportation/DriverPage';
import VehiclePage from '../../components/pages/resources/transportation/VehiclePage';
import DefaultLayout from '../../layout/DefaultLayout';
import images from '../../resources/images';
import generate from '../../utils/generate';
import { TNavigateItemConfig, TNavigationConfig } from './Types';

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
        slug: '/van-chuyen',
        title: 'Vận chuyển',
        icon: images.navigationIcons.TransportPage,
        children: [
            {
                _id: generate.id(),
                slug: '/tai-xe',
                icon: images.navigationIcons.agricultureProduce,
                title: 'Tài xế',
                PageComponent: DriverPage,
            },
            {
                _id: generate.id(),
                slug: '/xe',
                title: 'Xe',
                icon: images.navigationIcons.agricultureProduce,
                PageComponent: VehiclePage,
            },
        ],
    },
];

const transportation: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children,
};

export default transportation;
