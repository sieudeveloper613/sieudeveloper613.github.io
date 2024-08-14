import { useState } from "react";

/* components */
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import useProcessCodeStore from "../../useProcessCodeStore";
import messageAlert from "../../../../../../../../utils/messageAlert";

/* styles */
import styles from "./EditingForm.module.scss";

/* packages */
import { QRCodeSVG } from "qrcode.react";

const EditingForm = () => {
    // create store
    const { 
        isDisplays, 
        selectedItem, 
        handleEditConfirm, 
        handleEditFormClose, 
    } = useProcessCodeStore();

    // create variable
    const qrText: string = `ID: ${selectedItem?._id}\nMã quy trình: ${selectedItem?.code}\nNguyên liệu: ${selectedItem?.ingredientName}`

    // create state
    const [featch] = useState<boolean>(false);

    const handleQrCodeDownload = () => {
        return messageAlert("info", "Hệ thống đang phát triển, thử lại sau!");
    }

    return (
        <WindowFormContainer display={isDisplays.edit} key={"EditingForm"}>
            <WindowForm
                styleBody={{ backgroundColor: "white" }}
                backgroundColor={"#FFFFFF"}
                featch={featch}
                title={"Chỉnh sửa mã quy trình"}
                width={"768px"} height={"auto"}
                buttons={[
                    {
                        label: "x",
                        onClick: handleEditFormClose
                    },
                    {
                        label: "Đóng",
                        onClick: handleEditFormClose
                    }
                ]}
            >
                <div className={styles["container"]}>
                    <div className={styles["children-row"]}>
                       <div className={styles["left-container"]}>
                       <QRCodeSVG className={styles["qr-image"]} value={qrText}  size={216}/>,
                       {/* <img 
                            className={styles["qr-image"]} 
                            src={qrSource}
                            alt="qr code" width={216} height={216}/> */}
                            <button type="button" className={styles["download-button"]} onClick={handleQrCodeDownload}>
                                <span className={styles["download-icon"]}>download</span>
                            </button>
                       </div>
                        <div className={styles["right-container"]}>
                            <div className={styles["column"]}>
                                <label>Mã quy trình</label>
                                <input disabled className={styles["input"]} type="text" defaultValue={selectedItem?.code} />
                            </div>
                            <div className={styles["column"]}>
                                <label>Nguyên liệu</label>
                                <input disabled className={styles["input"]} type="text" defaultValue={selectedItem?.ingredientName}/>
                            </div>
                        </div>
                    </div>
                    <button type="button" className={styles["create-button"]} onClick={() => handleEditConfirm(selectedItem?.code || "")}>Tạo vòng đời mới</button>
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default EditingForm;
