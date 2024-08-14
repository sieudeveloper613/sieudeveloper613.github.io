import * as React from 'react';
import IAddress from '../../sharetype/types/IAddress';

export interface IAddressHelperContainerProps {
    value?: IAddress;
    onChange?: (v: IAddress) => any;
}

export const AddressHelperContext = React.createContext<{
    selectedCity: string | undefined;
    setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedDistrict: string | undefined;
    setSelectedDistrict: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedWard: string | undefined;
    setSelectedWard: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({} as any);

export default function AddressHelperContainer(props: React.PropsWithChildren<IAddressHelperContainerProps>) {
    const [selectedCity, setSelectedCity] = React.useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = React.useState<string | undefined>();
    const [selectedWard, setSelectedWard] = React.useState<string | undefined>();

    React.useEffect(() => {
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
    }, [selectedCity]);

    React.useEffect(() => {
        setSelectedWard(undefined);
    }, [selectedDistrict]);

    return (
        <AddressHelperContext.Provider
            value={{
                selectedCity,
                setSelectedCity,

                selectedDistrict,
                setSelectedDistrict,

                selectedWard,
                setSelectedWard,
            }}
        >
            {props.children}
        </AddressHelperContext.Provider>
    );
}
