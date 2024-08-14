import * as React from 'react';
import TCSSProperties from '../../../core/styles/TCSSProperties';
import { IValidateResult } from '../../../core/types';
import make from '../../../utils/make';
import preProcess from '../../../utils/preProcess';
import Cover from '../Cover';
import { IMarkIsRequired, ITextFieldButton } from '../TextField';
import ButtonDropdown from './components/ButtonDropdown';
import ButtonRemoveSelected from './components/ButtonRemoveSelected';
import Input from './components/Input';
import Message from './components/Message';
import Options from './components/Options';
import Title from './components/Title';

import styles from './Selection.module.scss';
import { IOption } from './types';
import useSelectionStore from './useSelectionStore';
import Buttons from '../TextField/components/Buttons';

export interface ISelectionProps {
    buttons?: ITextFieldButton[];
    checkValidAll?: boolean;
    className?: string;
    options?: Readonly<IOption[]> | IOption[];
    maxLength?: number;
    title?: string;
    value?: string;
    placeholder?: string;
    sortBy?: 1 | -1;
    invalidMessage?: string;
    invalidColor?: string;
    readonly?: boolean;
    markIsRequired?: boolean | IMarkIsRequired | 'default';

    validator?: (v: string | undefined) => (IValidateResult | boolean) | Promise<IValidateResult | boolean>;
    onChange?: (v: any) => any;
}

export default function Selection(props: ISelectionProps) {
    // console.info(props.title, 'Rerender !');

    const {
        // ==
        validator,
        onChange,
    } = props;

    const {
        isFocus,
        // ==
        setFocus,
        setInputValue,

        validResult,
        setValidResult,
    } = useSelectionStore();

    const optionsSorted = React.useMemo(() => {
        if (!props.options) return [];

        const sortBy = props.sortBy;
        if (!sortBy) return props.options;

        const result = [...props.options];
        result.sort((a, b) => {
            const aLabel = preProcess.keyword(a.label);
            const bLabel = preProcess.keyword(b.label);

            if (aLabel > bLabel) return 1 * sortBy;
            if (aLabel < bLabel) return -1 * sortBy;
            return 0;
        });

        return result;
    }, [props.options, props.sortBy]);

    const selectedLabel = React.useMemo(() => {
        if (
            // ==
            !props.value ||
            !props.options ||
            props.options.length === 0
        )
            return undefined;
        return props.options.find((v) => v.value === props.value)?.label;
    }, [props.options, props.value]);

    const checkValid = React.useCallback(
        async (v: string | undefined) => {
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
                    return {
                        status: 'valid',
                    };
                }
                return isValid;
            });
        },
        [props.invalidColor, props.invalidMessage, setValidResult, validator],
    );

    const handlerCoverClick = React.useCallback(() => {
        setFocus(false);
    }, [setFocus]);

    const handlerButtonRemoveSelectedClick = React.useCallback(() => {
        if (onChange) onChange(undefined);
        setFocus(false);
    }, [onChange, setFocus]);

    React.useEffect(() => {
        if (props.value?.trim().length !== undefined || props.checkValidAll) {
            checkValid(props.value);
        } else {
            setValidResult({ status: 'valid' });
        }
    }, [props.value, checkValid, props.checkValidAll]);

    React.useEffect(() => {
        if (!props.readonly) return;

        setFocus(false);
    }, [props.readonly, setFocus]);

    React.useEffect(() => {
        if (isFocus) return;

        setInputValue('');
    }, [isFocus, setInputValue]);

    return (
        <div
            className={make.className([
                // ========
                styles['selection'],
                props.className,
                isFocus && styles['focus'],
                props.readonly && styles['readonly'],
            ])}
            style={
                {
                    '--selection-title-height': '30px',
                    '--validate-color': validResult.status === 'invalid' ? validResult.invalidColor : undefined,
                } as TCSSProperties
            }
        >
            <Cover onClick={handlerCoverClick} display={isFocus} />

            <Title value={props.title} markIsRequired={props.markIsRequired} />
            <div className={styles['container-wrap']} style={{width:props.buttons ?  '85%':'100%'}}>
                <div className={make.className(['container', isFocus && 'focus'], styles)}>
                    <div className={styles['input-wrap']} >
                        <Input
                            className={styles['input']}
                            placeholder={props.placeholder}
                            selectedLabel={selectedLabel}
                            readonly={props.readonly}
                        />
                        <ButtonRemoveSelected
                            // ==
                            onClick={handlerButtonRemoveSelectedClick}
                            selectedValue={props.value}
                        />
                        <ButtonDropdown readonly={props.readonly} />
                    </div>
                    <Options
                        //==
                        // buttons={props.buttons}
                        selectedValue={props.value}
                        options={optionsSorted}
                        maxLength={props.maxLength}
                        onOptionClick={props.onChange}
                        readonly={props.readonly}
                    />
                </div>
                {props.buttons && <div style={{
                display: 'block',
                position:'absolute',
                top:5,
                right:-50
            }}>
                <Buttons
                buttons={props.buttons}
                value={props.value}
                //==
                // onBtnFocusClick={handlerBtnFocusClick}
                onChange={props.onChange}
                />
                </div>}
            </div>
            <Message />
        </div>
    );
}
