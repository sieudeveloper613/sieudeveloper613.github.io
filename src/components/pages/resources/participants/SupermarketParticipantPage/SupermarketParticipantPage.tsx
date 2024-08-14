import * as React from 'react';
import { EParticipantsRole } from '../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../common/ParticipantsPage';

export interface ISupermarketParticipantPageProps {}

export default function RetailStoreParticipantPage(props: ISupermarketParticipantPageProps) {
    return <ParticipantsPage role={EParticipantsRole.supermarket} />;
}
