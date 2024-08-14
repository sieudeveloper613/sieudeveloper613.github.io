import * as React from 'react';
import { IValidateResult } from '../../../core/types';
import useMessageBox from '../../../hooks/useMessageBox';
import generate from '../../../utils/generate';
import make from '../../../utils/make';
import Selection, { IOption } from '../../common/Selection';
import TextField from '../../common/TextField';

import styles from './TestMessageBoxPage.module.scss';

export interface ITestMessageBoxPageProps {}

export default function TestMessageBoxPage(props: ITestMessageBoxPageProps) {
    const messageBox = useMessageBox();

    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = React.useState<string | undefined>(undefined);

    const options = React.useMemo(() => {
        return make.array({ stop: 10 }, (i) => {
            return {
                label: `Option ${i}`,
                value: generate.id(),
            } as IOption;
        });
    }, []);

    const handlerButtonOpenMessageBoxClick = () => {
        messageBox({
            title: 'Lỗi trong quá trình xử lý',
            icon: 'error',
            iconColor: 'red',
            message: 'Constructs a type consisting of all properties of Type set to required. The opposite of Partial.',
            buttons: [
                {
                    label: 'Thử lại',
                    onClick: () => {
                        messageBox('Bạn vừa nhấn nút thử lại');
                    },
                },
            ],
            // disableCloseButton: true,
        });
    };

    const validator = React.useCallback((v: string): IValidateResult => {
        if (v.length < 1)
            return {
                status: 'invalid',
                invalidColor: 'red',
                message: 'Error',
            } as IValidateResult;

        return {
            status: 'valid',
        } as IValidateResult;
    }, []);

    // React.useEffect(() => {
    //     console.log(selectedValue);
    // }, [selectedValue]);

    React.useEffect(() => {
        setSelectedValue(options[3].value);
    }, [options]);

    return (
        <div className={styles['test-message-box-page']}>
            <button onClick={handlerButtonOpenMessageBoxClick}>Open messageBox</button>

            <div style={{ marginTop: 20 }}>
                <Selection
                    className={styles['selection']}
                    placeholder={'Nhập và chọn'}
                    title={'Nhà cung cấp'}
                    options={options}
                    maxLength={5}
                    value={selectedValue}
                    onChange={(v) => {
                        setSelectedValue(v);
                    }}
                />
                <TextField
                    title={'Nhà cung cấp'}
                    value={inputValue}
                    onChange={(v) => {
                        setInputValue(v);
                    }}
                    validator={validator}
                />
            </div>
        </div>
    );
}
