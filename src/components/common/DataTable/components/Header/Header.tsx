import * as React from "react";
import styles from "./Header.module.scss";
import make from "../../../../../utils/make";
import { IDataTableRadio } from "../../DataTable";

export interface IHeaderProps {
    title?: string;
    className?: string;
    radios?: IDataTableRadio[];
    hiddenButtonCreate?: boolean;
    onButtonCreateClick?: () => any;
}

export default function Header(props: IHeaderProps) {
    const radioElements = make.result(() => {
        if (!props.radios || props.radios.length === 0) return null;

        return props.radios.map((item, index: number) => {

            const handlerRadioClick = (value: string) => {
                return item.onClick && item.onClick(value);
            };

            return (
                <label
                    htmlFor={item.label}
                    className={styles["radio"]}
                    key={`${index}_${item.label}`}
                >
                    <input
                        type={"radio"}
                        name={"radio"}
                        id={item.label}
                        value={item.label}
                        defaultChecked={index === 0}
                        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                            const value = event.currentTarget.value;
                            handlerRadioClick(value);
                        }}
                    />
                    {item.label}
                </label>
            );
        });
    });

    return (
        <div className={make.className([styles["header"], props.className])}>
            <strong className={styles["title"]}>{props.title}</strong>
            <div className={styles["radios"]}>{radioElements}</div>
            {!props.hiddenButtonCreate && (
                <button type="button" className={styles["button-add"]} onClick={props.onButtonCreateClick}>
                    <span className={styles["text"]}>Tạo mới</span>
                    <span className={styles["icon"]}>add</span>
                </button>
            )}
        </div>
    );
}
