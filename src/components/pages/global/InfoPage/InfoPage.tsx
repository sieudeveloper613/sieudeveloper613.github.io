import * as React from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import InfoLayout from '../../../../layout/InfoLayout';
import { useAppDispatch } from '../../../../redux/hooks';
import userSlice from '../../../../redux/userSlice';

export interface IInfoPageProps {}

export default function InfoPage(props: IInfoPageProps) {
    return <InfoLayout />;
}
