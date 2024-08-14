import React from "react";
import styles from "./Selection.module.scss";

interface IItem {
    id: string,
    label: string,
    value: any,
}

interface ISelection {
    label: any,
    value: any,
    message: string,
    isEmpty: boolean,
    disabled?: boolean,
    placeholder?: string,
    data: { id: string, label: string, value: string | null }[],
    onValueChange: (event: any) => void,
}

const Selection = ({ label, placeholder, data, isEmpty, disabled, message, value, onValueChange }: ISelection) => {
    return (
        <div className={styles["selection-container"]}>
            <label className={styles["selection-label"]}>{label}</label>
            <select disabled={disabled} className={styles["selection-view"]} placeholder={placeholder} value={value ? value : ""} onChange={onValueChange}>
                {
                    data.map((item: IItem) => {
                        return (
                            <option className={styles["selection-option"]} key={item.id} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </select>
            { isEmpty && <span className={styles["selection-message"]}>{message}</span> }
        </div>
    )
}

export default React.memo(Selection);