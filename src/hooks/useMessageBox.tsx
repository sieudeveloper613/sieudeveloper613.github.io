import * as React from 'react';
import { IMessageBoxItem, MessageBoxContext } from '../components/common/MessageBoxProvider/MessageBoxProvider';

import generate from '../utils/generate';

export interface IMessageBoxButton {
    label: string;
    onClick?: () => any;
}

export interface IMessageBox {
    title?: string;
    icon?: string;
    iconColor?: string;
    message: string;
    messageColor?: string;
    disableCloseButton?: boolean;
    buttons?: IMessageBoxButton[];
}

const makeMessageBoxConfig = (v: IMessageBox | string): IMessageBoxItem => {
    if (typeof v === 'string') {
        return {
            _id: generate.id(),
            message: v,
        };
    }

    return {
        _id: generate.id(),
        ...v,
    };
};

const useMessageBox = () => {
    const { setData } = React.useContext(MessageBoxContext);

    const messageBox = React.useRef((v: IMessageBox | string) => {
        setData((preState) => {
            return [...preState, makeMessageBoxConfig(v)];
        });
    });

    return messageBox.current;
};

export default useMessageBox;
