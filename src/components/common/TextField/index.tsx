import * as React from 'react';

import TextFieldBase, { ITextFieldProps as ITextFieldBaseProps } from './TextField';
import TextFieldProvider from './TextFieldProvider';

export type { ITextFieldButton } from './types';

export interface IMarkIsRequired {
    color?: string;
    mark?: string;
}

export interface ITextFieldProps extends ITextFieldBaseProps {}

function TextField(props: ITextFieldProps) {
    return (
        <TextFieldProvider>
            <TextFieldBase {...props} />
        </TextFieldProvider>
    );
}

export default React.memo(TextField);
