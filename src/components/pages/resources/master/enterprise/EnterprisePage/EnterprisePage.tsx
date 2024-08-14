import * as React from 'react';
import UserAccountPage from '../../../../common/UserAccountPage';
import { EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';


export default function EnterprisePage() {
    return (
        <UserAccountPage
            typeUser= {ETypeUser.enterprise}
            permission={{
                resource: EResource.enterprise,
                role: EnterpriseRole.enterprise,
            }}
        />
    );
}
