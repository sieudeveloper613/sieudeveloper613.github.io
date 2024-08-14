import * as React from 'react';
import { TraceabilityPartnerContext } from './TraceabilityPartnerProvider';

export default function usePartnerStore() {
    return React.useContext(TraceabilityPartnerContext);
}
