import * as React from 'react';
import { EMedicineRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IMedicinePageProps {}

export default function MedicinePage(props: IMedicinePageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.medicine,
                role: EMedicineRole.processingFacility,
            }}
        />
    );
}
