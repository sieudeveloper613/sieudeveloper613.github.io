import * as React from 'react'
//
import { ITableCell } from '../../../../../common/DataTable';
import useMessageBox from '../../../../../../hooks/useMessageBox';
import ProductsNamesPlanFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesPlanFormData';
import ProductsNamesPlanResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesPlanResponse';
import ProductsNamesResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
import { useAppSelector } from '../../../../../../redux/hooks';
import { Self } from '.';
import messageAlert from '../../../../../../utils/messageAlert';
import useAsyncMemo from '../../../../../../hooks/useAsyncMemo';
import { IOption } from '../../../../../common/Selection';
import { ISuppliersResponse } from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse/FertilizersResponse';
import { ICodeMaterialResponse } from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ExportAgricultureContainerResponse/ExportAgricultureContainerResponse';

export const ProductManageContext = React.createContext<{
    checkValidAll: boolean;
    displayForm: boolean;
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number;
    idUpdate: string | undefined;
    productOptions: IOption[];
    productInfo?: ProductsNamesResponse.IData;
    supplierOptionsList: IOption[][];
    supplierSelectedList: IOption[];
    materialCodeOptionsList: IOption[][];
    materialCodeSelectedList: IOption[];

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    productSelected: string | undefined;
    setProductSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    supplierSelected: string | undefined;
    setSupplierSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    materialCodeSelected: string | undefined;
    setMaterialCodeSelected: React.Dispatch<React.SetStateAction<string | undefined>>;

    setSupplierSelection: React.Dispatch<React.SetStateAction<number | undefined>>;
    setMaterialCodeSelection: React.Dispatch<React.SetStateAction<number | undefined>>;

    dateStart: string | undefined;
    setDateStart: React.Dispatch<React.SetStateAction<string | undefined>>;

    dateEnd: string | undefined;
    setDateEnd: React.Dispatch<React.SetStateAction<string | undefined>>;

    handlerBtnCreateClick: () => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnClose: () => any;
    handlerBtnSearchClick: () => void;
}>({} as any);

interface IProductManageProviderProps { }

export default function ProductManageProvider(props: React.PropsWithChildren<IProductManageProviderProps>) {
    const messageBox = useMessageBox();

    // State =============================================================
    const [resData, setResData] = React.useState<ProductsNamesPlanResponse.Tlist | undefined>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [productSelected, setProductSelected] = React.useState<string | undefined>()
    const [supplierSelected, setSupplierSelected] = React.useState<string | undefined>()
    const [suppliers, setSuppliers] = React.useState<ISuppliersResponse[][]>([]);
    const [supplierSelectedList, setSupplierSelectedList] = React.useState<IOption[]>([]);
    const [supplierSelection, setSupplierSelection] = React.useState<number | undefined>()
    const [dateStart, setDateStart] = React.useState<string | undefined>('')
    const [dateEnd, setDateEnd] = React.useState<string | undefined>('')
    const [firstRenderWhenUpdate, setFirstRenderWhenUpdate] = React.useState<boolean>(false)
    const [materialCodes, setMaterialCodes] = React.useState<ICodeMaterialResponse[][]>([])
    const [materialCodeSelected, setMaterialCodeSelected] = React.useState<string | undefined>()
    const [materialCodeSelection, setMaterialCodeSelection] = React.useState<number | undefined>()
    const [materialCodeSelectedList, setMaterialCodeSelectedList] = React.useState<IOption[]>([]);

    // Function definition ===============================================
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)

    const loadData = React.useCallback(async () => {
        const res = await Self.apiContext.list(numberOfRowsRedux, numberOfRows);
        if (res.status === 'failure') {
            return messageAlert('error', 'Lấy dữ liệu thất bại !');
        }

        setLengthList(res.count)
        setResData(res.data)
    }, [numberOfRows, numberOfRowsRedux]);

    const loadSuppliers = React.useCallback(async (_id: string) => {
        const res = await Self.apiContext.listSuppliers(_id)

        if (res.status === 'failure') {
            return
        }

        setSuppliers(prev => [...prev, res.data.suppliers])
    }, [productSelected])

    const loadMaterialCodes = React.useCallback(async () => {
        const res = await Self.apiContext.listCodeMaterial()

        if (res.status === 'failure') {
            return
        }

        setMaterialCodes(prev => [...prev, res.data])
    }, [productSelected])

    const create = React.useCallback(
        async (formDataValidated: ProductsNamesPlanFormData.ICreateMaterial) => {
            const res = await Self.apiContext.create(formDataValidated);
            if (res.status === 'failure') {
                return messageAlert('error', 'Tạo thất bại !');
            }

            messageAlert('success', 'Thành công');
            setDisplayForm(false);
            loadData();
        },
        [loadData],
    );

    const update = React.useCallback(
        async (
            _id: string,
            formDataValidated: ProductsNamesPlanFormData.ICreateMaterial,
            // ============
        ) => {
            const res = await Self.apiContext.update(_id, formDataValidated);

            if (res.status === 'failure') {
                return messageAlert('error', 'Cập nhật thất bại !');
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

    const nameAdded = React.useMemo(() => {
        return dataSheet.reduce((aggregate, item) => {
            aggregate.add(item.items[0].toLowerCase());
            return aggregate;
        }, new Set<string>());
    }, [dataSheet]);

    const productOptions = useAsyncMemo(
        [],
        async () => {
            const res = await Self.apiContext.listProducts('DON');

            if (res.status === 'failure') {
                messageAlert('error', 'Lấy dữ liệu sản phẩm thất bại !')
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

    const productInfo = useAsyncMemo(
        undefined,
        async () => {
            const res = await Self.apiContext.listProducts('DON');

            if (res.status === 'failure') {
                return
            }

            const result = res.data.find(item => item._id === productSelected)

            return result
        },
        [productSelected]
    )

    const suppliersList: ISuppliersResponse[][] = React.useMemo(
        () => {
            const result = suppliers

            if (result) return result

            return []
        },
        [suppliers, productInfo])

    const supplierOptionsList: IOption[][] = React.useMemo(
        () => {
            const result = suppliersList.map(arr => {
                return arr.map(item => {
                    return {
                        label: item.name,
                        value: item._id,
                    }
                })
            })
            return result
        },
        [suppliersList]
    )

    const materialCodesList: ICodeMaterialResponse[][] = React.useMemo(
        () => {
            const result = materialCodes

            if (result) return result

            return []
        },
        [materialCodes, productInfo])


    const materialCodeOptionsList: IOption[][] = React.useMemo(
        () => {
            const result = materialCodesList.map(arr => {
                return arr.map(item => {
                    return {
                        label: item.codeMaterial,
                        value: item._id,
                    }
                })
            })
            return result
        },
        [materialCodesList]
    )

    const updateFormData: {
        dateStart?: string,
        dateEnd?: string,
        supplierSelectedList?: IOption[],
        materialCodeSelectedList?: IOption[],
    } = useAsyncMemo(
        {},
        async () => {
            if (!idUpdate) return {};

            const res = await Self.apiContext.find(idUpdate);

            if (res.status === 'failure') {
                messageAlert('error', 'Tải dữ liệu từ máy chủ thất bại !');
                return {};
            }

            const dateTimeFormat = (s: Date | undefined) => {
                if (s) {
                    const time = new Date(s).toTimeString().split(' ')[0]
                    const dateArr = new Date(s).toLocaleDateString().split('/').map((item, i) => {
                        if (i !== 2) {
                            if (parseInt(item) < 10) return `0${item}`
                            else return item
                        }
                        return item
                    })
                    const date = [dateArr[2], dateArr[0], dateArr[1]].join('-')
                    return `${date}T${time}`
                }
                return
            }
            console.log(res.data)
            setDateStart(dateTimeFormat(res.data.dateStart))
            setDateEnd(dateTimeFormat(res.data.dateEnd))
            setProductSelected(res.data.productId)
            if (res.data.productDetail) {
                setSupplierSelectedList(res.data.productDetail?.map(item => {
                    return {
                        label: item.supplierName,
                        value: item.supplierId,
                    }
                }))

                setMaterialCodeSelectedList(res.data.productDetail?.map(item => {
                    return {
                        label: item.codeMaterial,
                        value: item.exDetailId,
                    }
                }))
            }
            return {
                dateStart: dateTimeFormat(res.data.dateStart),
                dateEnd: dateTimeFormat(res.data.dateEnd),
                supplierSelectedList: res.data.productDetail?.map(item => {
                    return {
                        label: item.supplierName,
                        value: item.supplierId,
                    }
                }),
                materialCodeSelectedList: res.data.productDetail?.map(item => {
                    return {
                        label: item.codeMaterial,
                        value: item.exDetailId,
                    }
                }),
            }
        },
        [idUpdate],
    );

    const isFormDataChange = React.useMemo(() => {
        if (!updateFormData.dateStart) return false
        const isSupplierChange = !updateFormData.supplierSelectedList?.every((item, i) => item.value === supplierSelectedList[i]?.value)
        const isMaterialCodeChange = !updateFormData.materialCodeSelectedList?.every((item, i) => item.value === materialCodeSelectedList[i]?.value)

        return dateStart !== updateFormData.dateStart || dateEnd !== updateFormData.dateEnd
            || isSupplierChange || isMaterialCodeChange
    }, [updateFormData, dateStart, dateEnd, supplierSelectedList, materialCodeSelectedList])

    // Event handler ===============================

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnClose = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnUpdateClick = React.useCallback(async (_id: string) => {
        setIdUpdate(_id);
        setDisplayForm(true)
        setTimeout(() => {
            setCheckValidAll(true);
        }, 700);
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

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.name.includes(searchInput.trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                if (item) {
                    return {
                        _id: item._id,
                        items: [
                            //==
                            item.name, //==
                            item.dateStart?.toString().split('T')[0].replaceAll('-', '/'),
                            item.dateEnd?.toString().split('T')[0].replaceAll('-', '/'), //==
                        ],
                    } as ITableCell;
                }
                return {} as ITableCell;
            }))
        }
    }, [searchInput, resData])

    const handlerBtnSaveClick = () => {
        setCheckValidAll(true);

        if (!dateStart || !dateEnd) {
            return messageAlert('warning', 'Bạn cần chọn thời gian bắt đầu và kết thúc trước khi lưu !')
        }

        if (!productInfo) {
            return messageAlert('warning', 'Bạn cần chọn sản phẩm trước khi lưu !')
        }

        if (supplierSelectedList.length === 0 || !supplierSelectedList.every(item => item !== undefined)) {
            return messageAlert('warning', 'Bạn cần chọn đủ nhà cung cấp trước khi lưu !')
        }

        // * ko bắt buộc chon mã nhập nguyên liệu khi tao moi
        if ((materialCodeSelectedList.length === 0 || !materialCodeSelectedList.every(item => item !== undefined))&& idUpdate) {
            return messageAlert('warning', 'Bạn cần chọn đủ mã nguyên liệu trước khi lưu !')
        }

        if (!isFormDataChange && nameAdded.has(productInfo.name.toLowerCase())) {
            messageAlert('warning', `Bạn bạn đã thêm sản phẩm này rồi !`);
            return;
        }
        const productDetail = productInfo?.productDetail?.map((item, i) => {
            return {
                materialId: item.materialId,
                materialName: item.materialName,
                typeNumber: item.typeNumber,
                quantityNumber: item.quantityNumber,
                supplierId: supplierSelectedList[i].value,
                supplierName: supplierSelectedList[i].label,
                exDetailId: materialCodeSelectedList.length >0 ? materialCodeSelectedList[i].value : '',
                codeMaterial:materialCodeSelectedList.length >0 ? materialCodeSelectedList[i].label: '',
            }
        })

        const formDataValidated = {
            productId: productInfo._id,
            name: productInfo.name,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            productDetail,
        }

        console.log(formDataValidated)
        
        //create
        if (!idUpdate) {
            create(formDataValidated);
            setCheckValidAll(false);
            return;
        }

        update(idUpdate, formDataValidated);
        setCheckValidAll(false);

        return
    };

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
                        item.name, //==
                        item.dateStart?.toString().split('T')[0].replaceAll('-', '/'),
                        item.dateEnd?.toString().split('T')[0].replaceAll('-', '/'), //==
                    ],
                } as ITableCell;
            }
            return {} as ITableCell;
        }))
    }, [resData]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    React.useEffect(() => {
        setSuppliers([])
        setMaterialCodes([])
        productInfo?.productDetail?.forEach(item => {
            loadSuppliers(item.materialId)
            loadMaterialCodes()
        })
    }, [productInfo]);

    React.useEffect(() => {
        const result = supplierOptionsList.map((arr, index) => {
            if (index === supplierSelection) {
                if (!supplierSelected) return undefined
                return arr.find(item => item.value === supplierSelected);
            }
            return supplierSelectedList[index];
        })
        setSupplierSelectedList(result as []);
    },
        [supplierSelected, supplierSelection])

    React.useEffect(() => {
        const result = materialCodeOptionsList.map((arr, index) => {
            if (index === materialCodeSelection) {
                if (!materialCodeSelected) return undefined
                return arr.find(item => item.value === materialCodeSelected);
            }
            return materialCodeSelectedList[index];
        })
        setMaterialCodeSelectedList(result as []);
    },
        [materialCodeSelected, materialCodeSelection])

    React.useEffect(() => {
        if (idUpdate) setFirstRenderWhenUpdate(true)
        else setFirstRenderWhenUpdate(false)
    }, [idUpdate])

    React.useEffect(() => {
        if (firstRenderWhenUpdate) {
            setFirstRenderWhenUpdate(false)
        }
        else {
            setSupplierSelectedList([])
            setMaterialCodeSelectedList([])
        }
    }, [productInfo])

    // Clear up formData when Form close
    React.useEffect(() => {
        if (displayForm) return;
        setIdUpdate(undefined)
        setDateStart('')
        setDateEnd('')
        setProductSelected(undefined)
    }, [displayForm]);

    return (
        <ProductManageContext.Provider
            value={{
                checkValidAll,
                displayForm,
                dataSheet,
                resData,
                lengthList,
                idUpdate,
                productOptions,
                productInfo,
                supplierOptionsList,
                supplierSelectedList,
                materialCodeOptionsList,
                materialCodeSelectedList,

                searchInput,
                setSearchInput,

                productSelected,
                setProductSelected,

                supplierSelected,
                setSupplierSelected,

                materialCodeSelected,
                setMaterialCodeSelected,

                setSupplierSelection,
                setMaterialCodeSelection,

                dateStart,
                setDateStart,

                dateEnd,
                setDateEnd,

                handlerBtnCreateClick,
                handlerBtnRemoveClick,
                handlerBtnUpdateClick,
                handlerBtnSaveClick,
                handlerBtnClose,
                handlerBtnSearchClick,
            }}
        >
            {props.children}
        </ProductManageContext.Provider>
    );
}