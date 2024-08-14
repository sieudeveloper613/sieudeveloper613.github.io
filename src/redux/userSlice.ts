import { ICertificate } from './../sharetype/form-data/resources/master/UserFormData/UserFormData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localStorageClient from '../core/localStorageClient';
import LoginResponse from '../sharetype/response/LoginResponse';
interface IUserState {
    userInfo?: LoginResponse.ISignIn;
    resCertificate?: ICertificate[];
    certificateWillUpdate?: ICertificate[];
    isUploadingCer:boolean;
    resPicture?: ICertificate[];
    pictureWillUpdate?: ICertificate[];
    isUploadingPic?:boolean;
}

const initialState: IUserState = {
    userInfo: localStorageClient.userInfo,
    resCertificate:[],
    certificateWillUpdate:[],
    isUploadingCer:false,
    resPicture: [],
    pictureWillUpdate: [],
    isUploadingPic:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<LoginResponse.ISignIn>) => {
            state.userInfo = action.payload;
        },
        logout: (state, action: PayloadAction<undefined>) => {
            localStorageClient.userInfo = undefined;
            localStorageClient.token = '';
            state.userInfo = undefined;
        },
        setResCertificate:(state, action:PayloadAction<ICertificate[]>) => {
            state.resCertificate = action.payload;
        },
        setCertificateWillUpdate:(state, action:PayloadAction<ICertificate[]>) => {
            state.certificateWillUpdate = action.payload;
        },
        setIsUploadingCer:(state, action) => {
            state.isUploadingCer = action.payload;
        },
        setResPicture:(state, action:PayloadAction<ICertificate[]>) => {
            state.resPicture = action.payload;
        },
        setPictureWillUpdate:(state, action:PayloadAction<ICertificate[]>) => {
            state.pictureWillUpdate = action.payload;
        },
        setIsUploadingPic:(state, action) => {
            state.isUploadingPic = action.payload;
        },
    },
});

export default userSlice;
