import * as React from 'react';
import ForgotFormData from '../../../../../../../../sharetype/form-data/LoginFormData';

import make from '../../../../../../../../utils/make';
import Buttons from '../../../../../../../common/TextField/components/Buttons';

import styles from './FormForgot.module.scss';

export interface IFormLoginProps {
    onButtonLoginClick?: (v: ForgotFormData.ISignIn) => any;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormForgot = (props: IFormLoginProps) => {

    const confirmRef = React.useRef<HTMLFormElement>(null)
    const ovlRef = React.useRef<HTMLDivElement>(null)

    const handleDisplay = () => {
        if (props.show) {
            if(null !== confirmRef.current && null !== ovlRef.current) {
                confirmRef.current.style.display = "flex"
                ovlRef.current.style.display = "block"
            }
        }
      };
      handleDisplay();

    const handleClose = (e: any) => {
        e.preventDefault()
        if(null !== confirmRef.current && null !== ovlRef.current) {
            confirmRef.current.style.display = "none"
            ovlRef.current.style.display = "none"
            props.setShow(false)
        }
    }

  return (
    <div className={styles['confirm']}>
        <div ref={ovlRef} className={styles['ovrly']}></div>
        <form ref={confirmRef} className={styles['form-forgot']}>
            <div className={styles['title']}>
                <span>Khôi phục mật khẩu</span>
            </div>
            <div className={styles['wrap']}>
                <div className={styles['info']}>
                    <span>Vui lòng nhập thông tin sau để khôi phục mật khẩu</span>
                </div>
                <div className={styles['form-group']}>
                    <span>Mã số thuế:</span>
                    <input type="text" name="texCode" />
                </div>
                <div className={styles['form-group']}>
                    <span>Tên tài khoản:</span>
                    <input type="username" name="username" />
                </div>
                <div className={styles['form-group']}>
                    <span>Email:</span>
                    <input type="email" name="email" />
                </div>
            </div>
            <div className={styles['submit']}>
                <button onClick={handleClose} className={styles['close']}>ĐÓNG</button>
                <button className={styles['send']}>GỬI</button>
            </div>
        </form>
    </div>
  )
}

export default FormForgot