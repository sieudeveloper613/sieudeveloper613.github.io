import { useMemo, useEffect, useCallback, useState, createContext } from "react";

/* configurations */
import { GARDEN_API, gardenCodeValidate } from ".";
import Validate from "../../../../../../utils/Validate";
import messageAlert from "../../../../../../utils/messageAlert";

/* hooks */
import { useAppSelector } from "../../../../../../redux/hooks";
import useMessageBox from "../../../../../../hooks/useMessageBox";

/* Types */
import { TFormData } from ".";
import { ITableCell } from "../../../../../common/DataTable";
import GardenFormData from "../../../../../../sharetype/form-data/resources/enterprise/farm-garden/GardenFormData";
import GardenResponse from "../../../../../../sharetype/response/resources/enterprise/farm-garden/GardenResponse";

export interface IGardenCodeProviderProps { }

export const GardenCodeContext = createContext<{
    dataSheet: ITableCell[];
    checkValidAll: boolean;
    displayForm: boolean;
    idUpdate: string | null;

    qrcodeDisplay: string | null;
    setQRCodeDisplay: React.Dispatch<React.SetStateAction<string | null>>;

    formData: TFormData;
    collection: GardenResponse.IData[]
    setFormData: React.Dispatch<React.SetStateAction<TFormData>>;

    handlerBtnCreateClick: () => any;
    handlerBtnUpdateClick: (id: string) => any;
    handlerBtnRemoveClick: (id: string) => any;
    handlerBtnViewClick: (id: string) => any;
    handlerBtnSaveClick: () => void;
    handlerBtnCloseClick: () => any;
    handlerBtnResetClick: (id: string) => any;
}>({} as any);

export default function GardenCodeProvider(props: React.PropsWithChildren<IGardenCodeProviderProps>) {
    const messageBox = useMessageBox();

    // create state
    const [formData, setFormData] = useState<TFormData>({});
    const [idUpdate, setIdUpdate] = useState<string | null>(null);
    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const [checkValidAll, setCheckValidAll] = useState<boolean>(false);
    const [qrcodeDisplay, setQRCodeDisplay] = useState<string | null>(null);
    const [collection, setCollection] = useState<GardenResponse.IData[]>([]);

    // create redux
    const rows = useAppSelector((state) => state.paging.row);
    const page = useAppSelector((state) => state.paging.currentPage);

    const loadData = useCallback(async () => {
        const response = await GARDEN_API.list(page, rows);

        if (response.status === "failure") {
            return messageAlert("error", "Lấy dữ liệu từ máy chủ thất bại!");
        }
        
        setCollection(response.data);
    }, [rows, page]);


    const create = useCallback(async (formDataValidated: GardenFormData.ICreate) => {
        const response = await GARDEN_API.create(formDataValidated);

        if (response.status === "failure") {
            return messageAlert("error", "Tạo mới khu vườn thất bại!");
        }

        setDisplayForm(false);
        messageAlert("success", "Tạo mới khu vườn thành công!");
        loadData();
    }, [loadData]);

    const update = useCallback(async (_id: string, formDataValidated: GardenFormData.ICreate) => {
        const response = await GARDEN_API.update(_id, formDataValidated);

        if (response.status === "failure") {
            return messageAlert("error", "Thay đổi thông tin khu vườn thất bại !");
        }

        setDisplayForm(false);
        messageAlert("success", "Thay đổi thông tin khu vườn thành công!");
        loadData();
    }, [loadData]);

    const remove = useCallback(async (_id: string) => {
        const response = await GARDEN_API.remove(_id);

        if (response.status === "failure") {
            return messageAlert("error", "Xóa khu vườn thất bại!");
        }

        messageAlert("success", "Xóa khu vườn thành công!");
        loadData();
    },[loadData]);

    const reset = useCallback(
        async (_id: string) => {
            const response = await GARDEN_API.reset(_id);

            if (response.status === "failure") {
                // if (response.data === "khuvuonchuacapnhatthongtin") {
                //     messageBox({
                //         message: "Reset dữ liệu thất bại! // Khu vườn chưa cập nhật thông tin, bạn không được phép tạo vòng đời mới",
                //         messageColor: "red",
                //         buttons: [
                //             {
                //                 label: "OK",
                //                 onClick() {
                //                     setQRCodeDisplay(undefined)
                //                 }
                //             },
                //         ],
                //     });
                // }
                // if (response.data === "chuathuhoach") {
                //     messageBox({
                //         message: "Reset dữ liệu thất bại! // Khu vườn chưa thu hoạch, bạn không được phép tạo vòng đời mới",
                //         messageColor: "red",
                //         buttons: [
                //             {
                //                 label: "OK",
                //                 onClick() {
                //                     setQRCodeDisplay(undefined)
                //                 }
                //             },
                //         ],
                //     });
                // }
                return messageAlert("error", "Tái tạo khu vườn thất bại!");
            }

            messageBox({
                message: "Reset dữ liệu thành công!",
                messageColor: "green",
                buttons: [
                    {
                        label: "OK",
                        onClick() {
                            setQRCodeDisplay("");
                        }
                    },
                ],
            });
            loadData();
        },
        [loadData]
    );

    // Memo ==========================================================

    const dataSheet: ITableCell[] = useMemo(() => {
        if (!collection) return [];

        return collection.map((item: GardenResponse.IData) => {
            return {
                _id: item._id,
                items: [item.gardenCode, item.gardenName],
            } as ITableCell;
        });
    }, [collection]);

    const gardenCodeAdded: Map<string, GardenResponse.IData> = useMemo(() => {
        if (!collection) return new Map();
        return collection.reduce((aggregate, item) => {
            aggregate.set(item.gardenCode?.trim().toLowerCase(), item);
            aggregate.set(item.gardenName?.trim().toLowerCase(), item);
            return aggregate;
        }, new Map<string, GardenResponse.IData>());
    }, [collection]);

    // Event handler =================================================

    const handlerBtnCreateClick = useCallback(() => {
        setIdUpdate(null);
        setDisplayForm(true);
    }, []);

    const handlerBtnUpdateClick = useCallback(
        (_id: string) => {
            if (!collection) {
                return messageAlert("warning", "Bạn không thể sửa khi chưa lấy được dữ liệu!");
            }

            const result = collection.find((x) => x._id === _id);
            if (!result) {
                return messageAlert(
                    "error",
                    "Hệ thống bị lỗi, bạn nên thông báo cho quản trị viên về trường hợp này!",
                );
            }

            setIdUpdate(_id);
            setFormData({
                //= avoid format by prettier
                gardenCode: result.gardenCode,
                gardenName: result.gardenName
            });
            setDisplayForm(true);
            setTimeout(() => {
                setCheckValidAll(true);
            }, 700);
        },
        [collection],
    );

    const handlerBtnRemoveClick = useCallback(
        async (_id: string) => {
            messageBox({
                message: "Bạn có chắc muốn xóa ?",
                buttons: [
                    {
                        label: "Xóa",
                        onClick() {
                            remove(_id);
                        },
                    },
                    { label: "Đóng" },
                ],
            });
        },
        [messageBox, remove],
    );

    const handlerBtnViewClick = useCallback((_id: string) => {
        setQRCodeDisplay(_id);
    }, []);

    const handlerBtnSaveClick = async () => {
        setCheckValidAll(true);
        if (!(await Validate.check(formData, gardenCodeValidate))) {
            return messageAlert("warning", "Bạn cần hoàn thiện một vài mục trước khi lưu!");
        }

        const gardenCode = String(formData.gardenCode)?.trim();
        const gardenName = formData.gardenName?.length ? String(formData.gardenName)?.trim() : "";
        const idGardenCodeAdded = gardenCodeAdded.get(gardenCode.toLowerCase());

        const formDataValidated = {
            gardenCode,
            gardenName
        } as GardenFormData.ICreate;

        // create ===================
        if (!idUpdate) {
            setCheckValidAll(false);
            if (idGardenCodeAdded) {
                return messageAlert("warning", "Bạn đã thêm mục này rồi!");
            }
            return create(formDataValidated);
        }

        // update ===============
        console.log("button update: ", {idGardenCodeAdded, formData})
        if (idGardenCodeAdded) {
            if (idGardenCodeAdded._id !== idUpdate) {
                return messageAlert("error", "Mục này đã được thêm!");
            }

            // Not change
            if (idGardenCodeAdded.gardenName === formData.gardenName) {
                messageAlert("info", "Không có thay đổi nào được thực hiện!");
                setDisplayForm(false);
                return;
            }
        }
        setCheckValidAll(false);

        return update(idUpdate, formDataValidated);
    };

    const handlerBtnCloseClick = useCallback(() => {
        setCheckValidAll(false);
        setDisplayForm(false);
    }, []);

    const handlerBtnResetClick = useCallback(
        (_id: string) => {
            messageBox({
                message: "Dữ liệu sau khi reset sẽ bị mất hết. Bạn có muốn thực hiện thao tác này không?",
                buttons: [
                    {
                        label: "Đồng ý",
                        onClick() {
                            reset(_id)
                        }
                    },
                    {
                        label: "Không",
                        onClick() {
                            setQRCodeDisplay("")
                        }
                    },
                ],
            });
        }, [messageBox, reset]);

    // Effect ======================

    useEffect(() => {
        if (displayForm) return;

        setIdUpdate(null);
        setFormData({});
    }, [displayForm]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <GardenCodeContext.Provider
            value={{
                dataSheet,
                collection,
                displayForm,
                idUpdate,
                checkValidAll,

                qrcodeDisplay,
                setQRCodeDisplay,

                formData,
                setFormData,

                handlerBtnCreateClick,
                handlerBtnSaveClick,
                handlerBtnUpdateClick,
                handlerBtnRemoveClick,
                handlerBtnCloseClick,
                handlerBtnViewClick,
                handlerBtnResetClick
            }}
        >
            {props.children}
        </GardenCodeContext.Provider>
    );
}
