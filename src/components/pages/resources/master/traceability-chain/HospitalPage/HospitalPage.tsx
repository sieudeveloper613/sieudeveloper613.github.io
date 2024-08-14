import * as React from 'react';
import { EResource, ETraceabilityChain } from '../../../../../../sharetype/TPermission';
import UserAccountPage from '../../../../common/UserAccountPage';

export interface IHospitalPage {}

export default function HospitalPage(props: IHospitalPage) {
    return (
        <UserAccountPage
            permission={{
                resource: EResource.traceabilityChain,
                role: ETraceabilityChain.hospital,
            }}
        />
    );
}
