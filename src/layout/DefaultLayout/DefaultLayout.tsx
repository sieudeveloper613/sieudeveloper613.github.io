import * as React from "react";

/* components */
import NavBar from "../../components/common/NavBar";
import Header from "../../components/common/Header/Header";

/* packages */
import { Outlet } from "react-router-dom";

/* styles */
import styles from "./DefaultLayout.module.scss";

/* configurations */
import make from "../../utils/make";

export interface IDefaultLayoutProps {
    layout?: undefined | null
}

export default function DefaultLayout(props: React.PropsWithChildren<IDefaultLayoutProps>) {
    const { layout } = props;

    return (
        <div className={make.className([styles[`${layout === null ? "default-layout-client" : "default-layout"}`]])}>
            {layout === null ? <></> : <Header />}

            <div className={styles[`container`]}>
                {
                    layout === null ?
                        <></>
                        :
                        <div className="navbar">
                            <NavBar />
                        </div>
                }
                <main className={styles[`${layout === null ? "full" : ""}`]}>
                    {props.children}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
