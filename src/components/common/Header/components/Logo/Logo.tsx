import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import images from "../../../../../resources/images";

export default function Logo() {
    return (
        <Link className={styles["logo"]} to={"/"}>
            <img src={images.logo} alt="checkee logo" />
        </Link>
    );
}
