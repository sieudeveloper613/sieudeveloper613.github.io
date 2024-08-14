import * as React from 'react';
import { AccessInfoManageContext } from './AccessInfoManageProvider';

export default function useAccessInfoManageStore() {
    return React.useContext(AccessInfoManageContext);
}
