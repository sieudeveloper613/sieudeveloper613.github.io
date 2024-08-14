import * as React from 'react';
import { Self } from '.';
import ParticipantsResponse from '../../../../../../sharetype/response/resources/ParticipantsResponse';
import PartnerResponse from '../../../../../../sharetype/response/resources/PartnerResponse';
import Address from '../../../../../../utils/Address';
import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import TPermission, { EParticipantsRole, EnterpriseRole } from '../../../../../../sharetype/TPermission';
export interface IPartnerFormProviderProps {
    useId?: string;
    permission?:TPermission
}

export const PartnerFormContext = React.createContext<{
    permission:TPermission | undefined
    typePartner: string | undefined;
    partnerGroupSelected: string | undefined;
    resources:string|undefined

    dataPartnerSheet: ITableCell[];
    dataParticipantSheet: ITableCell[];

    setTypePartner: React.Dispatch<React.SetStateAction<string | undefined>>;
    setPartnerGroupSelected: React.Dispatch<React.SetStateAction<EnterpriseRole| undefined>>;
}>({} as any);

export default function PartnerFormProvider(props: React.PropsWithChildren<IPartnerFormProviderProps>) {
    // console.log('nhatlog--props',props)
    const {permission} = props
    const [typePartner, setTypePartner] = React.useState<string>();
    const [resources, setResource] = React.useState<string|undefined>();
    const [partnerResData, setPartnerResData] = React.useState<PartnerResponse.TList>();
    const [participantResData, setParticipantResData] = React.useState<ParticipantsResponse.TList>();
    const [partnerGroupSelected, setPartnerGroupSelected] = React.useState<EnterpriseRole>();
    //Funtion declaration start ----------------------
    const loadPartnerData = React.useCallback(async () => {
        const res = await Self.contextApi.listPartner(props.useId);
        if (res.status === 'failure' || !res.data) {
            messageAlert('error', 'Lấy data thất bại');
            return undefined;
        }
        setPartnerResData(res.data);
    }, [props.useId]);
    const dataPartnerSheet: ITableCell[] = React.useMemo(() => {
        if (!partnerResData) return [];
        return partnerResData.map((item, index) => {
            if (!item.data) {
                return {
                    _id: item._id,
                    items: [],
                };
            }
            return {
                _id: item._id,
                items: [
                    item.data.name,
                    Address.instance.makeAddressName(item.data.address),
                    item.data.phone,
                    item.data.email,
                ],
            } as ITableCell;
        });
    }, [partnerResData]);

    const loadParticipant = React.useCallback(
        async (role: string | undefined) => {
            const res = await Self.contextApi.listParticipants(props.useId, role);
            if (res.status === 'failure' || !res.data) {
                messageAlert('error', 'Lấy data thất bại');
                return undefined;
            }
            setParticipantResData(res.data);
        },
        [props.useId],
    );
    const loadParticipantAll = React.useCallback(
        async () => {
            const res = await Self.contextApi.listAllParticipants(props.useId);
            if (res.status === 'failure' || !res.data) {
                messageAlert('error', 'Lấy data thất bại');
                return undefined;
            }
            setParticipantResData(res.data);
        },
        [props.useId],
    );
    const dataParticipantSheet: ITableCell[] = React.useMemo(() => {
        if (!participantResData) return [];
        return participantResData.map((item, index) => {
            const role: EnterpriseRole|undefined  = item.permission?.role
            const typeRole = role ? Self.typeRole[role]: partnerGroupSelected ? Self.typeRole[partnerGroupSelected] : ''
            const typeUser = item.typeUser && item.typeUser != 'undefined'   ? Self.typeUser[item.typeUser] : 'Không xác định'
            return {
                _id: item._id,
                items: [item.name,typeRole,typeUser,item.email,item.gln],
            } as ITableCell;
        });
    }, [participantResData,props.permission?.resource,partnerGroupSelected]);
    //Funtion declaration end ----------------------

    //useEffect start---------------------------

    React.useEffect(() => {
        setPartnerGroupSelected(undefined);
        setParticipantResData([]);
        setPartnerResData([]);
        if (typePartner !== Self.KEY_SELECT.partner ) {
            if(props.useId && !partnerGroupSelected && typePartner ) loadParticipantAll()
            return;
        }
        loadPartnerData();
        
    }, [typePartner]);

    React.useEffect(() => {
        setPartnerResData([]);
        setParticipantResData([]);
        if (!partnerGroupSelected) {
            if(props.useId && typePartner !== Self.KEY_SELECT.partner && typePartner  ) loadParticipantAll()
            return;
        }
        loadParticipant(partnerGroupSelected);
    }, [partnerGroupSelected]);
    React.useEffect(()=>{
        if(props.permission?.resource){setResource(props.permission?.resource)}
    },[props.permission])
    //useEffect end-------------------------
    return (
        <PartnerFormContext.Provider
            value={{
                permission,
                typePartner,
                setTypePartner,
                resources,

                partnerGroupSelected,
                setPartnerGroupSelected,

                dataPartnerSheet,
                dataParticipantSheet,
            }}
        >
            {props.children}
        </PartnerFormContext.Provider>
    );
}
