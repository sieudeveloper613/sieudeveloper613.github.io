import { useState } from "react";
import { Link } from "react-router-dom";
/* components */
import WindowFormContainer, { WindowForm } from "../../../../../common/WindowFormContainer";

/* configurations */
import useSSCCStore from "../../useSSCCStore";

/* styles */
import styles from "./ResetingForm.module.scss";
import axiosClient from "../../../../../../core/axiosClient";
import { buffer } from "stream/consumers";

const ResetingForm = () => {
    // create context 
    const { resetableValue, isDisplayResetingAlert, handleClosingResetingForm, handleConfirmingResetingSSCC } = useSSCCStore();

    // create constants
    const replacedCode = resetableValue!.code?.replace(/\s/g, "+");
    const downloadedName = `SSCC_${resetableValue!.code?.replace(/\s/g, "-")}`;
    const formatedSource = `https://barcode.tec-it.com/barcode.ashx?data=${replacedCode}&code=Code128&translate-esc=on`;

    // create state
    const [featch, setFeatch] = useState(false);

    const handleDownloadingSSCCCode = async (imageSource: string, imageName: string, forceDownload: boolean) => {
        if (!forceDownload) {
            const link = document.createElement("a");
            link.href = imageSource;
            link.download = imageName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        const imageBlob = await fetch(imageSource)
            .then(response => response.arrayBuffer())
                .then(buffer => new Blob([buffer], { type: "image/gif" }));
        
        console.log("image-blob: ", imageBlob);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(imageBlob);
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <WindowFormContainer display={isDisplayResetingAlert} key={"WindowResetSSCC"}>
            <WindowForm
                styleBody={{ backgroundColor: "white" }}
                backgroundColor={"#FFFFFF"}
                featch={featch}
                title={"Tạo lại vòng đời"}
                width={"1000px"} height={"auto"}
                buttons={[
                    {
                        label: "x",
                        onClick: handleClosingResetingForm,
                    },
                ]}>
                <div className={styles["form-container"]}>
                    <h3>Mã SSCC</h3>
                    <span>
                        <h5>{resetableValue.code ? resetableValue.code : "..."}</h5>
                    </span>
                    {
                        resetableValue.code ? (
                            <img 
                                alt="Barcode Generator TEC-IT" 
                                src={formatedSource}
                                width={480} height={192} 
                            />
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                    <div className={styles["button-container"]}>
                        <button 
                            type={"submit"} 
                            className={styles["submit-button"]} 
                            style={{ backgroundColor: "green" }} 
                            onClick={() => handleDownloadingSSCCCode(formatedSource, downloadedName, false)}
                        >
                            Tải xuống mã 
                            <span className="material-symbols-outlined" style={{ marginLeft: 8 }}>download</span>
                        </button>
                        <button 
                            type={"submit"}
                            className={styles["submit-button"]} 
                            style={{ backgroundColor: "darkcyan" }}
                            onClick={handleConfirmingResetingSSCC} 
                        >
                            Tạo vòng đời mới
                        </button>
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default ResetingForm;