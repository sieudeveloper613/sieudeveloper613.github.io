import * as React from 'react';
import LoginLayout from '../../../../layout/LoginLayout';
import LoginPageArea from './components/LoginPageArea';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    return (
        <LoginLayout>
            <LoginPageArea />
        </LoginLayout>
    );
}
