import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.scss";
import make from "../../../../../utils/make";
import Pagingreducer from "../../../../../redux/Paging/Paging";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { TNavigateItem } from "../../../../../config/navigationConfig/Types";

export interface INavItemProps {
    level: number;
    currentUrl: string;
    data: TNavigateItem;
    onActive?: (v: boolean) => any;
}

export default function NavItem(props: INavItemProps) {
    
    /** create props */
    const { onActive } = props;
    const { children, slug } = props.data;

    
    /** create redux */
    const dispatch = useAppDispatch()
    
    /** create constant */
    const url = props.currentUrl + slug;
    const hasChildren = Array.isArray(children) && children.length > 0;
    
    /** create state */
    const [isActive, setActive] = useState<boolean>(false);
    const [isChangeActive, setChangeActive] = useState<boolean>(false);
    const [displayChildren, setDisplayChildren] = useState<boolean>(false);

    const handlerActive = (v: boolean) => {
        if (!v || isChangeActive) return;

        setChangeActive(true);
        setDisplayChildren(true);
        if (onActive) onActive(true);
    };

    useEffect(() => {
        if (!isActive) return;

        if (onActive) onActive(isActive);
    }, [isActive, onActive]);

    const childrenElements = children?.map((item: any) => {
            return (
                <li key={item._id}>
                    <NavItem level={props.level + 1} data={item} currentUrl={url} onActive={handlerActive} />
                </li>
            );
        }) || null;

    const className = make.className([styles["nav-item"], displayChildren && styles["display-children"]]);

    const style = {"--level": props.level} as React.CSSProperties | { [p: string]: string };

    // case node leaf
    if (!hasChildren)
        return (
            <div className={className} style={style}>
                <NavLink
                    onClick={()=>{
                        dispatch(Pagingreducer.actions.setIsShowMenu(false))
                    }}
                    to={url}
                    className={({ isActive }) => {
                        setTimeout(() => {
                            setActive(isActive);
                        }, 10);

                        return make.className(
                            ["wrap", "link", isActive && "is-active", props.level > 0 && "not-root"],
                            styles,
                        );
                    }}
                >
                    <div>
                        {
                            props.data.icon && (
                                <div className={styles["icon"]}>
                                    <img src={props.data.icon} alt={props.data.title} />
                                </div>
                            )
                        }
                        <div className={styles["title"]}>{props.data.title}</div>
                    </div>
                </NavLink>
            </div>
        );
        

    return (
        <div className={className} style={style}>
            <div
                className={make.className(["wrap", "btn"], styles)}
                onClick={() => {
                    setDisplayChildren((v) => !v);
                }}
            >
                <div style={{ justifyContent: "center", alignItems: "center"}}>
                    <div className={styles["icon"]}>
                        <img src={props.data.icon} alt={props.data.title} />
                    </div>

                    <div className={styles["title"]}>{props.data.title}</div>
                    <div className={styles["drop-down"]}>{displayChildren ? "remove" : "add"}</div>
                </div>
            </div>

            <ul className={make.className(["list", displayChildren && "display"], styles)}>{childrenElements}</ul>
        </div>
    );
}
