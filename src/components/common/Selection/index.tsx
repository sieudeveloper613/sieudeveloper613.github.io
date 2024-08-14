import * as React from 'react';

import SelectionBase, { ISelectionProps } from './Selection';
import SelectionProvider from './SelectionProvider';

function Selection(props: ISelectionProps) {
    return (
        <SelectionProvider>
            <SelectionBase {...props} />
        </SelectionProvider>
    );
}

export type { IOption } from './types';
export default React.memo(Selection);
