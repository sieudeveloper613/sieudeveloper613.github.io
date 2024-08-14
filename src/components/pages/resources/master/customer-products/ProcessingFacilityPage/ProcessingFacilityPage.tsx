import * as React from 'react';
import { ECustomerProductsRole, EResource } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IProcessingFacilityPageProps {}

export default function ProcessingFacilityPage(props: IProcessingFacilityPageProps) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.customerProducts,
                role: ECustomerProductsRole.processingFacility,
            }}
        />
    );
}
