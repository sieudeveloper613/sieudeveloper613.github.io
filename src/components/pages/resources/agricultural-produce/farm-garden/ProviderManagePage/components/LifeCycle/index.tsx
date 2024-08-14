import { useState } from "react";

/* components */
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import useProviderManageStore from "../../useProviderManageStore";
import messageAlert from "../../../../../../../../utils/messageAlert";

/* styles */
import styles from "./LifeCycle.module.scss";
import SupplierManagementResponse from "../../../../../../../../sharetype/response/resources/enterprise/farm-garden/SupplierManagementResponse";
import moment from "moment";

const LifeCycle = () => {
    // collect value from store
    const { isDisplayForms, selectedItem, handleLifeCycleViewClose } = useProviderManageStore();

    // create state
    const [image, setImage] = useState<any>(null);

    const handleImageViewOpen = (value: string) => {
        if (!value) {
            return messageAlert("info", "Nhà cung cấp này không cung cấp hình ảnh!");
        }
        setImage(value);
    };

    const handleImageViewClose = () => setImage(null);

    return (
        <WindowFormContainer display={isDisplayForms.view} key={"LifeCycleView"}>
            <WindowForm
                title={"Vòng đời"}
                width={"1280px"}
                height={"auto"}
                featch={false}
                buttons={[
                    {
                        label: "X",
                        onClick: () => {
                            handleLifeCycleViewClose();
                            handleImageViewClose();
                        }
                    },
                    {
                        label: "Close",
                        onClick: () => {
                            handleLifeCycleViewClose();
                            handleImageViewClose();
                        }
                    }
                ]}
            >
                <div className={styles["container"]}>
                    {
                        !image ? (
                            <table className={styles["table-wrapper"]}>
                                <tr className={styles["header-wrapper"]}>
                                    <th>STT</th>
                                    <th>Tên vật tư</th>
                                    <th>Loại vật tư</th>
                                    <th>Ngày giao</th>
                                    <th>Ngày sản xuất</th>
                                    <th>Hạn sử dụng</th>
                                    <th>Hình ảnh</th>
                                </tr>
                                {
                                    selectedItem?.management?.map((item: SupplierManagementResponse.IManagement, index: number) => {
                                        return (
                                            <tr key={item._id} className={styles["data-wrapper"]}>
                                                <td>{index + 1}</td>
                                                <td>{item.materialName}</td>
                                                <td>{item.materialType}</td>
                                                <td>{moment(item.deliveryDate).format("DD/MM/YYYY")}</td>
                                                <td>{moment(item.manufaturingDate).format("DD/MM/YYYY")}</td>
                                                <td>{moment(item.expiryDate).format("DD/MM/YYYY")}</td>
                                                <td><span onClick={() => handleImageViewOpen(item.materialImage)}>visibility</span></td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        ) : (
                            <>
                                <button className={styles["button"]} type={"button"} onClick={handleImageViewClose}>
                                    <span className={styles["button-icon"]}>chevron_left</span>
                                    Hình ảnh
                                </button>
                                <img className={styles["image"]} width={"50%"} height={"360px"} src={URL.createObjectURL(image)} alt={"Provider image review"} />
                            </>
                        )
                    }
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default LifeCycle;