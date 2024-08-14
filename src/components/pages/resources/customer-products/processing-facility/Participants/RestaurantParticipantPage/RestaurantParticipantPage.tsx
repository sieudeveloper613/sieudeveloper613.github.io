import * as React from 'react';
import { EParticipantsRole } from '../../../../../../../sharetype/TPermission';
import ParticipantsPage from '../../../../../common/ParticipantsPage';

export interface IRestaurantParticipantPageProps { }

export default function RestaurantParticipantPage(props: IRestaurantParticipantPageProps) {
    return <ParticipantsPage role={EParticipantsRole.restaurant} />;
}
