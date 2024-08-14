import React from "react";
import styles from "./DatePicker.module.scss";

interface IDatePicker {
    placeholder?: string;
    label: string;
    value: any;
    isEmpty: boolean;
    message: string;
    onValueChange: (event: any) => void;
}

const DatePicker = ({ isEmpty, label, placeholder, message, value, onValueChange }: IDatePicker) => {
    return (
        <div className={styles["date-container"]}>
            <label className={styles["date-label"]}>{label}</label>
            <input className={styles["date-view"]} type={"date"} alt="Date picker" placeholder={placeholder} value={value ? value: ""} onChange={onValueChange}/>
            { isEmpty && <span className={styles["date-message"]}>{message}</span> }
        </div>
    )
}

export default React.memo(DatePicker);