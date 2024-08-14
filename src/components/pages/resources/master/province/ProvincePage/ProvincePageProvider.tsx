import * as React from 'react';
import { ITableCell } from '../../../../../common/DataTable';
// import dayjs from 'dayjs';
import api from '../../../../../../api';
// import { IUser } from '../../../../../../sharetype/response/resources/PartnerResponse/PartnerResponse';
import messageAlert from '../../../../../../utils/messageAlert';
// import AgriculturalContainerResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/AgriculturalContainerResponse';
import { ICity, IDistrict, IWards } from '../../../../../../sharetype/response/resources/master/UserResponse/UserResponse';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import preProcess from '../../../../../../utils/preProcess';
import Address from '../../../../../../utils/Address';
export interface IButtonData {
    value: string;
    label: string;
}
export const ProvinceContext = React.createContext<{
    dataCity: {
        label: string;
        value: string;
    }[] | undefined;
    dataDistrict: {
        label: string;
        value: string;
    }[] | undefined;
    dataWard: {
        label: string;
        value: string;
    }[] | undefined;
    dataTableCity: ITableCell[] | undefined;
    dataTableDistrict: ITableCell[] | undefined;
    dataTableWard: ITableCell[] | undefined;
    resCity: ICity[] | undefined;
    resDistrict: IDistrict[] | undefined;
    resWard: IWards[] | undefined;
    selectedObj: string | undefined;
    setSelectedObj: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedProductType: string | undefined;
    onChangeSelectProductType: (v: string | undefined) => void;

    dates: string[] | undefined;
    setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>;


    idUpdate : string | undefined;
    displayForm : boolean;
    checkValidAll : boolean;
    setCheckValidAll: React.Dispatch<React.SetStateAction<boolean>>;
    formData : TFormData;
    setFormData : React.Dispatch<React.SetStateAction<TFormData>>
    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    // btnViewReportClick: () => void;
}>({} as any);

interface IStatisticalReportsProviderProps {}
export interface IDataChart {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}
type TFormData = Partial<IWards>;


export default function ProvincePageProvider(props: React.PropsWithChildren<IStatisticalReportsProviderProps>) {
   
    const [selectedObj, setSelectedObj] = React.useState<string | undefined>(undefined);
    const [selectedProductType, setSelectedProductType] = React.useState<string | undefined>(undefined);
    const [dates, setDates] = React.useState<string[] | undefined>();

    const [dataCity, setDataCity] = React.useState<IButtonData[] | undefined>(undefined);
    const [dataDistrict, setDataDistrict] = React.useState<IButtonData[] | undefined>(undefined);
    const [dataWard, setDataWard] = React.useState<IButtonData[] | undefined>(undefined);
    const [resCity, setResCity] = React.useState<ICity[] | undefined>(undefined);
    const [resDistrict, setResDistrict] = React.useState<IDistrict[] | undefined>(undefined);
    const [resWard, setResWard] = React.useState<IWards[] | undefined>(undefined);
    const [dataTableCity, setDataTableCity] = React.useState<ITableCell[] | undefined>();
    const [dataTableDistrict, setDataTableDistrict] = React.useState<ITableCell[] | undefined>();
    const [dataTableWard, setDataTableWard] = React.useState<ITableCell[] | undefined>();
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined); 
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<TFormData>({});

    const messageBox = useMessageBox();
    
    const loadData =async (code:string|undefined) => {
        if(!code){
            setResDistrict(undefined)
            setResWard(undefined)
            setDataTableDistrict(undefined)
            setDataTableWard(undefined)
            const res = await api.user.listAllCity()
            if (res.status === 'failure') {
                messageAlert('error', 'Lấy data thất bại');
                return undefined;
            }
            setResCity(res.data)
            
            setDataTableCity(res.data.map((item) => {
                return {
                    _id: item.code,
                    items: [item.code, item.name, item.class],
                } as ITableCell;
            }))
            setDataCity((preState)=>{
                const state = res.data.map((item)=>{
                    return  ({
                        label: item.name,
                        value: item.code,
                    })
                })
                return state
            })
        } else if(code && selectedObj){
            setResCity(undefined)
            setResDistrict(undefined)
            setDataTableCity(undefined)
            setDataTableDistrict(undefined)
            const res = await api.user.modifyProvince.getWardByDistrict(selectedObj)
            if (res.status === 'failure') {
                messageAlert('error', 'Lấy data thất bại');
                return undefined;
            }
            setResWard(res.data)
            setDataTableWard(res.data.map((item) => {
                return {
                    _id: item.code,
                    items: [item.code, item.name, item.class],
                } as ITableCell;
            }))
        }else{
            setResCity(undefined)
            setResWard(undefined)
            setDataTableWard(undefined)
            setDataTableCity(undefined)
            const res = await api.user.modifyProvince.getDistrictByCity(code)
            if (res.status === 'failure') {
                messageAlert('error', 'Lấy data thất bại');
                return undefined;
            }
            setResDistrict(res.data)
            setDataTableDistrict(res.data.map((item) => {
                return {
                    _id: item.code,
                    items: [item.code, item.name, item.class],
                } as ITableCell;
            }))
            
            setDataDistrict((preState)=>{
                const state = res.data.map((item)=>{
                    return  ({
                        label: item.name,
                        value: item.code,
                    })
                })
                return state
            })
        }
        // await Address.instance.reloadAddress()
    }
    const remove =async (id:any,type:string) => {
        const res = await api.user.modifyProvince.removeProvince(id,type);

        if (res.status !== 'successfully') {
            messageAlert('error', 'Xóa thất bại');
            return;
        }

        messageAlert('success', 'Xóa thành công');
        loadData(selectedProductType);
    }
    const update =async (_id:string,formDataValidated:any,type: string) => {
        const res = await api.user.modifyProvince.updateProvince(_id, formDataValidated,type);

            if (res.status !== 'successfully') {
                messageAlert('error', 'Thất bại');
                return;
            }
            loadData(selectedProductType);
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
    }
    const create =async (formDataValidated:any,type:string) => {
        const res = await api.user.modifyProvince.createProvince(formDataValidated,type);

            if (res.status !== 'successfully') {
                messageAlert('error', 'Thất bại');
                return;
            }

            loadData(selectedProductType);
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
    }
    const onChangeSelectProductType = (v: string | undefined) => {
        if(!v){
            setDataDistrict(undefined)
        }
        setSelectedProductType(v);
        setSelectedObj(undefined);
    };
    const handlerBtnCreateClick = React.useCallback (()=>{
        setIdUpdate(undefined);
        setDisplayForm(true);
    },[])
    const handlerBtnUpdateClick =  React.useCallback((_id:string)=>{
        const resData = resCity? resCity : resDistrict ? resDistrict : resWard
        const updatingItem = resData?.find((item) => item.code === _id);
            if (!updatingItem) return;
            setIdUpdate(_id);
            setFormData((prev) => ({
                ...prev,
                ...updatingItem,
               
            }));
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
    },[resCity,resDistrict,resWard])
    const handlerBtnRemoveClick =  React.useCallback(
        async (_id: string) => {
            const type = !selectedProductType ? 'C': (selectedProductType && !selectedObj)?'D':'W'
            messageBox({
                message: 'Bạn có chắc muốn xóa',
                buttons: [
                    {
                        label: 'Có',
                        onClick() {
                            remove(_id,type);
                        },
                    },
                    {
                        label: 'Đóng',
                    },
                ],
            });

            return;
    },[remove, messageBox])
    const handlerBtnSaveClick =  async()=>{
        let type 
        let formDataProcessed: Partial<IWards>
        if(!selectedProductType){
            formDataProcessed = {
                name: (formData.name || '').trim(),
                code: preProcess.removeAllSpace(formData.code as string),
                class: (formData.class || '').trim(),
            };
            type = 'C'
        }else if(selectedProductType && !selectedObj){
            formDataProcessed = {
                name: (formData.name || '').trim(),
                code: preProcess.removeAllSpace(formData.code as string),
                class: (formData.class || '').trim(),
                codeCity: selectedProductType,
            };
            type = 'D'
        }else {
            formDataProcessed = {
                name: (formData.name || '').trim(),
                code: preProcess.removeAllSpace(formData.code as string),
                class: (formData.class || '').trim(),
                codeCity: selectedProductType,
                codeDistrict: selectedObj,
            };
            type = 'W'
        }
        
        if(type == 'C'){
            const isExist = resCity?.find((item)=> (item.code == formDataProcessed.code || item.name == formDataProcessed.name))
            if(isExist){
                messageAlert('warning', 'Mã hoặc tên đơn vị hành chính đã tồn tại');
                return;
            }
        }
        if(type == 'D'){
            const isExist = resDistrict?.find((item)=> (item.code == formDataProcessed.code || item.name == formDataProcessed.name ))
            if(isExist){
                messageAlert('warning', 'Mã hoặc tên đơn vị hành chính đã tồn tại');
                return;
            }
        }
        if(type == 'W'){
            const isExist = resWard?.find((item)=> (item.code == formDataProcessed.code || item.name == formDataProcessed.name ))
            if(isExist){
                messageAlert('warning', 'Mã hoặc tên đơn vị hành chính đã tồn tại');
                return;
            }
        }
        // create
        if (!idUpdate) {
            create(formDataProcessed,type);
            setCheckValidAll(false);
            return;
        }

        // update
        update(idUpdate, formDataProcessed,type);
        setCheckValidAll(false);
    }
    const handlerBtnCloseClick =  async()=>{
                setCheckValidAll(false);
                setDisplayForm(false);
            }

    React.useEffect(() => {
        if (displayForm) return;
        setFormData({});
        setIdUpdate(undefined);
    }, [displayForm]);
    
    React.useEffect(() => {
        loadData(selectedProductType)
    }, [selectedProductType,selectedObj]);

    return (
        <ProvinceContext.Provider
            value={{
                dataTableCity,
                dataTableDistrict,
                dataTableWard,
                idUpdate ,
                displayForm ,
                checkValidAll ,
                formData ,
                setFormData,
                resCity,
                resDistrict,
                resWard,
                setCheckValidAll,
                dataCity,
                dataDistrict,
                dataWard,

                selectedObj,
                setSelectedObj,

                dates,
                setDates,

                selectedProductType,
                onChangeSelectProductType,
                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnCloseClick,
            }}
        >
            {props.children}
        </ProvinceContext.Provider>
    );
}
