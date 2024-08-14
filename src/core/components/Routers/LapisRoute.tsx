import * as React from 'react';
import { Route } from 'react-router-dom';
import { TNavigateItem } from '../../../config/navigationConfig/Types';

export interface ILapisRouteProps {
    data: TNavigateItem;
}

export default function LapisRoute(props: ILapisRouteProps) {
    const { children, PageComponent, slug } = props.data;

    const hasChildren = Array.isArray(children) && children.length > 0;

    if (!hasChildren) {
        if (!PageComponent) {
            console.warn('LapisRoute nhận vào một PageComponent = undefined. Hãy kiểm tra thư mục config !');
        }
        return <Route path={slug} element={<PageComponent />} />;
    }

    if (children.length === 0) {
        return null;
    }

    const childRouteElmnts = children.map((item) => {
        return (
            <React.Fragment>
                <LapisRoute key={item._id} data={item} />
            </React.Fragment>
        );
    });

    return <Route path={slug}>{childRouteElmnts}</Route>;
}
