import React, { useState } from "react";

/* components */
import Dropdown from "../../../Dropdown";
import { dropdownItem } from "../../../Dropdown/dropdownItems";

/* configurations */
import make from "../../../../../utils/make";

/* styles */
import styles from "./UserAvatar.module.scss";

export interface IUserAvatarProps {
    userName?: string;
    avatar?: string;
    userPermission?: {
        resource: string;
        role: string;
    };
}

export default function UserAvatar({ userName, avatar, userPermission }: IUserAvatarProps) {
    // create state
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const avatarElement = !avatar ? (
        userName?.at(0) || ""
    ) : (
        <img src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png" alt="avatar" />
    );

    let dropdownItemByPermission: any[] = [];

    if (userPermission?.resource !== "master") {
        dropdownItemByPermission = dropdownItem.filter(item => item.title !== "Đặt lại mật khẩu");
    } else {
        dropdownItemByPermission = [...dropdownItem];
    }

    return (
        <div className={make.className([styles["user-avatar"]])}>
            <div className={styles["avatar"]}>{avatarElement}</div>
            <div className={styles["user-name"]}>{userName}</div>
            <div className={styles["drop-down-menu"]} onClick={() => setIsOpen((prev) => !prev)}>
                <span className={styles["icon"]}>arrow_drop_down</span>
                {isOpen && <Dropdown items={dropdownItemByPermission} />}
            </div>
        </div>
    );
}
