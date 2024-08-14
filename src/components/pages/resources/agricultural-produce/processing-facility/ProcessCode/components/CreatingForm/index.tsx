import { useState } from "react";

/* components */
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import useProcessCodeStore from "../../useProcessCodeStore";

/* styles */
import styles from "./CreatingForm.module.scss";

const CreatingForm = () => {
    // create store
    const { 
        code, 
        ingredients, 
        isDisplays, 
        setCode, 
        handleCreateConfirm, 
        handleCreatingFormClose, 
        handleIngredientSelected 
    } = useProcessCodeStore();

    // create state
    const [featch] = useState<boolean>(false);

    function handleValueChange(event: any) {
        handleIngredientSelected(event.target.value);
    }

    return (
        <WindowFormContainer display={isDisplays.create} key={"CreatingForm"}>
            <WindowForm
                styleBody={{ backgroundColor: "white" }}
                backgroundColor={"#FFFFFF"}
                featch={featch}
                title={"Tạo mã quy trình mới"}
                width={"1024px"} height={"auto"}
                buttons={[
                    {
                        label: "x",
                        onClick: handleCreatingFormClose
                    },
                    {
                        label: "Đóng",
                        onClick: handleCreatingFormClose
                    },
                    {
                        label: "Lưu",
                        onClick: handleCreateConfirm,
                    },
                ]}>
                <div className={styles["form-container"]}>
                    <div className={styles["input-container"]}>
                        <label>Mã quy trình</label>
                        <input type={"text"} value={code} onChange={e => setCode(e.target.value)} />
                    </div>

                    <div className={styles["select-container"]}>
                        <label>Nguyên liệu</label>
                        <select id="ingredient-selection" placeholder={"Chọn nguyên liệu"} onChange={handleValueChange}>
                            {
                                ingredients.map((item: any) => {
                                    return(
                                        <option key={item._id} value={item.value}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default CreatingForm;