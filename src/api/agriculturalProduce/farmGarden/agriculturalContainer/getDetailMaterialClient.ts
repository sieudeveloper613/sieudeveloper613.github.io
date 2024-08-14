import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';

const getDetailMaterialClient = async(code:string,idEX?:string,ownerId?:string)=>{
    try {
        const response = await axiosClient.get(
            `${ENV.API_HOST_1}/login/find-detail-material?codeMaterial=${code}&idEX=${idEX}&ownerId=${ownerId}`,
        );
        if (response.status !== 200) {
            return {
                status: 'failure',
            };
        }
        return {
            status: 'successfully',
            data: response.data,
        };
    } catch (err: any) {
        console.log('Loi API: ' + err.response.data);

        return {
            status: 'failure',
        };
    }
}

export default getDetailMaterialClient;