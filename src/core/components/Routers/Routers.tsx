import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TNavigateItem, TNavigationConfig } from '../../../config/navigationConfig/Types';

import LogoutPage from '../../../components/pages/global/LogoutPage';
import NotFoundPage from '../../../components/pages/global/NotFoundPage';
import InfoPage from '../../../components/pages/global/InfoPage';
import ResetPasswordPage from '../../../components/pages/global/ResetPasswordPage';
import ResetPasswordToDefaultPage from '../../../components/pages/global/ResetPasswordToDefaultPage';

export interface IRoutersProps {
    config: TNavigationConfig;
}

export default function Routers(props: IRoutersProps) {
    const { children, IndexPageComponent } = props.config;

    const routeElmnts = React.useMemo(() => {
        const renderRoutes = (data: TNavigateItem) => {
            const slug = data.slug.replace('/', '');

            //
            if (!data.children) {
                const { PageComponent } = data;

                if (!PageComponent) {
                    console.error('PageComponent is undefined');
                    return <></>;
                }

                return <Route key={data._id} path={slug} element={<data.PageComponent />} />;
            }

            //
            const routeElmnts = data.children.map((item) => {
                return renderRoutes(item);
            });

            return (
                <Route key={data._id} path={slug}>
                    {routeElmnts}
                </Route>
            );
        };

        return children.map((item, i) => {
            return renderRoutes(item);
        });
    }, [children]);
    
    return (
        <Routes>
            <Route path='/' element={<IndexPageComponent />}>
                {routeElmnts}
            </Route>
            <Route path='/dang-xuat' element={<LogoutPage />} />
            <Route path='/thong-tin-trang-trai' element={<InfoPage />} />
            <Route path='/doi-mat-khau' element={<ResetPasswordPage />} />
            <Route path='/dat-lai-mat-khau' element={<ResetPasswordToDefaultPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
