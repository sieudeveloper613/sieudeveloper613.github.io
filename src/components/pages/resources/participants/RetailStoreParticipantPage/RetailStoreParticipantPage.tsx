import * as React from 'react';
import { EParticipantsRole } from '../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../common/ParticipantsPage';

export interface IRetailStoreParticipantPageProps {}

export default function RetailStoreParticipantPage(props: IRetailStoreParticipantPageProps) {
    return <ParticipantsPage role={EParticipantsRole.retail} />;
}
