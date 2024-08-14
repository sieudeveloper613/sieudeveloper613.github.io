import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import localStorageClient from '../../../../../../core/localStorageClient';
import { useAppDispatch } from '../../../../../../redux/hooks';
import LoginFormData from '../../../../../../sharetype/form-data/LoginFormData';
import make from '../../../../../../utils/make';
import Layer from '../../../../../common/Layer';
import Background from './components/Background';
import FormLogin from './components/FormLogin';
import styles from './LoginPageArea.module.scss';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userSlice from '../../../../../../redux/userSlice';
import api from '../../../../../../api';
import FormForgot from './components/FormForgot/FormForgot';

export interface ILoginPageAreaProps {
    className?: string;
}

export default function LoginPageArea(props: ILoginPageAreaProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [show, setShow] = React.useState<boolean>(false)

    const handlerButtonLoginClick = async (formData: LoginFormData.ISignIn) => {
        const res = await api.login.signIn(formData);

        if (res.status === 'failure' || !res.data) {
            toast.error("Đăng nhập thất bại!")
            return;
        }
        localStorageClient.userInfo = res.data;
        dispatch(userSlice.actions.updateUserInfo(res.data));

        navigate('/', { replace: false });
    };

    return (
        <div className={make.className([styles['login-page-area'], props.className])}>
            <Layer width='100vw' height='100vh'>
                <Background />
            </Layer>

            <Layer
                className={{
                    layer: make.className(['form-login-container'], styles),
                }}
                width='100vw'
                height='100vh'
            >
                <FormLogin show={show} setShow={setShow} onButtonLoginClick={handlerButtonLoginClick} />
            </Layer>
            <FormForgot show={show} setShow={setShow}/>
        </div>
    );
}
