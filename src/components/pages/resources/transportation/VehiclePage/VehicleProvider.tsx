import * as React from "react";
import { Self } from ".";

import api from "../../../../../api";
import useMessageBox from "../../../../../hooks/useMessageBox";
import { useAppSelector } from "../../../../../redux/hooks";
import VehicleFormData from "../../../../../sharetype/form-data/resources/transportation/VehicleFormData";
import VehicleResponse from "../../../../../sharetype/response/resources/transportation/VehicleResponse";
import messageAlert from "../../../../../utils/messageAlert";
import Validate from "../../../../../utils/Validate";
import { ITableCell } from "../../../../common/DataTable";
import UserFormData from "../../../../../sharetype/form-data/resources/master/UserFormData";
import { EResource,ETransportSystemRole } from "../../../../../sharetype/TPermission";
import ParticipantsFormData from "../../../../../sharetype/form-data/resources/ParticipantsFormData";
import processKeyword from "../../../../../utils/preProcess/processKeyword";

interface ITransportVehicleProviderProps { }
export const VehicleContext = React.createContext<{
    dataSheet: ITableCell[];
    resData: any;
    lengthList?: number;
    idUpdate?: string;
    checkValidAll: boolean;
    displayForm: boolean;
    setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;

    formData: Self.TFormData;
    setFormData: React.Dispatch<React.SetStateAction<Self.TFormData>>;

    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    handlerBtnCreateClick: () => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnSaveClick: () => any;
    handlerBtnCloseClick: () => void;
    handlerBtnSearchClick: () => void; 
}>({} as any);

export default function VehicleProvider(props: React.PropsWithChildren<ITransportVehicleProviderProps>) {
    //useHook start------------------------------
    const messageBox = useMessageBox();

    // const formDataRef = React.useRef<Self.TFormData>(null as any);

    const [resData, setResData] = React.useState<VehicleResponse.IData[]>();
    const [displayForm, setDisplayForm] = React.useState<boolean>(false);
    const [idUpdate, setIdUpdate] = React.useState<string | undefined>();
    const [formData, setFormData] = React.useState<Self.TFormData>({});
    const [checkValidAll, setCheckValidAll] = React.useState<boolean>(false);
    const [lengthList, setLengthList] = React.useState<number | undefined>(1)
    const [searchInput, setSearchInput] = React.useState<string>("")
    const [dataSheet, setDataSheet] = React.useState<ITableCell[]>([]);
    //useHook end---------------------------------

    // formDataRef.current = formData;

    //Function declaration start-------------------
    const numberOfRowsRedux = useAppSelector((state) => state.paging.currentPage);
    const numberOfRows = useAppSelector((state) => state.paging.row)
    const infoRoleUser = useAppSelector((state) => state.user.userInfo?.permission.role);

    const loadData = React.useCallback(async () => {
        const res = await api.transportation.vehicle.list(numberOfRowsRedux, numberOfRows);

        if (res.status === "failure") {
            messageBox({
                title: "Lấy dữ liệu thất bại",
                message: "Bạn có muốn tải lại ?",
                buttons: [
                    {
                        label: "Tải lại",
                        onClick: loadData,
                    },
                    {
                        label: "Đóng",
                    },
                ],
            });
            return;
        }
        setLengthList(res.count)
        setResData(res.data);
    }, [messageBox, numberOfRows, numberOfRowsRedux]);

    const create = React.useCallback(
        async (formDataValidated: VehicleFormData.ICreate) => {
            const roleTransport = (infoRoleUser === "distribution-center" || infoRoleUser === "companyLogistic") ? ETransportSystemRole.gragage : ETransportSystemRole.supplier
            const formDataAccountProcessed: UserFormData.IData = {
                gln:"undefined",
                name: (formDataValidated.licensePlates as string).trim(),
                phone: "0123456787",
                email: (formDataValidated.email as string).trim(),
                taxCode:"1234567891",
                address: {
                    city: "1d",
                    district: "1",
                    ward: "1",
                    addressLine:  "1",
                    lat: "0",
                    lng: "0",
                },
                permission:{
                    resource:EResource.shippingService,
                    role:roleTransport
                },
                typeUser:"undefined",
                certificate:[]
            };
            const res = await api.transportation.vehicle.create(formDataValidated);
            const resAccount = await api.user.create(formDataAccountProcessed);
            if (res.status === "failure"|| resAccount.status === "failure") {
                return messageAlert("error", "Tạo thất bại !");
            }

            loadData();
            messageAlert("success", "Tạo thành công !");
            setDisplayForm(false);
        },
        [loadData],
    );

    const update = React.useCallback(
        async (_id: string, formDataValidated: VehicleFormData.ICreate) => {
            const res = await api.transportation.vehicle.update(_id, formDataValidated);

            if (res.status === "failure") {
                return messageAlert("error", "Cập nhập thất bại !");
            }

            loadData();
            messageAlert("success", "Cập nhập thành công !");
            setDisplayForm(false);
        },
        [loadData],
    );

    const remove = React.useCallback(
        async (_id: string) => {
            const res = await api.transportation.vehicle.remove(_id);
            if (res.status === "failure") {
                return messageAlert("error", "Có lỗi trong trong quá trình xóa !");
            }

            loadData();
            messageAlert("success", "Xóa thành công");
        },
        [loadData],
    );

    const isFormDataValid = async (): Promise<boolean> => {
        if (!resData) return false;

        if (!(await Validate.check(formData, Self.vehicleValidate))) {
            return false;
        }

        // check if the licensePlates already exist
        const licensePlatesStandard = (formData.licensePlates as string)?.toLocaleUpperCase().trim();

        const duplicateLicensePlates = resData.find((item) => {
            return item.licensePlates.toLocaleUpperCase().trim() === licensePlatesStandard;
        });

        if (duplicateLicensePlates && duplicateLicensePlates._id !== idUpdate) {
            messageAlert("warning", `Bạn đã thêm xe với biển số "${licensePlatesStandard}" này rồi !`);
            return false;
        }

        // check if the email already exist
        const emailStandard = (formData.email as string)?.toLowerCase().trim();

        const duplicateEmail = resData.find((item) => {
            return item.email.toLowerCase().trim() === emailStandard;
        });

        if (duplicateEmail && duplicateEmail._id !== idUpdate) {
            messageAlert("warning", `Bạn đã thêm xe với email "${emailStandard}" này rồi !`);
            return false;
        }

        //
        return true;
    };

    // const showFormCloseWarning = React.useCallback(
    //     (saveCallback: () => any) => {
    //         messageBox({
    //             message: "Thay đổi chưa được lưu !",
    //             icon: "warning",
    //             iconColor: "rgb(255,200,0)",
    //             buttons: [
    //                 {
    //                     label: "Vẫn đóng",
    //                     onClick() {
    //                         setDisplayForm(false);
    //                     },
    //                 },
    //                 {
    //                     label: "Lưu",
    //                     onClick() {
    //                         saveCallback();
    //                     },
    //                 },
    //                 {
    //                     label: "Tiếp tục chỉnh sửa",
    //                     onClick() {
    //                         //==
    //                     },
    //                 },
    //             ],
    //         });
    //     },
    //     [messageBox],
    // );

    // Event handler start --------------------------------

    const handlerBtnCreateClick = React.useCallback(() => {
        setIdUpdate(undefined);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = React.useCallback(
        (_id: string) => {
            if (!resData) return;

            const itemUpdating = resData.find((item) => item._id === _id);
            if (!itemUpdating) return undefined;

            setIdUpdate(_id);
            setFormData({ ...itemUpdating });
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
                message: "Bạn có chắc muốn xóa ?",
                buttons: [
                    {
                        label: "Xóa",
                        onClick: () => {
                            remove(_id);
                        },
                    },
                    { label: "Đóng", onClick: () => { } },
                ],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true);
        if (!(await isFormDataValid())) {
            return messageAlert("warning", "Bạn cần hoàn thiện một vài mục trước khi lưu !");
        }

        const formDataProcessed: VehicleFormData.IData = {
            email: (formData.email as string).trim(),
            licensePlates: (formData.licensePlates as string).trim().toLocaleUpperCase(),
            vehicleType: (formData.vehicleType as string).trim(),
        };
        
        // create
        if (!idUpdate) {
            create(formDataProcessed);
            setCheckValidAll(false);
            return;
        }

        // update
        setCheckValidAll(false);

        update(idUpdate, formDataProcessed);
    };

    const handlerBtnCloseClick = React.useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnSearchClick = React.useCallback(() => {
        if (!resData) return setDataSheet([]);
        const filterData = resData.filter(item => {
            return item.licensePlates.toLowerCase().includes(searchInput.toLowerCase().trim())
                || processKeyword(item.vehicleType).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
                || processKeyword(item.email).toLowerCase().includes(processKeyword(searchInput).toLowerCase().trim())
        })
        if (filterData) {
            setDataSheet(filterData.map((item) => {
                return {
                    _id: item._id,
                    items: [item.licensePlates, item.vehicleType, item.email],
                } as ITableCell;
            }))
        }
    }, [searchInput, resData])

    // Event handler end---------------------------------

    // Load datasheet
    React.useEffect(() => {
        if (!resData) return setDataSheet([]);
        const _resData = resData;
        setDataSheet(_resData.map((item) => {
            return {
                _id: item._id,
                items: [item.licensePlates, item.vehicleType, item.email],
            } as ITableCell;
        }))
    }, [resData]);

    // Empty formData
    React.useEffect(() => {
        if (displayForm) return;

        setIdUpdate(undefined);
        setFormData({});
    }, [displayForm]);

    // Load data
    React.useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <VehicleContext.Provider
            value={{
                checkValidAll,
                dataSheet,
                resData,
                lengthList,

                idUpdate,

                displayForm,
                setDisplayForm,

                formData,
                setFormData,

                searchInput,
                setSearchInput,


                handlerBtnCreateClick,
                handlerBtnSaveClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnCloseClick,
                handlerBtnSearchClick,
            }}
        >
            {props.children}
        </VehicleContext.Provider>
    );
}
