import * as React from 'react';
import TCSSProperties from '../../../../../../core/styles/TCSSProperties';
import { IMessageBoxButton } from '../../../../../../hooks/useMessageBox';
import Cover from '../../../../Cover';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

import styles from './MessageBox.module.scss';

export interface IMessageBoxProps {
    title?: string;
    icon?: string;
    iconColor?: string;
    message: string;
    messageColor?: string;
    buttons?: IMessageBoxButton[];
    index?: number;
    disableCloseButton?: boolean;

    onClose?: () => any;
}

export default function MessageBox(props: IMessageBoxProps) {
    const index = props.index || 0;
    return (
        <div className={styles['message-box']}>
            <Cover className={styles['cover']} display onClick={props.disableCloseButton ? undefined : props.onClose} />
            <div
                className={styles['window']}
                style={
                    {
                        '--index': String(index),
                    } as TCSSProperties
                }
            >
                <Header
                    title={props.title}
                    onButtonCloseClick={props.onClose}
                    disableCloseButton={props.disableCloseButton}
                />
                <Body icon={props.icon} iconColor={props.iconColor} message={props.message} messageColor={props.messageColor} />
                <Footer buttons={props.buttons} onClose={props.onClose} />
            </div>
        </div>
    );
}
