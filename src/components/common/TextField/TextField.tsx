import * as React from 'react';
import { useDebounce } from 'usehooks-ts';
import { IMarkIsRequired } from '.';
import TCSSProperties from '../../../core/styles/TCSSProperties';
import { IValidateResult } from '../../../core/types';
import make from '../../../utils/make';
import useParticipantsStore from '../../pages/common/ParticipantsPage/useParticipantsStore';
import Input from './components/Input';
import Message from './components/Message';
import styles from './TextField.module.scss';
import { ITextFieldButton } from './types';
import useTextFieldStore from './useTextFieldStore';

export interface ITextFieldProps {
    className?: string;
    checkValidAll?: boolean;
    title?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    invalidMessage?: string;
    invalidColor?: string;
    readonly?: boolean;
    buttons?: ITextFieldButton[];
    nonButton?: number;
    markIsRequired?: boolean | IMarkIsRequired | 'default';
    touched?: boolean;
    placeholder?: string;
    //==
    validator?: (v: string) => IValidateResult | boolean;
    onChange?: (v: string) => any;
}

export default function TextField(props: ITextFieldProps) {
    const { setFormData } = useParticipantsStore();

    const { validator, touched } = props;
    const inputValue = props.value || '';
    const validateValue = useDebounce(inputValue);

    const { validResult, setValidResult } = useTextFieldStore();

    const checkValidate = React.useCallback(
        async (v: string) => {
            if (!validator) return;

            if (props.readonly) {
                setValidResult((preState) => {
                    if (preState.status === 'invalid') {
                        return {
                            status: 'valid',
                        };
                    }
                    return preState;
                });
                return;
            }

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
        [props.invalidColor, props.invalidMessage, props.readonly, setValidResult, validator],
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

    React.useEffect(() => {
        if (validateValue.trim().length !== 0 || props.checkValidAll) {
            checkValidate(validateValue);
        } else {
            setValidResult({ status: 'valid' });
        }
    }, [validateValue, checkValidate, props.checkValidAll, setFormData]);

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
                buttons={props.buttons}
                value={inputValue}
                readonly={props.readonly}
                nonButton={props.nonButton}
                touched={touched}
                placeholder={props.placeholder}
                //==
                onChange={props.onChange}
            />
            <Message />
        </div>
    );
}
