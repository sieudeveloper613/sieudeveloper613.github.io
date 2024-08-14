import * as React from 'react';
import { ParticipantsContext } from './ParticipantsProvider';

export default function useParticipantsStore() {
    return React.useContext(ParticipantsContext);
}
