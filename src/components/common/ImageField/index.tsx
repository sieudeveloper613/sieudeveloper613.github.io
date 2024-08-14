import * as React from 'react';

import ImageFieldBase, { IImageFieldProps as IImageFieldBaseProps } from './ImageField';
import ImageFieldProvider from './ImageFieldProvider';

export interface IMarkIsRequired {
    color?: string;
    mark?: string;
}

export interface IImageFieldProps extends IImageFieldBaseProps { }

function ImageField(props: IImageFieldProps) {
    return (
        <ImageFieldProvider>
            <ImageFieldBase {...props} />
        </ImageFieldProvider>
    );
}

export default React.memo(ImageField);