import * as React from 'react';
import { NhanSuProvider } from './NhanSuProvider';

export default function useDriverStore() {
    return React.useContext(NhanSuProvider);
}
