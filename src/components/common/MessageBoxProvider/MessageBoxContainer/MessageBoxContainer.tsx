import * as React from 'react';
import make from '../../../../utils/make';
import { MessageBoxContext } from '../MessageBoxProvider';
import MessageBox from './components/MessageBox';
import styles from './MessageBoxContainer.module.scss';

export interface IMessageBoxContainerProps { }

export default function MessageBoxContainer(props: IMessageBoxContainerProps) {
    const { data, setData } = React.useContext(MessageBoxContext);

    const handlerClose = (id: string) => () => {
        setData((preState) => {
            return preState.filter((item) => item._id !== id);
        });
    };

    const messageBoxItems = make.result(() => {
        if (!data || data.length === 0) return null;

        return data.map((item, i) => {
            return (
                <MessageBox
                    key={item._id}
                    title={item.title}
                    icon={item.icon}
                    iconColor={item.iconColor}
                    message={item.message}
                    messageColor={item.messageColor}
                    buttons={item.buttons}
                    index={i}
                    disableCloseButton={item.disableCloseButton}
                    onClose={handlerClose(item._id)}
                />
            );
        });
    });

    return <div className={styles['message-box-container']}>{messageBoxItems}</div>;
}
