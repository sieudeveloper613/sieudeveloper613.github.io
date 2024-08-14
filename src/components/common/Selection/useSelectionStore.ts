import * as React from 'react';
import { SelectionContext } from './SelectionProvider';

export default function useSelectionStore() {
    return React.useContext(SelectionContext);
}
