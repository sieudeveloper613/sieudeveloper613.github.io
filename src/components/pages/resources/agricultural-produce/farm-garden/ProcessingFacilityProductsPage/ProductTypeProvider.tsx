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
import EnterpriseProductResponse from '../../../../../../sharetype/response/resources/enterprise/EnterpriseProductResponse';
import EnterpriseProductFormData from '../../../../../../sharetype/form-data/resources/enterprise/EnterpriseProductFormData';
import processKeyword from '../../../../../../utils/preProcess/processKeyword';

type TypeProductNew = 'FIXED' | 'NOFIXED' | ''

export const ProductTypeContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number;
    idUpdate: string | undefined;
    productGTIN: string | undefined;
    setProductGTIN: React.Dispatch<React.SetStateAction<string>>;
    productVolume: string;
    setProductVolume: React.Dispatch<React.SetStateAction<string>>;
    productName: string;
    setProductName: React.Dispatch<React.SetStateAction<string>>;
    expireDate: string;
    setExpireDate: React.Dispatch<React.SetStateAction<string>>;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    formType: TypeProductNew;
    setFormType: React.Dispatch<React.SetStateAction<TypeProductNew>>;
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

    // State =========================================================

    const [resData, setResData] = React.useState<EnterpriseProductResponse.TList | undefined>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [productVolume, setProductVolume] = React.useState<string>('');
    const [productGTIN, setProductGTIN] = React.useState<string>('');
    const [productName, setProductName] = React.useState<string>('');
    const [expireDate, setExpireDate] = React.useState<string>('');
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [formType, setFormType] = React.useState<TypeProductNew>('');
    const [itemsFormData, setItemsFormData] = React.useState<Self.TItemsFormData[]>([]);

    // Function definition ===============================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)
    const resPicture = useAppSelector((state) => state.user.resPicture);
    const pictureWillUpdate = useAppSelector((state) => state.user.pictureWillUpdate);
    const dispatch = useAppDispatch()
    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu thất bại !');
        }

        setLengthList(res.count)
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
            console.log(formDataValidated);

            const res = await Self.apiContext.update(_id, formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Cập nhật thất bại !');
            }
            const itemWillDelete: { filename: string }[] = []
            resPicture?.forEach((itemA) => {
                const isEixst = pictureWillUpdate?.every((itemB) => {
                    return itemA.filename !== itemB.filename
                })
                if (isEixst) {
                    itemWillDelete.push({ filename: itemA.filename })
                }
            })
            if (itemWillDelete.length > 0) {
                const resDelete = await api.user.deleteManyCertificate(itemWillDelete)
                if (resDelete) {
                    dispatch(userSlice.actions.setResPicture([]))
                    dispatch(userSlice.actions.setPictureWillUpdate([]))
                }
            } else {
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
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const gtinAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[2].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);



    // update ref ================================

    // Event handler ===============================
    const Type = (type: string) => {
        switch (type) {
            case 'FIXED': { return "Sản phẩm cố định khối lượng" }
            case 'NOFIXED': { return "Sản phẩm không cố định khối lượng" }
            default: return ""
        }
    }

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
        setProductName('')
        setProductGTIN('')
        setExpireDate('')
        setProductVolume('')

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
        setIdUpdate(_id);
        const res:any = resData?.filter(e =>e._id === _id)?.[0]
        setFormType(res.type)
        setProductName(res.productName)
        setProductGTIN(res.gtin)
        setExpireDate(res.expired.toString())
        setProductVolume(res.productVolume.toString())
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
    }, [resData]);

    const handlerBtnSaveClick = () => {
        setCheckValidAll(true);
        console.log(formType);
        if (formType === 'NOFIXED') {
            if (!productGTIN || !productName || !expireDate) {
                return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !')
            }
            if (!idUpdate) {
                if (nameAdded.has(productName.toLowerCase())) {
                    messageAlert('warning', `Bạn đã thêm sản phẩm này rồi !`);
                    return;
                }
                if (gtinAdded.has(productGTIN.toLowerCase())) {
                    messageAlert('warning', `Bạn đã thêm mã GTIN này rồi !`);
                    return;
                }

                // if(productsDataSheet.length === 0 && formType != 'FIXED'){
                //     messageAlert('warning', `Bạn cần thêm tối thiểu một ${formType == 'HOP'? 'sản phẩm':'hộp sản phẩm'}!`);
                //     return;
                // }
            }
        } else if (formType === 'FIXED') {
            console.log(formType);
            if (!productGTIN || !productName || !expireDate || !productVolume) {
                return messageAlert('warning', 'Bạn cần hoàn thiện một vài mục trước khi lưu !')
            } else {
                if (!idUpdate) {
                if ((nameAdded.has(productName.toLowerCase()))) {
                    messageAlert('warning', `Bạn đã thêm sản phẩm này rồi !`);
                    return;
                }
                if (gtinAdded.has(productGTIN.toLowerCase())) {
                    messageAlert('warning', `Bạn đã thêm mã GTIN này rồi !`);
                    return;
                }}
                // if((materialsDataSheet.length === 0 && formType === 'DON')){
                //     messageAlert('warning', `Bạn cần thêm tối thiểu một nguyên liệu!`);
                //     return;
                // }
                // if(productsDataSheet.length === 0 && formType != 'DON'){
                //     messageAlert('warning', `Bạn cần thêm tối thiểu một ${formType == 'HOP'? 'sản phẩm':'hộp sản phẩm'}!`);
                //     return;
                // }
                // if (nameAdded.has(productName.toLowerCase()) && codeAdded.has(barcode.toLowerCase()) && barcode == barcodeInit && !isItemsChanged && expireDate == expireDateInit ) {
                //     messageAlert('warning', `Không có sự thay đổi nào !`);
                //     setDisplayForm(false)
                //     return;
                // }
            }
        }

        let formDataValidated

        if (formType === 'FIXED') {

            formDataValidated = {

                productName: productName,
                gtin: productGTIN,
                productVolume: productVolume.toString(),
                expired: expireDate.toString(),
                type: EnterpriseProductFormData.ETypeEnterpriseProduct.fixed,

            }
        }
        else if (formType === 'NOFIXED') {

            formDataValidated = {

                productName: productName,
                gtin: productGTIN,
                expired: expireDate.toString(),
                type: EnterpriseProductFormData.ETypeEnterpriseProduct.noFixed,
            }
        }
        console.log(formDataValidated);
        if (formDataValidated) {
            //create
            console.log(formDataValidated);
            if (!idUpdate) {
                // console.log('formDataValidated',formDataValidated)
                create(formDataValidated);
                setCheckValidAll(false);
                return;
            }
            // console.log('formDataValidated',formDataValidated)
            update(idUpdate, formDataValidated);
            setCheckValidAll(false);
            setFormType('')
        }

        return
    };

    const handlerBtnClose = async () => {
        if (!idUpdate) {
            if (resPicture && resPicture.length > 0) {
                const listFilename = resPicture.map((item) => { return { filename: item.filename } })
                const res = await api.user.deleteManyCertificate(listFilename)
                if (res) {
                    dispatch(userSlice.actions.setResPicture([]))
                } else {
                    alert('Hình ảnh bị xoá thất bại')
                }
            }
        } else {
            const itemWillDelete: { filename: string }[] = []
            pictureWillUpdate?.forEach((itemA) => {
                const isEixst = resPicture?.every((itemB) => {
                    return itemA.filename !== itemB.filename
                })
                if (isEixst) {
                    itemWillDelete.push({ filename: itemA.filename })
                }
            })
            if (itemWillDelete.length > 0) {
                const res = await api.user.deleteManyCertificate(itemWillDelete)
                if (res) {
                    dispatch(userSlice.actions.setResPicture([]))
                    dispatch(userSlice.actions.setPictureWillUpdate([]))
                } else {
                    alert('Hình ảnh bị xoá thất bại')
                }
            } else {
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
            return processKeyword(item.productName).toLowerCase().includes(searchInput.toLowerCase().trim())
                || Type(processKeyword(item.type)).toLowerCase().includes(searchInput.toLowerCase().trim())
                || item.gtin?.includes(searchInput.trim())
        })
        if (filterData) {

            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.productName,
                            Type(item.type),
                            item.gtin, //==

                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])



    const handlerBtnRemoveItemsClick = (_id: string) => {
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
                        //==
                        item.productName,
                        Type(item.type),
                        item.gtin, //==


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
        setProductGTIN('')
        setProductVolume('')

        setProductName('')
        setExpireDate('')
        setFormType('')

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
                lengthList,
                idUpdate,
                productGTIN,
                setProductGTIN,
                productVolume,
                setProductVolume,
                productName,
                setProductName,
                setExpireDate,
                expireDate,
                searchInput,
                setSearchInput,
                formType,
                setFormType,

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
