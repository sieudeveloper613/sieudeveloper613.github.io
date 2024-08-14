import * as React from 'react';
import { IMarkIsRequired } from '.';
import make from "../../../utils/make";
import TCSSProperties from '../../../core/styles/TCSSProperties';
import { IValidateResult } from '../../../core/types';
import styles from './ImageField.module.scss'
import Input from './components/Input';
import Message from './components/Message';
import useImageFieldStore from './useImageFieldStore';

export interface IImageFieldProps {
    className?: string;
    checkValidAll?: boolean;
    title?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    invalidMessage?: string;
    invalidColor?: string;
    touched?: boolean;
    markIsRequired?: boolean | IMarkIsRequired | 'default';
    validator?: (v: string) => IValidateResult | boolean;
    onChange?: (v: string) => any;
}

export default function ImageField(props: IImageFieldProps) {
    const { validator, touched } = props;
    const inputValue = props.value || '';

    const { validResult, setValidResult } = useImageFieldStore();

    const checkValidate = React.useCallback(
        async (v: string) => {
            if (!validator) return;

            const isValid = await validator(v);

            setValidResult((preState) => {
                if (typeof isValid === 'boolean') {
                    if (!isValid)
                        return {
                            status: 'invalid',
                            invalidColor: props.invalidColor || 'red',
                            message: props.invalidMessage,
                        };

                    // avoid rerender !
                    if (preState.status === 'valid') return preState;

                    return {
                        status: 'valid',
                    };
                }
                return isValid;
            });
        },
        [props.invalidColor, props.invalidMessage, setValidResult, validator],
    );

    const titleElmnt = make.result(() => {
        if (!props.markIsRequired) {
            return (
                <div className={styles['label']}>
                    <strong>{props.title}</strong>
                </div>
            );
        }

        const defaultConfig: Required<IMarkIsRequired> = {
            color: 'red',
            mark: '(*)',
        };

        if (typeof props.markIsRequired === 'object') {
            Object.assign(defaultConfig, props.markIsRequired);
        }

        return (
            <div className={styles['label']}>
                <strong>{props.title}</strong>
                <strong>
                    &nbsp;
                    <sup style={{ color: defaultConfig.color }}>{defaultConfig.mark}</sup>
                </strong>
            </div>
        );
    });

    return (
        <div
            className={make.className([styles['text-field'], props.className])}
            style={
                {
                    '--validate-color': validResult.status === 'invalid' ? validResult.invalidColor : undefined,
                } as TCSSProperties
            }
        >
            {titleElmnt}

            <Input
                value={inputValue}

                touched={touched}
                //==
                onChange={props.onChange}
            />
            <Message />
        </div>
    );
}