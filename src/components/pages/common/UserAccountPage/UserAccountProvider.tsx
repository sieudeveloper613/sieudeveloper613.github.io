import * as React from 'react';
import { TFormData, userAccountValidate, userAccountValidate_Agri, userAccountValidate_Orther } from '.';
import api from '../../../../api';
import useMessageBox from '../../../../hooks/useMessageBox';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import UserFormData from '../../../../sharetype/form-data/resources/master/UserFormData';
import UserResponse from '../../../../sharetype/response/resources/master/UserResponse';
import TPermission, { ETypeUser, EnterpriseRole, TTypeUserRole } from '../../../../sharetype/TPermission';
import IAddress from '../../../../sharetype/types/IAddress';
import Address from '../../../../utils/Address';
import messageAlert from '../../../../utils/messageAlert';
import preProcess from '../../../../utils/preProcess';
import Prettier from '../../../../utils/Prettier';
import Validate from '../../../../utils/Validate';
import { ITableCell } from '../../../common/DataTable';
import userSlice from '../../../../redux/userSlice';

export interface IUserAccountProviderProps {
    permission: TPermission;
    typeUser: TTypeUserRole
}

export const UserAccountContext = React.createContext<{
    dataSheet: ITableCell[];
    typeUser:TTypeUserRole;
    checkValidAll: boolean;
    displayForm: boolean;
    displayFormView: boolean;
    setDisplayFormView: React.Dispatch<React.SetStateAction<boolean>>;
    idUpdate: string | undefined;
    idViewPartner: string | undefined;
    formData: TFormData;
    resData?: any;
    lengthList?:number
    setFormData: React.Dispatch<
        React.SetStateAction<
            Partial<
                Omit<UserFormData.IData, 'address'> & {
                    address: Partial<IAddress>;
                }
            >
        >
    >;
    searchInput:string;
    setSearchInput:React.Dispatch<React.SetStateAction<string>>;
    handlerBtnSearchClick: () => any;
    permission:TPermission|undefined            
    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (_id: string) => any;
    handlerBtnRemoveClick: (_id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => any;
    handlerBtnViewClick: (_id: string) => void;
}>({} as any);

export default function UserAccountProvider(props: React.PropsWithChildren<IUserAccountProviderProps>) {
    // Hook declaration ===================================
    const typeUser = props.typeUser
    const messageBox = useMessageBox();

    // [END] Hook declaration ===================================

    // Ref =======================================================
    const disableAddressDependency = React.useRef<boolean>(false);
    // [END] Ref =================================================

    // State ================================================================
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [permission, setPermission] = React.useState<TPermission|undefined>();
    const [displayFormView, setDisplayFormView] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>(undefined);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [idViewPartner, setIdViewPartner] = React.useState<string | undefined>(undefined);
    const [formData, setFormData] = React.useState<TFormData>({});
    const [resData, setResData] = React.useState<UserResponse.IItem[]>();
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList,setLengthList] = React.useState<number | undefined>(1)
    // [END] State ===========================================================

    // Function declaration =================================

    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)
    const resCertificate = useAppSelector((state) => state.user.resCertificate);
    const certificateWillUpdate = useAppSelector((state) => state.user.certificateWillUpdate);
    const dispatch = useAppDispatch()
    const loadData = React.useCallback(async () => {
        setPermission(props.permission)
        let res
        if(props.permission.role != EnterpriseRole.enterprise){
            res = await api.enterprise.list (props.permission.role as EnterpriseRole,numberOfRowsRedux,numberOfRows)
        }else{
            res = await api.user.list(props.permission,numberOfRowsRedux,numberOfRows);
        }
        if (res.status === 'failure' || !res.data) {
            messageAlert('error', 'Lấy data thất bại');
            return undefined;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [props.permission, numberOfRowsRedux,numberOfRows]);
    
    const loadDataSearch = React.useCallback(async () => {
        setPermission(props.permission)
        const res = await api.user.listSearch(props.permission,searchInput,numberOfRows);
        if (res.status === 'failure' || !res.data) {
            messageAlert('error', 'Lấy data thất bại');
            return undefined;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [props.permission, searchInput,numberOfRows]);
    const create = React.useCallback(
        async (formDataValidated: UserFormData.ICreate) => {
            let res 
            if(props.permission.role == EnterpriseRole.enterprise){
                res = await api.user.create(formDataValidated);
            }else{
                res = await api.enterprise.create(formDataValidated,props.permission.role as EnterpriseRole);
            }
            if (res.status === 'existed') {
                messageAlert('error', `${res.data}`);
                return;
            }
            if (res.status !== 'successfully') {
                messageAlert('error', 'Đăng ký thất bại');
                return;
            }
            

            dispatch(userSlice.actions.setResCertificate([]))
            loadData();
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
        },
        [loadData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: UserFormData.IUpdate) => {
            let res 
            if(props.permission.role == EnterpriseRole.enterprise){
                res = await api.user.update(_id, formDataValidated);
            }else{
                res = await api.enterprise.update(_id,formDataValidated,props.permission.role as EnterpriseRole);
            }

            if (res.status === 'failure') {
                messageAlert('error', 'Mã GLN đã tồn tại !');
                return;
            }
            if (res.status !== 'successfully') {
                messageAlert('error', 'Thất bại');
                return;
            }

            const itemWillDelete:{filename:string}[] = []
            resCertificate?.forEach((itemA)=>{
                const isEixst = certificateWillUpdate?.every((itemB)=>{
                    return itemA.filename !== itemB.filename 
                })
                if(isEixst){
                    itemWillDelete.push({filename:itemA.filename})
                }
            })
            if(itemWillDelete.length>0){
                const resDelete =await api.user.deleteManyCertificate(itemWillDelete)
                if(resDelete){
                    dispatch(userSlice.actions.setResCertificate([]))
                    dispatch(userSlice.actions.setCertificateWillUpdate([]))
                }
            }else{
                dispatch(userSlice.actions.setResCertificate([]))
                dispatch(userSlice.actions.setCertificateWillUpdate([]))
            }
            
            loadData();
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {

            let res 
            if(props.permission.role == EnterpriseRole.enterprise){
                res = await api.user.remove(_id);
            }else{
                res = await api.enterprise.remove(_id,props.permission.role as EnterpriseRole);
            }
            if (res.status !== 'successfully') {
                messageAlert('error', 'Xóa thất bại');
                return;
            }

            messageAlert('success', 'Xóa thành công');
            loadData();
        },
        [loadData],
    );

    const dataSheet: ITableCell[] = React.useMemo(() => {
      
        if (!resData) return [];
        const _resData = resData;
        return _resData.map((item) => {
            let listData = [
                //==
                item.name, //==
                item.taxCode,
                Address.instance.makeAddressName(item.address), //==
                Prettier.phoneNumber(item.phone), //==
                item.email, //==
            ]
            if(typeUser != ETypeUser.other && typeUser != ETypeUser.enterprise ){
                listData =[
                    item.name, //==
                    item.gln,
                    item.email, //==
                    Address.instance.makeAddressName(item.address), //==
                    item.taxCode,
                    ]
        
            } else if(typeUser == ETypeUser.other){
                listData =[
                    item.name, //==
                    item.gln,
                    item.email, //==
                    Address.instance.makeAddressName(item.address), //==
                    item.phone,
                    ]
            }
            return {
                _id: item._id,
                items: listData,
            } as ITableCell;
        });
    }, [resData]);

    // [END] Function declaration =================================

    // Event handler ============================================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);
    const handlerBtnSearchClick = (() => {
        if(!searchInput){
            loadData()
        }else{
            loadDataSearch()
        }
        setSearchInput('')
    });
    const handlerBtnUpdateClick = React.useCallback(
        (_id: string) => {
            const updatingItem = resData?.find((item) => item._id === _id);
            if (!updatingItem) return;

            disableAddressDependency.current = true;

            setIdUpdate(_id);
            setFormData((prev) => ({
                ...prev,
                ...updatingItem,
                address: {
                    ...updatingItem.address,
                },
            }));
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
        },
        [resData],
    );

    const handlerBtnRemoveClick = React.useCallback(
        async (_id: string) => {
            messageBox({
                message: 'Bạn có chắc muốn xóa',
                buttons: [
                    {
                        label: 'Có',
                        onClick() {
                            remove(_id);
                        },
                    },
                    {
                        label: 'Đóng',
                    },
                ],
            });

            return;
        },
        [remove, messageBox],
    );

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true);
        // validate
        const validateCheck = await Validate.check(formData, typeUser == ETypeUser.enterprise ?userAccountValidate : typeUser == ETypeUser.other ? userAccountValidate_Orther:userAccountValidate_Agri)
        if (!validateCheck) {
            // <= Important!
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !');
        }

        const formDataProcessed: UserFormData.IData = {
            gln:formData.gln || '',
            name: (formData.name || '').trim(),
            phone: formData?.phone ? preProcess.removeAllSpace(formData.phone as string):'',
            email: preProcess.removeAllSpace(formData.email as string),
            taxCode: formData?.taxCode ? preProcess.removeAllSpace(formData.taxCode as string):'',
            address: {
                city: formData.address?.city as string,
                district: formData.address?.district as string,
                ward: formData.address?.ward as string,
                addressLine: (formData.address?.addressLine as string).trim(),
                lat: preProcess.removeAllSpace(formData.address?.lat || '0'),
                lng: preProcess.removeAllSpace(formData.address?.lng || '0'),
            },
            permission: {
                ...props.permission,
            },
            typeUser:props.typeUser,
            certificate:  (!idUpdate ? resCertificate : certificateWillUpdate) || [] 
        };
        // create
        if (!idUpdate) {
            create(formDataProcessed);
            setCheckValidAll(false);
            return;
        }

        // update
        update(idUpdate, formDataProcessed);
        setCheckValidAll(false);
    };
    
    const handlerBtnCloseClick = async() => {
        if(!idUpdate){
            if(resCertificate && resCertificate.length >0){
                const listFilename = resCertificate.map((item)=>{return {filename:item.filename}})
                const res =await api.user.deleteManyCertificate(listFilename)
                if(res){
                    dispatch(userSlice.actions.setResCertificate([]))
                    setCheckValidAll(false);
                    setDisplayForm(false);
                }else{
                    alert('Hình ảnh bị xoá thất bại')
                    setCheckValidAll(false);
                    setDisplayForm(false);
                }
            }else{
                setCheckValidAll(false);
                setDisplayForm(false);
            }
        }else{
            const itemWillDelete:{filename:string}[] = []
            certificateWillUpdate?.forEach((itemA)=>{
                const isEixst = resCertificate?.every((itemB)=>{
                    return itemA.filename !== itemB.filename 
                })
                if(isEixst){
                    itemWillDelete.push({filename:itemA.filename})
                }
            })
            if(itemWillDelete.length>0){
                const res =await api.user.deleteManyCertificate(itemWillDelete)
                if(res){
                    dispatch(userSlice.actions.setResCertificate([]))
                    dispatch(userSlice.actions.setCertificateWillUpdate([]))
                    setCheckValidAll(false);
                    setDisplayForm(false);
                }else{
                    alert('Hình ảnh bị xoá thất bại')
                    setCheckValidAll(false);
                    setDisplayForm(false);
                }
            }else{
                dispatch(userSlice.actions.setResCertificate([]))
                dispatch(userSlice.actions.setCertificateWillUpdate([]))
                setCheckValidAll(false);
                setDisplayForm(false);
            }
            
        }
        
    };

    const handlerBtnViewClick = React.useCallback((_id: string) => {
        setDisplayFormView(true);
        setIdViewPartner(_id);
    }, []);

    // [End] Event handler ============================================

    // Effect =========================================================

    // Update options in district selection and ward selection when city changed
    React.useEffect(() => {
        if (disableAddressDependency.current) {
            return;
        }
        setFormData((preState) => {
            return {
                ...preState,
                address: {
                    ...preState.address,
                    district: undefined,
                    ward: undefined,
                },
            };
        });
    }, [formData.address?.city, disableAddressDependency]);
    // Update options in ward selection when district changed
    React.useEffect(() => {
        if (disableAddressDependency.current) {
            return;
        }
        setFormData((preState) => {
            return {
                ...preState,
                address: {
                    ...preState.address,
                    ward: undefined,
                },
            };
        });
    }, [formData.address?.district]);

    // Enable address dependency when fromData changed
    React.useEffect(() => {
        disableAddressDependency.current = false;
    }, [formData]);

    // Reset formData after close form
    React.useEffect(() => {
        if (displayForm) return;
        setFormData({});
        setIdUpdate(undefined);
    }, [displayForm]);

    // Load data when page did mount
    React.useEffect(() => {
        loadData();
    }, [loadData]);

    // [END] Effect ======================================================

    return (
        <UserAccountContext.Provider
            value={{
                typeUser,
                dataSheet,
                permission,
                displayForm,
                displayFormView,
                setDisplayFormView,
                searchInput,
                setSearchInput,
                handlerBtnSearchClick,
                idUpdate,
                idViewPartner,
                checkValidAll,
                resData,
                formData,
                setFormData,
                lengthList,

                //
                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnCloseClick,
                handlerBtnViewClick,
            }}
        >
            {props.children}
        </UserAccountContext.Provider>
    );
}
