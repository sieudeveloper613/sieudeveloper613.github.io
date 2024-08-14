import * as React from 'react';
import TPermission, { TTypeUserRole } from '../../../../sharetype/TPermission';
import UserAccountArea from './components/UserAccountArea';
import UserAccountForm from './components/UserAccountForm';
import UserAccountProvider from './UserAccountProvider';

import styles from './UserAccountProvider.module.scss';

export interface IUserAccountPageProps {
    permission: any;
    typeUser?: TTypeUserRole
}

export default function UserProviderPage({permission,typeUser='undefined'}: IUserAccountPageProps) {
    return (
        <div className={styles['wrapper-UserAccountProvider']}>
            <UserAccountProvider typeUser={typeUser} permission={permission}>
                <UserAccountArea />
                <UserAccountForm />
            </UserAccountProvider>
        </div>
    );
}
