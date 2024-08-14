import * as React from "react";
import MessageBoxContainer from "./MessageBoxContainer";
import { IMessageBox } from "../../../hooks/useMessageBox";

export interface IMessageBoxItem extends IMessageBox {
    _id: string;
}

export interface IMessageBoxProviderProps {}

export const MessageBoxContext = React.createContext<{
    data: IMessageBoxItem[];
    setData: React.Dispatch<React.SetStateAction<IMessageBoxItem[]>>;
}>({} as any);

export default function MessageBoxProvider(props: React.PropsWithChildren<IMessageBoxProviderProps>) {
    const [data, setData] = React.useState<IMessageBoxItem[]>([]);

    return (
        <MessageBoxContext.Provider
            value={{
                data,
                setData,
            }}
        >
            {props.children}
            <MessageBoxContainer />
        </MessageBoxContext.Provider>
    );
}
