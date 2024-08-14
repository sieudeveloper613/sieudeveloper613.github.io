import React, { PropsWithChildren } from "react";
import make from "../../../utils/make";
import styles from "./SearchBar.module.scss";

export interface ISearchBarProps {
    input: string;
    placeholder?: string;
    handleButtonClick: () => void;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
    input, setInput, placeholder,
    handleButtonClick,
}: PropsWithChildren<ISearchBarProps>) {

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleButtonClick();
        }
    }

    return (
        <div className={make.className([styles["search-bar"]])}>
            <span className={styles["icon"]}>search</span>
            <input
                className={styles["input"]}
                type={"text"}
                value={input}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            <button type={"button"} className={styles["button-search"]} onClick={handleButtonClick}>
                <span className={styles["text"]}>Tìm kiếm</span>
            </button>
        </div>
    );
}