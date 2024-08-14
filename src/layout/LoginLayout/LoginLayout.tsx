import * as React from 'react';

export interface ILoginLayoutProps {}

export default function LoginLayout(props: React.PropsWithChildren<ILoginLayoutProps>) {
    return <div>{props.children}</div>;
}
