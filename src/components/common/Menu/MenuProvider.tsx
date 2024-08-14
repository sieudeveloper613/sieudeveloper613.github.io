import React from 'react';

type MenuProps = {};

export const MenuContext = React.createContext<{}>({} as any);

const MenuProvider = (props: MenuProps) => {
    return <MenuContext.Provider value={{}}></MenuContext.Provider>;
};

export default MenuProvider;
