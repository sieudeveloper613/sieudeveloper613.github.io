import * as React from 'react';
import { EParticipantsRole } from '../../../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../../../common/ParticipantsPage';

export interface IHospitalPageProps { }

export default function HospitalPage(props: IHospitalPageProps) {
    return <ParticipantsPage role={EParticipantsRole.hospital} />;
}
