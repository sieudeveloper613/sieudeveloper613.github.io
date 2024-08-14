import * as React from 'react';
//
import { Self } from '.';

import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';

import messageAlert from '../../../../../../utils/messageAlert';
import { ITableCell } from '../../../../../common/DataTable';
import { IOption } from '../../../../../common/Selection';
import { ITextFieldButtonEventData } from '../../../../../common/TextField/types';

import ProductsNamesResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
import ProductsNamesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';
import CountryResponse from '../../../../../../sharetype/response/resources/customer-products/processing-facility/CountryResponse';
import api from '../../../../../../api';
import localStorageClient from '../../../../../../core/localStorageClient';
import { ICertificate } from '../../../../../../sharetype/form-data/resources/master/UserFormData/UserFormData';
import userSlice from '../../../../../../redux/userSlice';

export const ProductTypeContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number;
    materialsDropdown: IOption[];
    productsDropdown: IOption[];
    productContainersDropdown: IOption[];
    materialsDataSheet: ITableCell[];
    productsDataSheet: ITableCell[];
    productContainersDataSheet: ITableCell[];
    idUpdate: string | undefined;
    representPicture:ICertificate[];
    countryData: IOption[];
    setCountryData:React.Dispatch<React.SetStateAction<IOption[]>>;

    barcode: string | undefined;
    setBarcode: React.Dispatch<React.SetStateAction<string | undefined>>;

    productName: string;
    setProductName: React.Dispatch<React.SetStateAction<string>>;
    expireDate:string;
    setExpireDate:React.Dispatch<React.SetStateAction<string>>;
    country: string| undefined;
    setCountry: React.Dispatch<React.SetStateAction<string| undefined>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    formType: string;
    setFormType: React.Dispatch<React.SetStateAction<string>>;

    selectedItem: string | undefined;
    setSelectedItem: React.Dispatch<React.SetStateAction<string | undefined>>;

    unitType: number;
    setUnitType: React.Dispatch<React.SetStateAction<number>>;

    unitByPercent: string | undefined;
    setUnitByPercent: React.Dispatch<React.SetStateAction<string | undefined>>;

    unitByWeight: string | undefined;
    setUnitByWeight: React.Dispatch<React.SetStateAction<string | undefined>>;

    unitByQuantity: string | undefined;
    setUnitByQuantity: React.Dispatch<React.SetStateAction<string | undefined>>;

    handlerBtnCreateClick: () => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnClose: () => any;
    handlerBtnSearchClick: () => void;
    handlerBtnAddItemsClick: (e: ITextFieldButtonEventData) => any;
    handlerBtnRemoveItemsClick: (_id: string) => any;
    handlerBtnFilterClick: (v: string) => any;
}>({} as any);

export interface IOptionExtend extends IOption {
    code?: string;
}

interface IPartnerProviderProps { }

export default function PartnerProvider(props: React.PropsWithChildren<IPartnerProviderProps>) {
    const messageBox = useMessageBox();

    // Ref ===========================================================
    const materialsNamesAddedRef = React.useRef<Set<string>>(null as any);
    const productsNamesAddedRef = React.useRef<Set<string>>(null as any);
    const productContainersNamesAddedRef = React.useRef<Set<string>>(null as any);

    // State =========================================================

    const [resData, setResData] = React.useState<ProductsNamesResponse.Tlist | undefined>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [barcode, setBarcode] = React.useState<string | undefined>();
    const [productName, setProductName] = React.useState<string>('');
    const [expireDate, setExpireDate] = React.useState<string>('');
    const [expireDateInit, setExpireDateInit] = React.useState<string>('');
    const [barcodeInit, setBarcodeInit] = React.useState<string | undefined>();
    const [productNameInit, setProductNameInit] = React.useState<string>('');
    const [country, setCountry] = React.useState<string| undefined>();
    const [countryData, setCountryData] = React.useState<IOption[]>([]);
    const [representPicture, setRepresentPicture] = React.useState<ICertificate[]>([]);
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [formType, setFormType] = React.useState<string>('');
    const [itemsFormData, setItemsFormData] = React.useState<Self.TItemsFormData[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<string | undefined>()
    const [unitType, setUnitType] = React.useState<number>(1)
    const [unitByPercent, setUnitByPercent] = React.useState<string | undefined>()
    const [unitByWeight, setUnitByWeight] = React.useState<string | undefined>()
    const [unitByQuantity, setUnitByQuantity] = React.useState<string | undefined>()
    const [filterType, setFilterType] = React.useState<string>('DON')

    // Function definition ===============================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)
    const resPicture = useAppSelector((state) => state.user.resPicture);
    const pictureWillUpdate = useAppSelector((state) => state.user.pictureWillUpdate);
    const dispatch = useAppDispatch()
    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows, filterType);
        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu thất bại !');
        }

        setLengthList(res.count)
        setResData(res.data)
    }, [numberOfRows, numberOfRowsRedux, filterType]);

    const create = React.useCallback(
        async (formDataValidated: ProductsNamesFormData.ICreateMaterial) => {
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
            formDataValidated: ProductsNamesFormData.ICreateMaterial,
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
            aggregate.add(item.items[1].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const codeAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const initialItemsFormData: Self.TItemsFormData[] = useAsyncMemo(
        [],
        async () => {
            if (!idUpdate) return [];

            const res = await Self.apiContext.find(idUpdate);

            if (res.status === 'failure') {
                messageAlert('error', 'Tải dữ liệu từ máy chủ thất bại !');
                return [];
            }

            setExpireDateInit(res.data.expireDate?.toString() || '');
            setExpireDate(res.data.expireDate?.toString() || '');
            setProductName(res.data.name);
            setProductNameInit(res.data.name);
            setCountry(res.data.country?._id)
            setBarcode(res.data.code);
            setRepresentPicture(res.data.representPicture);
            setBarcodeInit(res.data.code);
            
            if (formType === 'DON') {
                const formData = res.data.productDetail?.map(item => {
                    return {
                        _id: item.materialId,
                        name: item.materialName,
                        type: item.typeNumber,
                        quantity: item.quantityNumber,
                    }
                })

                if (formData) {
                    setItemsFormData(formData)
                    return formData
                }
            }
            else if (formType === 'HOP') {
                const formData = res.data.productPackage1?.map(item => {
                    return {
                        _id: item.productId,
                        name: item.productName,
                        code: item.productCode,
                        quantity: item.quantityNumber,  
                    }
                })

                if (formData) {
                    setItemsFormData(formData)
                    return formData
                }
            }
            else if (formType === 'THUNG') {
                const formData = res.data.productPackage2?.map(item => {
                    return {
                        _id: item.productId,
                        name: item.productName,
                        code: item.productCode,
                        quantity: item.quantityNumber,
                    }
                })
                if (formData) {
                    setItemsFormData(formData)
                    return formData
                }
            }
            return []
        },
        [idUpdate],
    );

    const materialsDropdown: IOption[] = useAsyncMemo(
        [],
        async () => {

            const res = await Self.apiContext.listMaterials();

            if (res.status === 'failure') {
                messageAlert('error', 'Lấy dữ liệu nguyên liệu thất bại !')
                return []
            }

            return res.data.map((item) => {
                return {
                    label: item.name,
                    value: item._id,
                }
            });
        },
        [],
    );

    const productsDropdown: IOptionExtend[] = useAsyncMemo(
        [],
        async () => {

            const res = await Self.apiContext.listProducts('DON');

            if (res.status === 'failure') {
                messageAlert('error', 'Lấy dữ liệu nguyên liệu thất bại !')
                return []
            }

            return res.data.map((item) => {
                return {
                    label: item.name,
                    code: item.code,
                    value: item._id,
                }
            });
        },
        [dataSheet],
    );

    const productContainersDropdown: IOptionExtend[] = useAsyncMemo(
        [],
        async () => {

            const res = await Self.apiContext.listProducts('HOP');

            if (res.status === 'failure') {
                messageAlert('error', 'Lấy dữ liệu nguyên liệu thất bại !')
                return []
            }

            return res.data.map((item) => {
                return {
                    label: item.name,
                    code: item.code,
                    value: item._id,
                }
            });
        },
        [dataSheet]
    )

    const materialsDataSheet: ITableCell[] = React.useMemo(() => {
        const result: ITableCell[] = []

        itemsFormData.forEach((item) => {
            result.push({
                _id: item._id,
                items: [
                    item.name,
                    item.type === 1 ? item.quantity : null,
                    item.type === 2 ? item.quantity : null,
                ]
            } as ITableCell
            );
        });

        return result;
    }, [itemsFormData, initialItemsFormData]);

    const productsDataSheet: ITableCell[] = React.useMemo(() => {
        const result: ITableCell[] = []

        itemsFormData.forEach((item) => {
            result.push({
                _id: item._id,
                items: [
                    item.code,
                    item.name,
                    item.quantity,
                ]
            } as ITableCell
            );
        });

        return result;
    }, [itemsFormData, initialItemsFormData]);

    const productContainersDataSheet: ITableCell[] = React.useMemo(() => {
        const result: ITableCell[] = []

        itemsFormData.forEach((item) => {
            result.push({
                _id: item._id,
                items: [
                    item.code,
                    item.name,
                    item.quantity,
                ]
            } as ITableCell
            );
        });

        return result;
    }, [itemsFormData, initialItemsFormData]);

    const materialsNamesAdded = React.useMemo(() => {
        return materialsDataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].trim().toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [materialsDataSheet]);

    const productsNamesAdded = React.useMemo(() => {
        return productsDataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[1].trim().toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [productsDataSheet]);

    const productContainersNamesAdded = React.useMemo(() => {
        return productContainersDataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[1].trim().toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [productContainersDataSheet]);

    const isItemsChanged = React.useMemo(() => {
        const shallowObjectEqual =(object1:any, object2:any) => {
            const keys1 = Object.keys(object1);
            const keys2 = Object.keys(object2);
            if (keys1.length !== keys2.length) {
              return false;
            }
            for (let key of keys1) {
              if (object1[key] !== object2[key]) {
                return false;
              }
            }
          
            return true;
          }
       
        const isChangeRepresentPicture = representPicture?.length === pictureWillUpdate?.length && representPicture.every((item)=>{return pictureWillUpdate.some((it1)=> it1.id == item.id)})
        if(!isChangeRepresentPicture){
            return !isChangeRepresentPicture
        }
        let differenceArr1 = initialItemsFormData.filter((obj1)=> {
                let isExist = true
            itemsFormData.every((obj2)=>{
                if(shallowObjectEqual(obj1,obj2)){
                    isExist= false
                    return isExist
                }
                return isExist
            })
            return isExist
        })
        let differenceArr2 = itemsFormData.filter((obj1)=> {
                let isExist = true
                initialItemsFormData.every((obj2)=>{
                if(shallowObjectEqual(obj1,obj2)){
                    isExist= false
                    return isExist
                }
                return isExist
            })
            return isExist
        })
        return [...differenceArr1,...differenceArr2].length !== 0
    }, [itemsFormData, initialItemsFormData,representPicture,resPicture,pictureWillUpdate])

    // update ref ================================

    materialsNamesAddedRef.current = materialsNamesAdded;
    productsNamesAddedRef.current = productsNamesAdded;
    productContainersNamesAddedRef.current = productContainersNamesAdded;

    // Event handler ===============================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnRemoveClick = React.useCallback(
        (_id: string) => {
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
        setFormType(filterType)
        setIdUpdate(_id);
        setDisplayForm(true)
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    }, [filterType]);

    const handlerBtnSaveClick = () => {
        setCheckValidAll(true);
        if (!barcode || !productName || (!expireDate && formType === 'DON' )) {
            return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !')
        }
        if(!idUpdate){
            if (nameAdded.has(productName.toLowerCase()) ) {
                messageAlert('warning', `Bạn đã thêm sản phẩm này rồi !`);
                return;
            }
            if((materialsDataSheet.length === 0 && formType === 'DON')){
                messageAlert('warning', `Bạn cần thêm tối thiểu một nguyên liệu!`);
                return;
            }
            if(productsDataSheet.length === 0 && formType != 'DON'){
                messageAlert('warning', `Bạn cần thêm tối thiểu một ${formType == 'HOP'? 'sản phẩm':'hộp sản phẩm'}!`);
                return;
            }
        }else {
            if ((nameAdded.has(productName.toLowerCase()) && productName !== productNameInit)) {
                messageAlert('warning', `Bạn đã thêm sản phẩm này rồi !`);
                return;
            }
            if((materialsDataSheet.length === 0 && formType === 'DON')){
                messageAlert('warning', `Bạn cần thêm tối thiểu một nguyên liệu!`);
                return;
            }
            if(productsDataSheet.length === 0 && formType != 'DON'){
                messageAlert('warning', `Bạn cần thêm tối thiểu một ${formType == 'HOP'? 'sản phẩm':'hộp sản phẩm'}!`);
                return;
            }
            if (nameAdded.has(productName.toLowerCase()) && codeAdded.has(barcode.toLowerCase()) && barcode == barcodeInit && !isItemsChanged && expireDate == expireDateInit ) {
                messageAlert('warning', `Không có sự thay đổi nào !`);
                setDisplayForm(false)
                return;
            }
        } 

        let formDataValidated

        if (formType === 'DON') {
            const materials = itemsFormData.map(item => {
                return {
                    materialId: item._id,
                    materialName: item.name,
                    typeNumber: item.type,
                    quantityNumber: item.quantity,
                }
            })

            formDataValidated = {
                name: productName,
                expireDate,
                representPicture:(!idUpdate ? resPicture : pictureWillUpdate) || [],
                code: barcode,
                country: country,
                typePackage: formType,
                materials,
            }
        }
        else if (formType === 'HOP') {
            const productPackage1 = itemsFormData.map(item => {
                return {
                    productId: item._id,
                    productName: item.name,
                    productCode: item.code,
                    quantityNumber: item.quantity,
                }
            })

            formDataValidated = {
                name: productName,
                representPicture:(!idUpdate ? resPicture : pictureWillUpdate) || [],
                code: barcode,
                country: country,
                typePackage: formType,
                productPackage1,
            }
        }
        else if (formType === 'THUNG') {
            const productPackage2 = itemsFormData.map(item => {
                return {
                    productId: item._id,
                    productName: item.name,
                    productCode: item.code,
                    quantityNumber: item.quantity,
                }
            })

            formDataValidated = {
                name: productName,
                representPicture:(!idUpdate ? resPicture : pictureWillUpdate) || [],
                code: barcode,
                country: country,
                typePackage: formType,
                productPackage2,
            }
        }
        if (formDataValidated) {
            //create
            if (!idUpdate) {
                // console.log('formDataValidated',formDataValidated)
                create(formDataValidated);
                setCheckValidAll(false);
                return;
            }
            // console.log('formDataValidated',formDataValidated)
            update(idUpdate, formDataValidated);
            setCheckValidAll(false);
        }

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
        setFormType('')
    };

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.name.includes(searchInput.trim())
                || item.code?.includes(searchInput.trim())
        })
        if (filterData) {

            setDataSheet(filterData.map((item) => {
                if (item) {
                    let type;
                    let _country = item.country?.name == 'undefined' ?'':item.country?.name
                    if (item.typePackage === 'DON') type = 'Sản phẩm';
                    else if (item.typePackage === 'HOP') type = 'Hộp';
                    else if (item.typePackage === 'THUNG') type = 'Thùng';
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.code,
                            item.name, //==
                            type,
                            null,
                            _country,
                            null,
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    const handlerBtnAddItemsClick = React.useCallback(
        () => {
            if (formType === 'DON') {
                const material = materialsDropdown.find(item => item.value === selectedItem)
                if (material) {
                    const _id = material.value
                    const name = material.label
                    const type = unitType;
                    let quantity;
                    if (type === 1) quantity = Number(unitByPercent);
                    else quantity = Number(unitByWeight);

                    if (!name || !quantity) {
                        messageAlert('warning', 'Bạn phải điền đủ thông tin nguyên liệu !');
                        return;
                    }

                    if (materialsNamesAddedRef.current.has(name.toLowerCase())) {
                        messageAlert('warning', 'Bạn đã thêm nguyên liệu này rồi !');
                        return;
                    }

                    const result = {
                        _id,
                        name,
                        type,
                        quantity,
                    }
                    itemsManager.add(result);
                }
            }
            else if (formType === 'HOP') {
                const product = productsDropdown.find(item => item.value === selectedItem)
                if (product) {
                    const _id = product.value
                    const name = product.label
                    const code = product.code
                    const quantity = Number(unitByQuantity);

                    if (!name || !quantity) {
                        messageAlert('warning', 'Bạn phải điền đủ thông tin nguyên liệu !');
                        return;
                    }

                    if (productsNamesAddedRef.current.has(name.toLowerCase())) {
                        messageAlert('warning', 'Bạn đã thêm nguyên liệu này rồi !');
                        return;
                    }

                    const result = {
                        _id,
                        name,
                        code,
                        quantity,
                    }
                    itemsManager.add(result);
                }
            }
            else if (formType === 'THUNG') {
                const productContainer = productContainersDropdown.find(item => item.value === selectedItem)
                if (productContainer) {
                    const _id = productContainer.value
                    const name = productContainer.label
                    const code = productContainer.code
                    const quantity = Number(unitByQuantity);

                    if (!name || !quantity) {
                        messageAlert('warning', 'Bạn phải điền đủ thông tin nguyên liệu !');
                        return;
                    }

                    if (productContainersNamesAddedRef.current.has(name.toLowerCase())) {
                        messageAlert('warning', 'Bạn đã thêm nguyên liệu này rồi !');
                        return;
                    }

                    const result = {
                        _id,
                        name,
                        code,
                        quantity,
                    }
                    itemsManager.add(result);
                }
            }

        },
        [itemsManager, selectedItem, unitType, unitByPercent, unitByWeight, unitByQuantity],
    );

    const handlerBtnRemoveItemsClick = (_id: string) => {
        itemsManager.remove(_id)
    }

    const handlerBtnFilterClick = (v: string) => {
        if (v === 'Sản phẩm') setFilterType('DON')
        else if (v === 'Hộp') setFilterType('HOP')
        else if (v === 'Thùng') setFilterType('THUNG')
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
                        item.name, //==
                        item.code,
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
        setIdUpdate(undefined)
        setBarcode(undefined)
        setRepresentPicture([])
        setProductName('')
        setExpireDate('')
        setCountry(undefined)
        setFormType('')
        setSelectedItem(undefined)
        setUnitByPercent(undefined)
        setUnitByWeight(undefined)
        setUnitType(1)
        setUnitByQuantity(undefined)
        itemsManager.reset()
    }, [displayForm]);

    // get list countries
    React.useEffect(()=>{
       const getListcountry = async()=>{
        const res = await api.customerProducts.processingFacility.productType.listCountry()
        if (!res.data) {
            messageAlert('error', 'Lấy data thất bại');
            return undefined;
        }
        const countries:IOption[] = res.data.map((country:CountryResponse.IData)=>{
                return {
                    label: country.name,
                    value: country._id
                }
        })
        setCountryData(countries)
       }
       getListcountry()
    },[])
    return (
        <ProductTypeContext.Provider
            value={{
                checkValidAll,
                displayForm,
                setDisplayForm,
                dataSheet,
                resData,
                materialsDropdown,
                productsDropdown,
                productContainersDropdown,
                materialsDataSheet,
                productsDataSheet,
                productContainersDataSheet,
                representPicture,
                lengthList,
                idUpdate,
                country,
                setCountry,
                countryData,
                setCountryData,
                barcode,
                setBarcode,

                productName,
                setProductName,
                setExpireDate,
                expireDate,
                searchInput,
                setSearchInput,

                formType,
                setFormType,

                selectedItem,
                setSelectedItem,

                unitType,
                setUnitType,

                unitByPercent,
                setUnitByPercent,

                unitByWeight,
                setUnitByWeight,

                unitByQuantity,
                setUnitByQuantity,

                handlerBtnCreateClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnSaveClick,
                handlerBtnClose,
                handlerBtnSearchClick,
                handlerBtnAddItemsClick,
                handlerBtnRemoveItemsClick,
                handlerBtnFilterClick,
            }}
        >
            {props.children}
        </ProductTypeContext.Provider>
    );
}
