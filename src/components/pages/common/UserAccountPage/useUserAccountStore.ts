import * as React from 'react';
import { UserAccountContext } from './UserAccountProvider';

export default function useUserAccountStore() {
    return React.useContext(UserAccountContext);
}
