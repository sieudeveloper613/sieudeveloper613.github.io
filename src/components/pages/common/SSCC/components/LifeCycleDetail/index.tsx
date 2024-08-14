import { useEffect, useState } from "react";

/* configurations */
import { Self } from "../..";
import * as XLSX from "xlsx";
import useSSCCStore from "../../useSSCCStore";

/* styles */
import styles from "./LifeCycleDetail.module.scss"
import moment from "moment";

const LifeCycleDetail = () => {
    // create context 
    const { isDisplayLifeCycle, handleClosingLifeCycle, childrenCollection } = useSSCCStore();

    // create state
    const [isMore, setIsMore] = useState<boolean>(false);
    const [values, setValues] = useState<any | null>({});
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedId) {
            setValues(childrenCollection?.find((item: any) => item._id === selectedId));
        }
    }, [selectedId])

    const toggleMore = (id: string) => {
        if (selectedId === id) {
            setIsMore(!isMore);
        } else {
            setSelectedId(id);
            setIsMore(true);
        }
    };

    const handleClose = () => {
        handleClosingLifeCycle();
        setIsMore(false);
        setSelectedId(null);
        setValues({});
    }

    const handleExportingLifeCycleItemToExcel = () => {
        console.log("you clicked!")
        /* initialize file's name when export to excel */
        const fileName = `${values._id}_${moment(values.createdAt).format("DD_MM_YYYY")}_${new Date().getTime()}.xlsx`;

        /* generate worksheet and workbook */
        const worksheet = XLSX.utils.json_to_sheet(values.containers);
        const workbook = XLSX.utils.book_new();

        /* fix header */
        XLSX.utils.sheet_add_aoa(worksheet, [["Mã sản phẩm", "Tên sản phẩm", "Khối lượng", "Tổng khối lượng"]], { origin: "A1" });

        /* calculate column width */
        const maxWidthForId = values.containers.reduce((w: any, r: any) => Math.max(w, r._id.length), 30);
        const maxWidthForName = values.containers.reduce((w: any, r: any) => Math.max(w, r.name.length), 20);
        const maxWidthForAmount = values.containers.reduce((w: any, r: any) => Math.max(w, String(r.quantity).length), 15);
        const maxWidthForTotal = values.containers.reduce((w: any, r: any) => Math.max(w, String(r.totalWeight).length), 15);
        worksheet["!cols"] = [{ wch: maxWidthForId }, { wch: maxWidthForName }, { wch: maxWidthForAmount }, { wch: maxWidthForTotal }];

        XLSX.utils.book_append_sheet(workbook, worksheet, "SSCC");
        XLSX.writeFile(workbook, fileName, { compression: true });
    }

    if (!isDisplayLifeCycle) {
        return null;
    }

    return (
        <div className={styles["modal"]}>
            <div className={styles["container"]}>
                <div className={styles["header"]}>
                    <h2>Vòng đời</h2>
                    <button type="button" onClick={handleClose}>Đóng</button>
                </div>
                <main>
                    <section className={styles["parents"]} style={{ width: isMore ? "65%" : "100%" }}>
                        <table>
                            <tr>
                                <th>STT</th>
                                <th>Ngày khởi tạo</th>
                                <th>Ngày xuất hàng</th>
                                <th>Ngày nhập hàng</th>
                                <th>Xe</th>
                                <th>Tài xế</th>
                                <th>Sản phẩm</th>
                            </tr>
                            {
                                childrenCollection?.filter((item: any) => !item.isDelete)?.map((item: any, index: number) => {
                                    return (
                                        <>
                                            <tr key={index} style={{ backgroundColor: isMore && selectedId === item._id ? "rgba(0, 255, 0, 0.2)" : "white" }}>
                                                <td>{index + 1}</td>
                                                <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                                <td>{item.exportTime ? moment(item.exportTime).format("DD/MM/YYYY") : "---"}</td>
                                                <td>{item.importTime ? moment(item.importTime).format("DD/MM/YYYY") : "---"}</td>
                                                <td>{item.delivery ? item.delivery.vehicle : "---"}</td>
                                                <td>{item.delivery ? item.delivery.driver : "---"}</td>
                                                <td style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleMore(item._id)}>
                                                    <div>
                                                        <header>Xem</header>
                                                        {
                                                            isMore && selectedId === item._id ?
                                                                <span>keyboard_arrow_left</span>
                                                                :
                                                                <span>keyboard_arrow_right</span>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </section>
                    <section className={styles["children"]} style={{ width: isMore ? "35%" : "0%" }}>
                        <button
                            type={"button"}
                            className={styles["excel-button"]}
                            style={{ display: isMore ? "flex" : "none" }}
                            onClick={handleExportingLifeCycleItemToExcel}>
                                Xuất tệp Excel
                                <span>download</span>
                        </button>
                        {
                            isMore && Object.keys(values).length > 0 && (

                                <table className={styles["children-table-container"]}>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Trọng lượng tổng</th>
                                    </tr>
                                    {
                                        values.containers.map((item: any, index: number) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.totalWeight}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            )
                        }
                    </section>
                </main>
            </div>
        </div>
    )
}

export default LifeCycleDetail;