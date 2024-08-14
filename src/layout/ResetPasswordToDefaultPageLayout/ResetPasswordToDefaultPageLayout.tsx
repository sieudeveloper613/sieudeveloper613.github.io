import React from 'react';
import api from '../../api';
import Header from '../../components/common/Header/Header';
import NavBar from '../../components/common/NavBar';
import { useAppDispatch } from '../../redux/hooks';
import userSlice from '../../redux/userSlice';
import resetPassFormDataApi from '../../sharetype/form-data/resetPassFormDataApi';
import ResetPassFormData from '../../sharetype/form-data/resetPassFormData';
import make from '../../utils/make';

import styles from './ResetPasswordToDefaultPageLayout.module.scss';
import messageAlert from '../../utils/messageAlert';


export interface IResetPasswordToDefaultPageLayoutProps {
    data?: String;
}

export default function ResetPasswordToDefaultPageLayout(props: IResetPasswordToDefaultPageLayoutProps) {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = React.useState<ResetPassFormData.IresetPassFormData>({
        email: ''
    });

    const handlerInputChange =
        (k: 'email') => (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget?.value || '';
            setFormData((preState: any) => {
                const newState = { ...preState };
                newState[k] = v;

                return newState;
            });
        };

    const handlerButtonResetPassClick = async (formData: ResetPassFormData.IresetPassFormData) => {
        const dataResetPassword = (): resetPassFormDataApi.IresetPassFormDataApi => {
            return {
                userName: formData.email,
                password: "00000000",
            };
        };
        const res = await api.resetPasswordApi.resetPassword(dataResetPassword());
        console.log(res)
        if (res.status === 'failure') {
            messageAlert('error', 'Email không hợp lệ');
            return;
        }

        if (res.status === 'successfully') {
            messageAlert('success', 'Thay đổi thành công,hãy đăng nhập lại');
            setTimeout(() => {
                dispatch(userSlice.actions.logout());
            }, 4000);
            return;
        }
        console.log(formData);
    };

    return (
        <div className={make.className([styles['default-layout']])}>
            <Header />
            <div className={styles['container']}>
                <div className={styles['navbar']}>
                    <NavBar />
                </div>
                <main className={styles['main']}>
                    <div>
                        <h1>Đặt lại mật khẩu</h1>
                        <div className={styles['form']}>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handlerInputChange('email')}
                                />
                            </div>
                            <button onClick={() => handlerButtonResetPassClick(formData)}>Đặt lại mật khẩu</button>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
}
