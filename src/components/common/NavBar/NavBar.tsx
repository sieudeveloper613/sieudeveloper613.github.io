import { useMemo } from "react";
import make from "../../../utils/make";
import styles from "./NavBar.module.scss";
import NavItem from "./components/NavItem";
import { useAppSelector } from "../../../redux/hooks";
import navigationSelector from "../../../core/navigationSelector";

export interface INavBarProps { }

export default function NavBar(props: React.PropsWithChildren<INavBarProps>) {
    /** create redux */
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const isShowMenu = useAppSelector((state) => state.paging.isShowMenu);

    const navigationItems = useMemo(() => {
        if (!userInfo) return undefined;

        const config = navigationSelector(userInfo.permission);

        if (!config) return undefined;

        return config.children;
    }, [userInfo]);

    const navigationItemElmnts = useMemo(() => {
        if (!navigationItems) return null;

        return navigationItems.map((item) => {
            return (
                <li key={item._id}>
                    <NavItem level={0} data={item} currentUrl="" />
                </li>
            );
        });
    }, [navigationItems]);

    return (
        <div className={make.className([styles["nav-bar"], styles[`${isShowMenu ? "active" : ""}`]])}>
            <ul>{navigationItemElmnts}</ul>
        </div>
    );
}
