import * as React from 'react';
import Title from './Title';
import styles from './InputCertificate.module.scss';
import Layer from '../../../../../common/Layer';
import api from '../../../../../../api';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import userSlice from '../../../../../../redux/userSlice';
import UserFormData from '../../../../../../sharetype/form-data/resources/master/UserFormData';
import axios from 'axios';
export interface IInputCertificateProps {
    title?: string;
    certificate: UserFormData.ICertificate[];
    idUpdate?:string;
    displayForm:boolean;
}

function InputCertificate(props: IInputCertificateProps) {
    const [imageUpload,setImageUpload]= React.useState<(File | null)[]>()
    const [deleteToken,setDeleteToken]= React.useState<any>(null)
    const resCertificate = useAppSelector((state) => state.user.resCertificate);
    const certificateWillUpdate = useAppSelector((state) => state.user.certificateWillUpdate);
    const isUploadingCer = useAppSelector((state) => state.user.isUploadingCer);
    const dispatch = useAppDispatch()
    const dataCertificates = props.idUpdate ? certificateWillUpdate :  resCertificate
    const handleChange = async(e: { target: { files: any } }) => {
        const tmp =  e.target.files
        // console.log(tmp.item(0).name)
        
        // 1. create a new File array
        let images: (File | null)[] = new Array<File>();
        if (tmp) {
            // 2. use for loop to transfer the data from fileList to images;
            const length = tmp.length;
            let i = 0;
            while (i < length) {
                images[i] = tmp.item(i);
                i++
            }
        }
        if (images && (images.length > 0)) {
            const isOverSize = images?.every((image:any)=>{
                return image.size < 10*1024*1024
                
            })
            if(!isOverSize){
                alert('Kích thước file không được vượt quá 10Mb')
                return;
            }
            if(dataCertificates && (dataCertificates?.length + images.length) > 5){
                alert('Sô lượng file tối đa là 5 file!')
                return;
            } 
            const isExistImage = dataCertificates?.every((image)=>{
                return images.every((item)=> image?.originalname !== item?.name)
                
            })
            if(isExistImage){
                setImageUpload(images)
            }else{
                alert('Đã có ảnh tồn tại !')

            }
        }else{
            console.log('no images choose')
        }
    };
    const handleUpload =async (images:(File | null)[]) => {
                const source=axios.CancelToken.source()
                setDeleteToken(source)
                dispatch(userSlice.actions.setIsUploadingCer(true))
                const res = await api.user.uploadCertificate(images,source)
                dispatch(userSlice.actions.setIsUploadingCer(false))
                if(!props.idUpdate && res.data){
                    if(resCertificate ){
                        dispatch(userSlice.actions.setResCertificate([...resCertificate,...res.data]))
                    }else{
                        dispatch(userSlice.actions.setResCertificate([...res.data]))
                    }
                }else if((props.idUpdate && res.data)){
                    if(certificateWillUpdate ){
                        dispatch(userSlice.actions.setCertificateWillUpdate([...certificateWillUpdate,...res.data]))
                    }else{
                        dispatch(userSlice.actions.setCertificateWillUpdate([...res.data]))
                    }
                }
    }
    React.useEffect(()=>{
        if(!props.idUpdate){
            //create
            dispatch(userSlice.actions.setResCertificate([...props?.certificate]))
        }else{
            //update
            dispatch(userSlice.actions.setResCertificate([...props?.certificate]))
            dispatch(userSlice.actions.setCertificateWillUpdate([...props?.certificate]))
        }
    },[props.idUpdate])
    React.useEffect(()=>{
        if(imageUpload && props.displayForm){
                handleUpload(imageUpload)
            }
            return ()=>{
                if(imageUpload) setImageUpload(undefined)
            }

    },[imageUpload])
    React.useEffect(()=>{
        if(!props.displayForm && deleteToken){
            deleteToken.cancel('cancel upload certificate')
        }
    },[props.displayForm])
    React.useEffect(()=>{
        if(!isUploadingCer && deleteToken){
            setDeleteToken(null)
        }
    },[isUploadingCer])
    return (
        <div className={styles['input-certificate']}>
        <Title value={props.title} />
            <div className={styles['container']}>
                    {isUploadingCer ?
                    <div className={styles['input-wrap-loading']}>
                        <span>Loading....</span>
                    </div>
                :<div className={styles['input-wrap']}>
                <div style={{display:(dataCertificates && dataCertificates?.length > 0)?'block':'none'}} className={styles['selected-item-list']}>
                    {dataCertificates?.map((item:any,index:number)=>{  
                        
                        const handleDeleteImage =async()=>{
                            if(!props.idUpdate){
                                const res = await api.user.deleteCertificate(item.filename)
                                if(resCertificate && res){
                                    let tmp = [...resCertificate]
                                    tmp.splice(index,1)
                                    dispatch(userSlice.actions.setResCertificate([...tmp]))
                                    return;
                                }else{
                                    alert('Xoa that bai')
                                }

                            }else{
                                const isOriginElement = resCertificate?.every((cer)=>{
                                    return cer.filename !== item.filename
                                })
                                console.log(isOriginElement)
                                if(isOriginElement){
                                    const res = await api.user.deleteCertificate(item.filename)
                                    if(certificateWillUpdate && res){
                                        let tmp = [...certificateWillUpdate]
                                        tmp.splice(index,1)
                                        dispatch(userSlice.actions.setCertificateWillUpdate([...tmp]))
                                        return;
                                    }else{
                                        alert('Xoa that bai')
                                    }
                                }else{
                                    if(certificateWillUpdate){
                                        let tmp = [...certificateWillUpdate]
                                        tmp.splice(index,1)
                                        dispatch(userSlice.actions.setCertificateWillUpdate([...tmp]))
                                        return;
                                    }
                                }
                            }
                            
                        }                             
                        return (
                            (<div key={item?.originalname} className={styles['image-item']}>
                                <a href={item.path} 
                                target="_blank" rel="noopener noreferrer"
                                className={styles['image-item-name']}>
                                {item?.originalname}
                                </a>
                                <button
                                    className={styles['btn-remove-item']}
                                    type='button'
                                    onClick={handleDeleteImage}
                                >
                                    close
                                </button>
                                <br />
                            </div>)
                        )
                    })}
                </div>
                <Layer className={{ layer: styles['layer'], layerWrap: styles['layer-wrap'] }}>
                    <label htmlFor='certificate' className={styles['icon']}>add_circle</label>
                    <input type={'file'} id='certificate'  onChange={handleChange} hidden name='certificate' multiple accept='image/*' />
                </Layer> 
            </div>}
            </div>
        </div>
    );
}

export default React.memo(InputCertificate);
