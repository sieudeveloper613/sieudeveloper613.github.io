import * as React from 'react';
import styles from './InputCertificate.module.scss';

export interface IInputCertificatesProps {
    title?: string;
    Item?: {
        name: string;
        size: number;
        type: string;
    };
}

export default function InputCertificates(props: IInputCertificatesProps) {
    const [isUploading, setUploading] = React.useState(false);
    const [uploadedImgs, setUploadedImgs] = React.useState(Object);
    const item = {};

    const handleChange = async (e: { target: { files: any } }) => {
        setUploadedImgs(e.target.files[0].name);

        setUploading(true);
    };
    const handleClick = () => {};

    return (
        <div>
            <div>
                <label>
                    <b>Chứng chỉ</b>
                </label>
                <br />
                <br />
                <input multiple type='file' onChange={handleChange} />
            </div>

            <div>
                {isUploading ? (
                    <div>
                        {uploadedImgs} &nbsp; <button onClick={handleClick}>X</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
