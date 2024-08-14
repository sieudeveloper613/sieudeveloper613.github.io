import * as React from 'react';
import { EParticipantsRole } from '../../../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../../../common/ParticipantsPage';

export interface IDrugStorePageProps { }

export default function DrugStorePage(props: IDrugStorePageProps) {
    return <ParticipantsPage role={EParticipantsRole.drupStore} />;
}
