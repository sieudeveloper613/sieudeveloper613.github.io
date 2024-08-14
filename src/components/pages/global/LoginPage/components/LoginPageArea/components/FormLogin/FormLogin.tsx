import * as React from 'react';
import LoginFormData from '../../../../../../../../sharetype/form-data/LoginFormData';

import make from '../../../../../../../../utils/make';

import styles from './FormLogin.module.scss';

export interface IFormLoginProps {
    onButtonLoginClick?: (v: LoginFormData.ISignIn) => any;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormLogin(props: IFormLoginProps) {
    const [formData, setFormData] = React.useState<LoginFormData.ISignIn>({
        userName: '',
        password: '00000000',
    });


    const handlerButtonLoginClick = () => {
        if (props.onButtonLoginClick) props.onButtonLoginClick(formData);
    };

    const handlerInputChange = (k: 'userName' | 'password') => (e: React.FormEvent<HTMLInputElement>) => {
        const v = e.currentTarget?.value || '';
        setFormData((preState) => {
            const newState = { ...preState };
            newState[k] = v;

            return newState;
        });
    };

    const handlerSetShowForgot = () => {
        props.setShow(!props.show)
    }
    const handleKeyPress = (event:any) => {
        if(event.key === 'Enter'){
            handlerButtonLoginClick()
        }
      }
    return (
        <>
            <form className={make.className([styles['form-login']])}>
                <div className={styles['logo']}>lock</div>

                <h2 className={styles['title']}>Đăng nhập</h2>

                <div className={make.className(['user-name', 'input'], styles)}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Địa chỉ email *'
                        value={formData.userName}
                        onChange={handlerInputChange('userName')}
                    />
                </div>

                <div className={make.className(['password', 'input'], styles)}>
                    <input
                        type='password'
                        name='password'
                        placeholder='Mật khẩu *'
                        value={formData.password}
                        onChange={handlerInputChange('password')}
                        onKeyUp={handleKeyPress}
                    />
                </div>

                <div className={make.className(['remember-login'], styles)}>
                    <input type='checkbox' />
                    <label>Ghi nhớ đăng nhập</label>
                </div>

                <button
                    className={make.className(['button-login'], styles)}
                    type='button'
                    onClick={handlerButtonLoginClick}
                >
                    Đăng nhập
                </button>

                <div>
                    <span style={{cursor: "pointer"}} onClick={handlerSetShowForgot}>Quên mật khẩu</span>
                </div>
            </form>
        </>
    );
}
