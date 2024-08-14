import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { Self } from '.';

export const MapDistributionCenterContext = React.createContext<{
    defaultLocation: IDefaultLocation;
    setDefaultLocation: React.Dispatch<React.SetStateAction<IDefaultLocation>>;

    locationPartners: ILocationPartners[];
}>({} as any);

export interface IDefaultLocation {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

export interface ILocationPartners {
    lat: number;
    lng: number;
    name: string;
}

interface IMapDistributionCenterProviderProps { }

const MapDistributionCenterProvider = (props: React.PropsWithChildren<IMapDistributionCenterProviderProps>) => {
    const [locationPartners, setLocationPartners] = useState<ILocationPartners[]>([]);
    const [defaultLocation, setDefaultLocation] = useState<IDefaultLocation>({
        center: {
            lat: 15,
            lng: 108.660172,
        },
        zoom: 6,
    });

    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const dataPartnerAPI = useCallback(async () => {
        const res = await Self.contextApi.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            setLocationPartners([]);
            return;
        }

        if (res.data.length === 0) {
            setLocationPartners([]);
            return;
        }

        res.data.forEach((item) => {
            const dataChild = item.data;
            if (dataChild) {
                const locationPartner = {
                    name: dataChild.name,
                    lat: Number(dataChild.address.lat) || defaultLocation.center.lat++,
                    lng: Number(dataChild.address.lng) || defaultLocation.center.lng++ ,
                } as ILocationPartners;
                setLocationPartners((prev) => [...prev, locationPartner].reverse());
            }
        });
    }, []);

    useEffect(() => {
        dataPartnerAPI();
    }, [dataPartnerAPI]);

    return (
        <MapDistributionCenterContext.Provider
            value={{
                defaultLocation,
                setDefaultLocation,

                locationPartners,
            }}
        >
            {props.children}
        </MapDistributionCenterContext.Provider>
    );
};

export default MapDistributionCenterProvider;
