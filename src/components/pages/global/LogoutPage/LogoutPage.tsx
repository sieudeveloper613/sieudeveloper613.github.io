import * as React from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import userSlice from '../../../../redux/userSlice';

export interface ILogoutPageProps {}

export default function LogoutPage(props: ILogoutPageProps) {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(userSlice.actions.logout());
    }, [dispatch]);

    return <div>Đang đăng xuất</div>;
}
