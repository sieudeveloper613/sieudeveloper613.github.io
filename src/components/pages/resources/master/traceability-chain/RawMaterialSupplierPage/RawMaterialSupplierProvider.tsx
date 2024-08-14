import * as React from 'react';

export interface IRawMaterialSupplierProviderProps {}

export const RawMaterialSupplierContext = React.createContext<{
    displayViewDetail: boolean;
    setDisplayViewDetail: React.Dispatch<React.SetStateAction<boolean>>;

    handlerOnClickButtonView: (id: string) => any;
}>({} as any);
export default function RawMaterialSupplierProvider(props: React.PropsWithChildren<IRawMaterialSupplierProviderProps>) {
    const [displayViewDetail, setDisplayViewDetail] = React.useState<boolean>(false);

    const handlerOnClickButtonView = (id: string) => {
        setDisplayViewDetail(true);
        // alert(id);
    };
    return (
        <RawMaterialSupplierContext.Provider
            value={{
                displayViewDetail,
                setDisplayViewDetail,

                handlerOnClickButtonView,
            }}
        >
            {props.children}
        </RawMaterialSupplierContext.Provider>
    );
}
