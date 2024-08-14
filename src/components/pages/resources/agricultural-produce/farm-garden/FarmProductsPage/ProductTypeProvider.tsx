import * as React from 'react';
//
import { Self } from '.';

import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';

import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import { IOption } from '../../../../../common/Selection';
import { ITextFieldButtonEventData } from '../../../../../common/TextField/types';

import api from '../../../../../../api';
import { ICertificate } from '../../../../../../sharetype/form-data/resources/master/UserFormData/UserFormData';
import userSlice from '../../../../../../redux/userSlice';
import EnterpriseProductFormData from '../../../../../../sharetype/form-data/resources/enterprise/EnterpriseProductFormData';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';

export const ProductTypeContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number;
    idUpdate: string | undefined;
    representPicture:ICertificate[];
   
    productName: string;
    setProductName: React.Dispatch<React.SetStateAction<string>>;

    productGtin: string;
    setProductGtin: React.Dispatch<React.SetStateAction<string>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    formType: string;
    setFormType: React.Dispatch<React.SetStateAction<string>>;

    selectedItem: string | undefined;
    setSelectedItem: React.Dispatch<React.SetStateAction<string | undefined>>;

    handlerBtnCreateClick: () => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnClose: () => any;
    handlerBtnSearchClick: () => void;
    handlerBtnRemoveItemsClick: (_id: string) => any;
}>({} as any);

export interface IOptionExtend extends IOption {
    code?: string;
}

interface IPartnerProviderProps { }

export default function PartnerProvider(props: React.PropsWithChildren<IPartnerProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const itemFormDataRef = React.useRef<Self.TItemsFormData>(null as any);
    const nameRef = React.useRef<string>('');
    const gtinRef = React.useRef<string>('');
    // State =========================================================

    const [resData, setResData] = React.useState<EnterpriseProductFormData.IData[] | undefined>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [productName, setProductName] = React.useState<string>('');
    const [productGtin, setProductGtin] = React.useState<string>('');
    const [representPicture, setRepresentPicture] = React.useState<ICertificate[]>([]);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [formType, setFormType] = React.useState<string>('');
    const [itemsFormData, setItemsFormData] = React.useState<Self.TItemsFormData[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<string | undefined>()

    // Function definition ===============================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)
    console.log("pagesss: ", { numberOfRows, numberOfRowsRedux})
    const resPicture = useAppSelector((state) => state.user.resPicture);
    const pictureWillUpdate = useAppSelector((state) => state.user.pictureWillUpdate);
    const dispatch = useAppDispatch()
    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows);
        console.log("product-res: ", res);
        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu thất bại !');
        }
        setLengthList(res.count)
        console.log('object',res.data);
        setResData(res.data)
    }, [numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: EnterpriseProductFormData.ICreate) => {
            const res = await Self.apiContext.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Tạo thất bại !');
            }
            dispatch(userSlice.actions.setResPicture([]))
            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const update = React.useCallback(
        async (
            _id: string,
            formDataValidated: EnterpriseProductFormData.ICreate,
            // ============
        ) => {
            const res = await Self.apiContext.update(_id, formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Cập nhật thất bại !');
            }
            const itemWillDelete:{filename:string}[] = []
            resPicture?.forEach((itemA)=>{
                const isEixst = pictureWillUpdate?.every((itemB)=>{
                    return itemA.filename !== itemB.filename 
                })
                if(isEixst){
                    itemWillDelete.push({filename:itemA.filename})
                }
            })
            if(itemWillDelete.length>0){
                const resDelete =await api.user.deleteManyCertificate(itemWillDelete)
                if(resDelete){
                    dispatch(userSlice.actions.setResPicture([]))
                    dispatch(userSlice.actions.setPictureWillUpdate([]))
                }
            }else{
                dispatch(userSlice.actions.setResPicture([]))
                dispatch(userSlice.actions.setPictureWillUpdate([]))
            }

            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await Self.apiContext.remove(_id);

            if (res.status === 'failure') {
                messageAlert('error', 'Thất bại');
                return;
            }

            messageAlert('success', 'Thành công');
            loadData();
        },
        [loadData],
    );

    // Memo ==================================

    const itemsManager = React.useMemo(() => {
        return Object.freeze({
            add(obj: {
                _id: string;
                name: string,
                GTIN?: string;
                code?: string,
                type?: number,
                quantity: number,
            }) {
                setItemsFormData((preState) => {
                    const result =
                        [
                            ...preState,
                            {
                                ...obj
                            },
                        ]
                    return result;
                });
            },

            remove(_id: string) {
                setItemsFormData((preState) => {
                    const newState = preState.filter((item) => item._id !== _id);
                    return newState;
                });
            },

            reset() {
                setItemsFormData([]);
            },
        });
    }, []);

    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const gtinAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[1].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    // update ref ================================


    // Event handler ===============================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnRemoveClick = React.useCallback(
        (_id: string) => {
            console.log('Check idUpdate 8', _id);
            messageBox({
                message: 'Bạn có chắc muốn xóa không ?',
                buttons: [
                    {
                        label: 'Có',
                        onClick: () => {
                            remove(_id);
                        },
                    },
                    {
                        label: 'Đóng',
                    },
                ],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnUpdateClick = React.useCallback(async (_id: string) => {
        setIdUpdate(_id);
        setDisplayForm(true)
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    }, []);

    const handlerBtnSaveClick =  () => {
        setCheckValidAll(true);
        if (!productName || !productGtin) {
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !')
        }

        if(!idUpdate){
            const gtin = productGtin

            if (nameAdded.has(productName.toLowerCase())) {
                messageAlert('warning', `Bạn đã thêm sản phẩm này rồi !`);
                return;
            }
            else if( gtinAdded.has(productGtin.toLowerCase())) {
                messageAlert('warning', `Bạn đã thêm mã GTIN này rồi !`);
                return;
            }
            else {
                create({
                    productName,
                    gtin,
                    
                });
    
                return;
        }
            // if((materialsDataSheet.length === 0 && formType === 'DON')){
            //     messageAlert('warning', `Bạn cần thêm tối thiểu một nguyên liệu!`);
            //     return;
            // }
            // if(productsDataSheet.length === 0 && formType != 'DON'){
            //     messageAlert('warning', `Bạn cần thêm tối thiểu một ${formType == 'HOP'? 'sản phẩm':'hộp sản phẩm'}!`);
            //     return;
            // }
            // if (nameAdded.has(productName.toLowerCase())) {
            //     if (nameAdded.has(productName.toLowerCase()) && codeAdded.has(barcode.toLowerCase()) && barcode == barcodeInit && !isItemsChanged && expireDate == expireDateInit ) {
            //     messageAlert('warning', `Không có sự thay đổi nào !`);
            //     setDisplayForm(false)
            //     return;
            // }
            
        } 

        update(idUpdate, {
            productName: productName,
            gtin: productGtin,

        });
        setCheckValidAll(false);

        return
    };

    const handlerBtnClose = async() => {
        if(!idUpdate){
            if(resPicture && resPicture.length >0){
                const listFilename = resPicture.map((item)=>{return {filename:item.filename}})
                const res =await api.user.deleteManyCertificate(listFilename)
                if(res){
                    dispatch(userSlice.actions.setResPicture([]))
                }else{
                    alert('Hình ảnh bị xoá thất bại')
                }
            }
        }else{
            const itemWillDelete:{filename:string}[] = []
            pictureWillUpdate?.forEach((itemA)=>{
                const isEixst = resPicture?.every((itemB)=>{
                    return itemA.filename !== itemB.filename 
                })
                if(isEixst){
                    itemWillDelete.push({filename:itemA.filename})
                }
            })
            if(itemWillDelete.length>0){
                const res =await api.user.deleteManyCertificate(itemWillDelete)
                if(res){
                    dispatch(userSlice.actions.setResPicture([]))
                    dispatch(userSlice.actions.setPictureWillUpdate([]))
                }else{
                    alert('Hình ảnh bị xoá thất bại')
                }
            }else{
                dispatch(userSlice.actions.setResPicture([]))
                dispatch(userSlice.actions.setPictureWillUpdate([]))
            }
            
        }
        setCheckValidAll(false);
        setDisplayForm(false);
    };

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return processKeyword(item.productName).toLocaleLowerCase().includes(searchInput.toLocaleLowerCase().trim())
                || item.gtin?.includes(searchInput.trim())
        })
        if (filterData) {

            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        // _id: item._id,
                        items: [
                            //==
                            item.productName,
                            item.gtin, //==
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])


    const handlerBtnRemoveItemsClick = (_id: string) => {
        console.log('Check id ', _id);
        itemsManager.remove(_id)
    }

    // Effect =======================================

    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            if (item) {
                return {
                    _id: item._id,
                    items: [
                        item.productName, //==
                        item.gtin,
                    ],
                } as ITableCell;
                
            }
            return {} as ITableCell;
        }))
    }, [resData]);

    // Load data when page did mount
    React.useEffect(() => {
        loadData();
    }, [loadData]);



    // Clear up formData when Form close
    React.useEffect(() => {
        if (displayForm) return;
        setProductGtin('')
        setIdUpdate(undefined)
        console.log('Check idUpdate 10', idUpdate);
        setRepresentPicture([])
        setProductName('')
        setSelectedItem(undefined)
        itemsManager.reset()
    }, [displayForm]);
    return (
        <ProductTypeContext.Provider
            value={{
                checkValidAll,
                displayForm,
                setDisplayForm,
                dataSheet,
                resData,
                representPicture,
                lengthList,
                idUpdate,

                productName,
                setProductName,

                productGtin,
                setProductGtin,

                searchInput,
                setSearchInput,

                formType,
                setFormType,

                selectedItem,
                setSelectedItem,

                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnClose,
                handlerBtnSearchClick,
                handlerBtnRemoveItemsClick,
            }}
        >
            {props.children}
        </ProductTypeContext.Provider>
    );
}
