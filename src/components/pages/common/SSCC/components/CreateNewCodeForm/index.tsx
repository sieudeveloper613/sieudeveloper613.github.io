import { useState } from "react";

/* components */
import TextField from "../../../../../common/TextField";
import WindowFormContainer, { WindowForm } from "../../../../../common/WindowFormContainer";

/* configurations */
import { Self } from "../..";
import useSSCCStore from "../../useSSCCStore";

/* styles */
import styles from "./CreateNewCodeForm.module.scss";

const CreatenewCodeForm = () => {
    // create context
    const { code, setCode, isValid, isDisplayCreatingForm, handleConfirmingCreatingForm, handleClosingCreatingForm } = useSSCCStore();

    // create state
    const [featch, setFeatch] = useState(false);

    return(
        <WindowFormContainer display={isDisplayCreatingForm} key={"WindowCreateNewCode"}>
            <WindowForm
                featch={featch}
                title={"Tạo mã SSCC mới"}
                width={"1000px"} height={"300px"}
                buttons={[
                    {
                        label: "x",
                        onClick: handleClosingCreatingForm,
                    },
                    {
                        label: "Đóng",
                        onClick: handleClosingCreatingForm,
                    },
                    {
                        label: "Lưu",
                        onClick: () => {
                            setFeatch(true);
                            handleConfirmingCreatingForm();
                            setFeatch(false);
                        },
                    },
                ]}>
                <div className={styles['form-container']}>
                    <TextField
                        checkValidAll={isValid}
                        markIsRequired
                        title={"Mã SSCC"}
                        className={styles['text-field']}
                        value={code}
                        placeholder={"Nhập mã SSCC mới"}
                        touched={true}
                        validator={Self.SSCCValidation.code}
                        invalidMessage={"Mã SSCC không được để trống!"}
                        onChange={setCode}
                    />
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default CreatenewCodeForm;

