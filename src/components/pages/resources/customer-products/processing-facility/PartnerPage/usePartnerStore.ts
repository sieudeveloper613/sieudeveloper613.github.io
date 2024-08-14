import * as React from 'react';
import { PartnerContext } from './PartnerProvider';

export default function usePartnerStore() {
    return React.useContext(PartnerContext);
}
