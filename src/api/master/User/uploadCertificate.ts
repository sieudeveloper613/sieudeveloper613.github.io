import axios from 'axios';
import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserFormData from '../../../sharetype/form-data/resources/master/UserFormData';
import api from '../..';

const uploadCertificate = async (files:any,source:any): TAPIResponse<UserFormData.ICertificate[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'upload-certificate'].join('/');
    try {
        const formdata = new FormData();
        files.forEach((item:any)=>{
            formdata.append("certificate", item,item.name)
        })

        const res = await axiosClient.post(url,formdata,{cancelToken: source.token});

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data,
        };
    } catch (err) {
        if (axios.isCancel(err)) {
            await api.user.deleteDraftCertificate()
            console.log("clean draft");
            return {
                status: 'failure',
            }
        } else {
        return {
            status: 'failure',
        };
        }
        
    }
};

export default uploadCertificate;
