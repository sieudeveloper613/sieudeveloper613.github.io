import * as React from 'react';
import { PartnerFormContext } from './PartnerFormProvider';

export default function usePartnerFormStore() {
    return React.useContext(PartnerFormContext);
}
