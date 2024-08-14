import React from 'react';
import { NameProductContext } from './NameProductProvider';

export default function useNameProductStore() {
    return React.useContext(NameProductContext);
}
