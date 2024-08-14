import * as React from 'react';
import useSelectionStore from '../../useSelectionStore';
import styles from './Message.module.scss';

export interface IMessageProps {}

export default function Message(props: IMessageProps) {
    const { validResult, isFocus } = useSelectionStore();
    if (!validResult.message || isFocus) return null;

    return <div className={styles['message']}>{validResult.message}</div>;
}
