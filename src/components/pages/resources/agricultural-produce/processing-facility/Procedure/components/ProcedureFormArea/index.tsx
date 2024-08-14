import React, { useState } from "react";

/* components */
import TextField from "../../../../../../../common/TextField";
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import { Self } from "../..";
import useProcedureStore from "../../useProcedureStore";

/* styles */
import styles from "./ProcedureForm.module.scss"

const ProcedureFormArea = () => {

    const { isValid, isDisplayForm, handleCloseForm, handleSubmitForm, procedure, setProcedure } = useProcedureStore();

    // create state
    const [featch, setFeatch] = useState<boolean>(false);

    return(
        <WindowFormContainer display={isDisplayForm} key={"WindowAddNewDriver"}>
            <WindowForm
                featch={featch}
                title={"Tạo mới Quy trình"}
                width={"1000px"}
                height={"300px"}
                buttons={[
                    {
                        label: "x",
                        onClick: handleCloseForm,
                    },
                    {
                        label: "Lưu",
                        onClick: () => {
                            setFeatch(true);
                            handleSubmitForm();
                            setTimeout(() => {
                                setFeatch(false);
                            }, 4000);
                        },
                    },
                ]}
            >
                <div className={styles["form-container"]}>
                    <TextField
                        touched={true}
                        markIsRequired
                        checkValidAll={isValid}
                        title={"Tên quy trình"}
                        className={styles["text-field"]}
                        value={procedure}
                        onChange={setProcedure}
                        validator={Self.procedureValidation.procedure}
                        invalidMessage={"Tên quy trình không được để trống!"}
                    />
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default ProcedureFormArea;