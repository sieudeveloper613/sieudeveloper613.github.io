import * as React from 'react';
import { EParticipantsRole } from '../../../../sharetype/TPermission';
import ParticipantsArea from './components/ParticipantsArea';
import ParticipantsForm from './components/ParticipantsForm';
import ParticipantsProvider from './ParticipantsProvider';

import styles from './ParticipantsPage.module.scss';

export interface IParticipantsPageProps {
    role: EParticipantsRole;
}

export default function ParticipantsPage(props: IParticipantsPageProps) {
    return (
        <div className={styles['wrapper-ParticipantsProvider']}>
            <ParticipantsProvider role={props.role}>
                <ParticipantsArea />
                <ParticipantsForm />
            </ParticipantsProvider>
        </div>
    );
}
