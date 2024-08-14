import * as React from 'react';
import { EParticipantsRole } from '../../../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../../../common/ParticipantsPage';

export interface IDistributionCenterParticipantsPageProps { }

export default function DistributionCenterParticipantsPage(props: IDistributionCenterParticipantsPageProps) {
    return <ParticipantsPage role={EParticipantsRole.distributionCenter} />;
}
