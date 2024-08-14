import React, { useState } from "react";

/* components */
import NavBar from "../../components/common/NavBar";
import Header from "../../components/common/Header/Header";

/* configurations */
import api from "../../api";
import make from "../../utils/make";
import images from "../../resources/images";
import messageAlert from "../../utils/messageAlert";
import changePassFormDataApi from "../../sharetype/form-data/changePassFormDataApi";

/* hooks */
import userSlice from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

/* types */
import styles from "./ResetPasswordPageLayout.module.scss";
import ChangePassFormData from "../../sharetype/form-data/changePassFormData";
import Logo from "../../components/common/Header/components/Logo";

interface IInput {
    type: string,
    title: string,
    value: string,
    placeholder: string,
    onRemove: () => void,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void,
}

export default function ResetPasswordPageLayout() {
    
    /** create redux */
    const dispatch = useAppDispatch();
    const infoAccount = useAppSelector((state) => state.user.userInfo?.email);
    
    /** create state */
    const [formData, setFormData] = React.useState<ChangePassFormData.IchangePassFormData>({
        password: "",
        newPassword: "",
        comfirmPassword: "",
    });

    const handlerInputChange = (k: "password" | "comfirmPassword" | "newPassword") => (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget?.value || "";

        setFormData((preState: any) => {
            const newState = { ...preState };
            newState[k] = value;

            return newState;
        });
    };

    const onRemoveText = (k: "password" | "comfirmPassword" | "newPassword") => {
        setFormData({...formData, [k]: ""});
    }

    const handlerButtonChangPassClick = async (formData: ChangePassFormData.IchangePassFormData) => {
        const dataChangePassword = (): changePassFormDataApi.IchangePassFormDataApi => {
            return {
                userName: infoAccount,
                password: formData.password,
                passwordNew: formData.newPassword,
            };
        };

        if (!formData.password && !formData.newPassword && !formData.comfirmPassword) {
            messageAlert("error", "Vui lòng nhập thông tin!");
            return;
        }

        if (!formData.password) {
            messageAlert("error", "Vui lòng nhập mật khẩu hiện tại!");
            return;
        }

        if (!formData.newPassword) {
            messageAlert("error", "Vui lòng nhập mật khẩu mới!");
            return;
        } else if (formData.newPassword.length < 8) {
            messageAlert("error", "Độ dài mật khẩu mới tối thiểu phải là 8 ký tự!");
            return;
        }

        if (!formData.comfirmPassword) {
            messageAlert("error", "Vui lòng nhập lại mật khẩu!");
            return;
        }

        if (formData.newPassword !== formData.comfirmPassword) {
            messageAlert("error", "Mật khẩu mới không trùng khớp!");
            return;
        }

        const response = await api.changePasswordApi.changePassword(dataChangePassword());

        if (response.status === "failure") {
            messageAlert("error", "Đổi mật khẩu không thành công. Vui lòng thử lại sau!");
            return;
        }

        if (response.status === "successfully") {
            messageAlert("success", "Thay đổi thành công, hãy đăng nhập lại!");
            setTimeout(() => {
                dispatch(userSlice.actions.logout());
            }, Math.random() * 3000);

            return;
        }
    };

    return (
        <div className={make.className([styles["default-layout"]])}>
            <Header />
            <div className={styles["container"]}>
                <div className={styles["navbar"]}>
                    <NavBar />
                </div>
                <main className={styles["main"]}>
                    <div className={styles["form-container"]}>
                        <img src={images.logo} alt="checkee logo" width={256} height={"auto"} />
                        <h3>đổi mật khẩu</h3>
                        <div className={styles["form"]}>
                            <Input 
                                title={"Mật khẩu cũ"} 
                                placeholder={"Nhập mật khẩu hiện tại"} 
                                type={"password"} 
                                value={formData.password} 
                                onChange={handlerInputChange("password")}
                                onRemove={() => onRemoveText("password")}
                            />
                            <Input 
                                title={"Mật khẩu mới"} 
                                placeholder={"Nhập mật khẩu mới (tối thiểu 8 ký tự)"} 
                                type={"newPassword"} 
                                value={formData.newPassword} 
                                onChange={handlerInputChange("newPassword")}
                                onRemove={() => onRemoveText("newPassword")}
                            />
                            <Input 
                                title={"Xác nhận mật khẩu"}
                                placeholder={"Xác nhận mật khẩu mới"} 
                                type={"comfirmPassword"} 
                                value={formData.comfirmPassword} 
                                onChange={handlerInputChange("comfirmPassword")}
                                onRemove={() => onRemoveText("comfirmPassword")}
                            />
                            <button onClick={() => handlerButtonChangPassClick(formData)}>Đổi mật khẩu</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

const Input = ({ title, placeholder, type, value, onChange, onRemove }: IInput) => (
    <div className={styles["input-container"]}>
        <label htmlFor="pwd">{title}</label>
        <div className={styles["input-wrapper"]}>
            <input
                placeholder={placeholder}
                type="password"
                name={type}
                value={value}
                onChange={onChange}
            />
            { value && <span onClick={onRemove} className={styles["button-icon"]}>close</span> }
        </div>
    </div>
)
