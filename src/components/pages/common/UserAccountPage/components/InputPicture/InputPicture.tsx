import * as React from 'react';
import Title from './Title';
import styles from './InputPicture.module.scss';
import Layer from '../../../../../common/Layer';
import api from '../../../../../../api';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import userSlice from '../../../../../../redux/userSlice';
import UserFormData from '../../../../../../sharetype/form-data/resources/master/UserFormData';
import axios from 'axios';
export interface IInputCertificateProps {
    title?: string;
    picture: UserFormData.ICertificate[];
    idUpdate?:string;
    displayForm:boolean;
}

function InputPicture(props: IInputCertificateProps) {
    const [imageUpload,setImageUpload]= React.useState<(File | null)[]>()
    const [deleteToken,setDeleteToken]= React.useState<any>(null)
    const resPicture = useAppSelector((state) => state.user.resPicture);
    const pictureWillUpdate = useAppSelector((state) => state.user.pictureWillUpdate);
    const isUploadingPic = useAppSelector((state) => state.user.isUploadingPic);
    const dispatch = useAppDispatch()
    const dataCertificates = props.idUpdate ? pictureWillUpdate :  resPicture
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
            if(dataCertificates && (dataCertificates?.length + images.length) > 1){
                alert('Sô lượng file tối đa là 1 file!')
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
                dispatch(userSlice.actions.setIsUploadingPic(true))
                const res = await api.user.uploadCertificate(images,source)
                dispatch(userSlice.actions.setIsUploadingPic(false))
                if(!props.idUpdate && res.data){
                    if(resPicture ){
                        dispatch(userSlice.actions.setResPicture([...resPicture,...res.data]))
                    }else{
                        dispatch(userSlice.actions.setResPicture([...res.data]))
                    }
                }else if((props.idUpdate && res.data)){
                    if(pictureWillUpdate ){
                        dispatch(userSlice.actions.setPictureWillUpdate([...pictureWillUpdate,...res.data]))
                    }else{
                        dispatch(userSlice.actions.setPictureWillUpdate([...res.data]))
                    }
                }
    }
    React.useEffect(()=>{
        if(!props.idUpdate){
            //create
            dispatch(userSlice.actions.setResPicture([...props?.picture]))
        }else{
            //update
            dispatch(userSlice.actions.setResPicture([...props?.picture]))
            dispatch(userSlice.actions.setPictureWillUpdate([...props?.picture]))
        }
    },[props.idUpdate,props.picture])
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
            deleteToken.cancel('cancel upload picture')
        }
    },[props.displayForm])
    React.useEffect(()=>{
        if(!isUploadingPic && deleteToken){
            setDeleteToken(null)
        }
    },[isUploadingPic])
    return (
        <div className={styles['input-certificate']}>
        <Title value={props.title} />
            <div className={styles['container']}>
                    {isUploadingPic ?
                    <div className={styles['input-wrap-loading']}>
                        <span>Loading....</span>
                    </div>
                :<div className={styles['input-wrap']}>
                <div style={{display:(dataCertificates && dataCertificates?.length > 0)?'block':'none'}} className={styles['selected-item-list']}>
                    {dataCertificates?.map((item:any,index:number)=>{  
                        
                        const handleDeleteImage =async()=>{
                            if(!props.idUpdate){
                                const res = await api.user.deleteCertificate(item.filename)
                                if(resPicture && res){
                                    let tmp = [...resPicture]
                                    tmp.splice(index,1)
                                    dispatch(userSlice.actions.setResPicture([...tmp]))
                                    return;
                                }else{
                                    alert('Xoa that bai')
                                }

                            }else{
                                const isOriginElement = resPicture?.every((cer)=>{
                                    return cer.filename !== item.filename
                                })
                                // console.log(isOriginElement)
                                if(isOriginElement){
                                    const res = await api.user.deleteCertificate(item.filename)
                                    if(pictureWillUpdate && res){
                                        let tmp = [...pictureWillUpdate]
                                        tmp.splice(index,1)
                                        dispatch(userSlice.actions.setPictureWillUpdate([...tmp]))
                                        return;
                                    }else{
                                        alert('Xoa that bai')
                                    }
                                }else{
                                    if(pictureWillUpdate){
                                        let tmp = [...pictureWillUpdate]
                                        tmp.splice(index,1)
                                        dispatch(userSlice.actions.setPictureWillUpdate([...tmp]))
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
                    <label htmlFor='picture' className={styles['icon']}>add_circle</label>
                    <input type={'file'} id='picture'  onChange={handleChange} hidden name='picture' multiple accept='image/*' />
                </Layer> 
            </div>}
            </div>
        </div>
    );
}

export default React.memo(InputPicture);
