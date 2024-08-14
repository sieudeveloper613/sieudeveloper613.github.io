import * as React from 'react';
import TCSSProperties from '../../../../../core/styles/TCSSProperties';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './WindowForm.module.scss';

export interface IWindowFormButton {
    label: string;
    width?: string,
    fontFamily?: string,
    color?: string;
    backgroundColor?: string;
    onClick?: () => any;
}

export interface IWindowProps {
    title?: string;
    width?: string;
    height?: string;
    buttons?: IWindowFormButton[];
    featch?: any;
    backgroundColor?:string
    styleBody?:any
    footer?:boolean
}

export default function WindowForm(props: React.PropsWithChildren<IWindowProps>) {
    const [cssOverflow, setCssOverflow] = React.useState<'auto' | 'hidden'>('auto');
    const [cssOfWindowForm, setCssOfWindowForm] = React.useState<TCSSProperties>();
    const handlerTransitionEnd = React.useCallback(() => {
        setCssOverflow('auto');
    }, []);

    React.useEffect(() => {
        setCssOverflow('hidden');
    }, [props.height, props.width]);

    React.useEffect(() => {
        if (cssOverflow !== 'hidden') {
            return;
        }

        setCssOfWindowForm({
            width: props.width,
            height: props.height,
            backgroundColor: props.backgroundColor
        });
    }, [props.height, props.width,props.backgroundColor, cssOverflow]);

    return (
        <div className={styles['window-form']} style={cssOfWindowForm} onTransitionEnd={handlerTransitionEnd}>
            <Header title={props.title} buttons={props.buttons} />
            <div
                className={styles['body']}
                style={{
                    overflow: cssOverflow,
                    ...(props.styleBody || {})
                }}
            //==
            >
                {props.children}
            </div>
            {!props.footer && <Footer buttons={props.buttons} featch={props.featch} />}
        </div>
    );
}
