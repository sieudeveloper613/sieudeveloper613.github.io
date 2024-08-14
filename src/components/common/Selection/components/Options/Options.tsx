import * as React from 'react';
import { useDebounce } from 'usehooks-ts';
import TCSSProperties from '../../../../../core/styles/TCSSProperties';
import make from '../../../../../utils/make';
import preProcess from '../../../../../utils/preProcess';
import { IOption } from '../../types';
// import { IOption } from '../../types';
import useSelectionStore from '../../useSelectionStore';

import styles from './Options.module.scss';
import { ITextFieldButton } from '../../../TextField';

export interface IOptionsProps {
    // buttons?: ITextFieldButton[];
    maxLength?: number;
    options: IOption[] | readonly IOption[];
    selectedValue: string | undefined;
    readonly?: boolean;

    onOptionClick?: (v: string | undefined) => any;
}

export default function Options(props: IOptionsProps) {
    const { onOptionClick } = props;

    const {
        isFocus,
        inputValue,

        setFocus,
        setInputValue,
    } = useSelectionStore();

    const keyword = useDebounce<string>(inputValue, 500);

    const handlerOptionClick = React.useCallback(
        (v: string | undefined) => () => {
            if (onOptionClick) onOptionClick(v);
            setFocus(false);
            setInputValue('');
        },
        [onOptionClick, setFocus, setInputValue],
    );

    const elmnts = React.useMemo(() => {
        if (props.options.length === 0) return null;

        const processedOption = make.result(() => {
            const filterRegex = new RegExp(preProcess.keyword(keyword), 'i');

            return props.options.filter((option) => {
                const optionKeyword = preProcess.keyword(option.label);
                return (
                    filterRegex.test(optionKeyword) ||
                    filterRegex.test(
                        optionKeyword
                            .split(' ')
                            .map((c) => c.charAt(0))
                            .join(''),
                    )
                );
            });
        });

        if (processedOption.length === 0) {
            return [
                <li key={'empty'} onClick={handlerOptionClick(undefined)}>
                    {`Không có kết quả nào ứng với từ khóa tìm kiếm !`}
                </li>,
            ];
        }

        return processedOption.map((option,index) => {
            return (
                <li
                    key={index.toString()}
                    onClick={handlerOptionClick(option.value)}
                    className={make.className(
                        [
                            //==
                            props.selectedValue === option.value && 'selected',
                        ],
                        styles,
                    )}
                >
                    {option.label}
                </li>
            );
        });
    }, [handlerOptionClick, keyword, props.options, props.selectedValue]);
    return (
        <ul
            className={make.className(
                [
                    //==
                    'options', //==
                    isFocus && elmnts !== null && !props.readonly && 'display', //==
                ],
                styles,
            )} //==
            style={
                {
                    '--max-length': props.maxLength || 10,
                } as TCSSProperties
            }
        >
            {elmnts}
        </ul>
    );
}
