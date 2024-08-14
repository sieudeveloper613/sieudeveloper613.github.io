import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import WindowFormContainer, { WindowForm } from '../../../../../../common/WindowFormContainer';
import useGardenCodeStore from '../useGardenCodeStore';
import styles from './QRCodeForm.module.scss';
import ENV from '../../../../../../../core/ENV';

export interface IQRCodeFormProps { }

export default function QRCodeForm(props: IQRCodeFormProps) {
    const {
        //==
        qrcodeDisplay,
        setQRCodeDisplay,
        handlerBtnResetClick
    } = useGardenCodeStore();

    const handlerBtnCloseClick = React.useCallback(() => {
        setQRCodeDisplay(undefined);
    }, [setQRCodeDisplay]);
    const valueQR = `${ENV.HOST_01}/quan-tri-du-lieu?code=${qrcodeDisplay}`
    return (
        <WindowFormContainer
            display={Boolean(qrcodeDisplay)}
        //==
        >
            <WindowForm
                width='450px'
                buttons={[
                    {
                        label: 'Đóng'.toLocaleUpperCase(),
                        width: '50px',
                        fontFamily: 'Arial',
                        onClick: handlerBtnCloseClick,
                    },
                    {
                        label: 'Tạo vòng đời mới',
                        onClick: () => handlerBtnResetClick(String(qrcodeDisplay)),
                    },
                    //==
                ]}
            >
                <div className={styles['qrcode-garden-container']}>
                    <div className={styles['qrCode']}>
                        <QRCodeSVG value={valueQR || ''} size={340} />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}
