import React from "react";

/* components */
import Logo from "./components/Logo";
import UserAvatar from "./components/UserAvatar";

/* styles */
import styles from "./Header.module.scss";

/* configurations */
import make from "../../../utils/make";
import { useAppSelector } from "../../../redux/hooks";
import Pagingreducer from "../../../redux/Paging/Paging";

/* packages */
import { useDispatch } from "react-redux";

export interface IHeaderProps {
    className?: string
}

export default function Header(props: IHeaderProps) {
    // create redux
    const dispatch = useDispatch();
    const userName = useAppSelector((state) => state.user.userInfo?.name);
    const isShowMenu = useAppSelector((state) => state.paging.isShowMenu);
    const userPermission = useAppSelector((state) => state.user.userInfo?.permission);

    const handleClick = ()=>{
        dispatch(Pagingreducer.actions.setIsShowMenu(!isShowMenu))
    }

    return (
        <header className={make.className([styles["header"], props.className])}>
            <div className={styles["menu"]}>
                <div className={styles["dropdown-menu"]} onClick={(handleClick)}>
                    <span className={styles["icon"]}>menu</span>
                </div>
                <Logo/>
            </div>
            <div className={styles["wrapper-right"]}>
                <UserAvatar userName={userName} userPermission={userPermission} />
            </div>
        </header>
    );
}
