import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Dropdown.module.scss';
export interface IContentDropdown {
    url: string;
    title?: string;
    icon?: string;
}
export interface IDropdownProps {
    items?: IContentDropdown[];
}
export default function Dropdown(props: IDropdownProps) {
    return (
        <div className={styles['list-drop-container']}>
            <div className={styles['list-drop']}>
                {props.items &&
                    props.items.length > 0 &&
                    props.items.map((item, index) => {
                        return (
                            <NavLink to={item.url} className={styles['list-item']} key={`${index}_dhfdls`}>
                                <div className={styles['icon']}>{item.icon}</div>
                                <span>{item.title}</span>
                            </NavLink>
                        );
                    })}
            </div>
        </div>
    );
}
