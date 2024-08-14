import { useState } from "react";

/* components */
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import useProcessCodeStore from "../../useProcessCodeStore";
import messageAlert from "../../../../../../../../utils/messageAlert";

/* styles */
import styles from "./LifeCycleView.module.scss";

interface IViews {
    ingredient: boolean,
    process: boolean,
    product: boolean,
}

const LifeCycle = () => {
    // collect value from store
    const { isDisplays, selectedItem, handleLifeCycleViewClose } = useProcessCodeStore();

    // create state
    const [featch] = useState<boolean>(true);
    const [selectedChildren, setSelectedChildren] = useState<any>(null);
    const [isViews, setIsViews] = useState<IViews>({ ingredient: false, process: false, product: false });

    const handleViewChange = (value: string, data: any) => {
        console.log("value change: ", value); 
        switch(value) {
            case "ingredient": 
                setSelectedChildren(data);
                setIsViews(({ ingredient: true, process: false, product: false }));
                break;
            case "process": 
                setSelectedChildren(data);
                setIsViews(({ ingredient: false, process: true, product: false }));
                break;
            case "product":
                setSelectedChildren(data); 
                setIsViews(({ ingredient: false, process: false, product: true }));
                break;
        }
    }

    const handlePreviousViewChange = () => setIsViews({ ingredient: false, process: false, product: false });

    const handleExcelFileDownload = () => {
        return messageAlert("info", "Hệ thống đang phát triển, thử lại sau!");
    }

    const PreviousButton = ({ title, onPress }: { title: string, onPress: () => void }) => {
        return (
            <button 
                style={{ 
                    gap: "12px",
                    border: "none",
                    padding: "12px 0px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",

                    fontSize: "24px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase"
                }}
                type="button" onClick={onPress}>
                <span 
                    className={"material-symbols-outlined"}
                    style={{ 
                        color: "white", 
                        padding: "8px",
                        fontSize: "24px", 
                        borderRadius: "24px", 
                        backgroundColor: "orange", 
                    }}
                >
                    keyboard_arrow_left
                </span>
                <span>{title}</span>
            </button>
        )
    }

    const ExcelButton = ({ title, onPress }: { title: string, onPress: () => void }) => {
        return (
            <button
                style={{ 
                    gap: "4px",
                    height: "48px", 
                    border: "none", 
                    display: "flex",
                    padding: "0px 24px", 
                    borderRadius: "24px", 
                    backgroundColor: "green", 
                    alignItems: "center",
                    
                    color: "white", 
                    textAlign: "center", 
                    fontWeight: "bold" 
                }}
                type={"button"} onClick={onPress}>
                {title}
                <span className={"material-symbols-outlined"}>download</span>
            </button>
        )
    }

    return (
        <WindowFormContainer display={isDisplays.view}>
            <WindowForm
                styleBody={{ backgroundColor: "white" }}
                backgroundColor={"#FFFFFF"}
                featch={featch}
                title={"Vòng đời"}
                width={"1280px"} height={"auto"}
                buttons={[
                    {
                        label: "x",
                        onClick: () => {
                            handleLifeCycleViewClose();
                            handlePreviousViewChange();
                            setSelectedChildren(null);
                        }
                    },
                    {
                        label: "Đóng",
                        onClick: () => {
                            handleLifeCycleViewClose();
                            handlePreviousViewChange();
                            setSelectedChildren(null);
                        }
                    },
                ]}
            >
                <div className={styles["container"]}>
                    {
                        !isViews.ingredient && !isViews.process && !isViews.product ? (
                            <table className={styles["table-container"]}>
                                <tr className={styles["title"]}>
                                    <th>STT</th>
                                    <th>Ngày khởi tạo</th>
                                    <th>Nguyên liệu trước chế biến</th>
                                    <th>Quy trình</th>
                                    <th>Sản phẩm</th>
                                </tr>
                                {
                                    selectedItem?.lifeCycle?.map((item: any, index: number) => {
                                        return (
                                            <tr key={item._id} className={styles["value"]}>
                                                <td>{index + 1}</td>
                                                <td style={{ fontWeight: "bold", fontSize: "16px", letterSpacing: "1px"}}>{item.createdDate}</td>
                                                <td><button type="button" onClick={() => handleViewChange("ingredient", item.rawMaterials)}>visibility</button></td>
                                                <td><button type="button" onClick={() => handleViewChange("process", item.processes)}>visibility</button></td>
                                                <td><button type="button" onClick={() => handleViewChange("product", item.products)}>visibility</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        ) : isViews.ingredient && !isViews.process && !isViews.product ? (
                            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <PreviousButton title={"Nguyên liệu trước chế biến"} onPress={handlePreviousViewChange}/>
                                    <ExcelButton title={"Xuất tệp Excel"} onPress={handleExcelFileDownload} />
                                </div>
                                <br />
                                <table className={styles["table-container"]}>
                                    <tr className={styles["title"]}>
                                        <th>Trang trại</th>
                                        <th>Mã khu vườn</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Khối lượng</th>
                                    </tr>
                                    {
                                        selectedChildren?.map((item: any) => {
                                            return (
                                                <tr key={item._id} className={styles["value"]}>
                                                    <td>{item.farm}</td>
                                                    <td>{item.gardenCode}</td>
                                                    <td>{item.materialName}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        ) : isViews.process && !isViews.ingredient && !isViews.product ? (
                            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                <PreviousButton title={"Chi tiết quy trình"} onPress={handlePreviousViewChange}/>
                                <br />
                                <div style={{ flex: 1, flexDirection: "row", gap: "12px", display: "flex" }}>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                        <label className={styles["label-table"]}>Rửa sạch</label>
                                        <table className={styles["table-container"]}>
                                            <tr className={styles["title"]}>
                                                <th>Lần</th>
                                                <th>Thời gian</th>
                                                <th>Ngày</th>
                                            </tr>
                                            {
                                                selectedChildren?.washing
                                                    .sort((a: any, b: any) =>  new Date(a[1]).getTime() - new Date(b[1]).getTime())
                                                        .map((item: any, index: number) => {
                                                            return (
                                                                <tr key={item._id} className={styles["value"]}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item[0]}</td>
                                                                    <td>{item[1]}</td>
                                                                </tr>
                                                            )
                                                        })
                                            }
                                        </table>
                                    </div>
                                    
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                        <label className={styles["label-table"]}>Sấy khô</label>
                                        <table className={styles["table-container"]}>
                                            <tr className={styles["title"]}>
                                                <th>Lần</th>
                                                <th>Thời gian</th>
                                                <th>Ngày</th>
                                            </tr>
                                            {
                                                selectedChildren?.drying
                                                    .sort((a: any, b: any) =>  new Date(a[1]).getTime() - new Date(b[1]).getTime())
                                                        .map((item: any, index: number) => {
                                                            return (
                                                                <tr key={item._id} className={styles["value"]}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item[0]}</td>
                                                                    <td>{item[1]}</td>
                                                                </tr>
                                                            )
                                                        })
                                            }
                                        </table>
                                    </div>

                                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                        <label className={styles["label-table"]}>Bốc vỏ</label>
                                        <table className={styles["table-container"]}>
                                            <tr className={styles["title"]}>
                                                <th>Lần</th>
                                                <th>Thời gian</th>
                                                <th>Ngày</th>
                                            </tr>
                                            {
                                                selectedChildren?.peel
                                                    .sort((a: any, b: any) =>  new Date(a[1]).getTime() - new Date(b[1]).getTime())
                                                        .map((item: any, index: number) => {
                                                            return (
                                                                <tr key={item._id} className={styles["value"]}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item[0]}</td>
                                                                    <td>{item[1]}</td>
                                                                </tr>
                                                            )
                                                        })
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : isViews.product && !isViews.ingredient && !isViews.process && (
                            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <PreviousButton title={"Chi tiết sản phẩm"} onPress={handlePreviousViewChange}/>
                                    <ExcelButton title={"Xuất tệp Excel"} onPress={handleExcelFileDownload} />
                                </div>
                                
                                <br />
                                <table className={styles["table-container"]}>
                                    <tr className={styles["title"]}>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Trọng lượng tổng</th>
                                    </tr>
                                    {
                                        selectedChildren?.map((item: any, index: number) => {
                                            return (
                                                <tr key={item._id} className={styles["value"]}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.totalAmount}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        )
                    }
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default LifeCycle;