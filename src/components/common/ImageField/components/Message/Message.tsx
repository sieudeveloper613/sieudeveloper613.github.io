import * as React from 'react';
import useTextFieldStore from '../../useImageFieldStore';
import styles from './Message.module.scss';

export interface IMessageProps { }

export default function Message(props: IMessageProps) {
    const { validResult } = useTextFieldStore();
    if (!validResult.message) return null;

    return <div className={styles['message']}>{validResult.message}</div>;
}
