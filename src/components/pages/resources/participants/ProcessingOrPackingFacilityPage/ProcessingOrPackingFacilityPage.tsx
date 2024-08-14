import * as React from 'react';
import { EParticipantsRole } from '../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../common/ParticipantsPage';

export interface IProcessingOrPackingParticipantPageProps {}

export default function ProcessingOrPackingParticipantPage(props: IProcessingOrPackingParticipantPageProps) {
    return <ParticipantsPage role={EParticipantsRole.processingFacility} />;
}
