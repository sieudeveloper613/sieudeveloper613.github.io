import * as React from 'react';
import DataTable from '../../../../../../common/DataTable';
import useGardenCodeStore from '../useGardenCodeStore';
import { ThreeDots } from 'react-loader-spinner';

export interface IGardenCodeAreaProps { }

export default function GardenCodeArea(props: IGardenCodeAreaProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnViewClick,
        handlerBtnRemoveClick,
    } = useGardenCodeStore();

    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        if (!!dataSheet && dataSheet.length) {
            setIsLoading(false);
        } else if (dataSheet.length === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else setIsLoading(true);
    }, [dataSheet]);
    React.useEffect(() => {
        if (!!resData) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [resData]);

    return (
        <div style={{ position: 'relative' }}>
            <DataTable
                lengthList={lengthList}
                title='Thông Tin Mã Khu Vườn'
                headerCells={['Mã khu vườn']}
                data={dataSheet}
                titleOfColumnView='QRCode'
                viewColumnWidth='150px'
                rowHeight={'40px'}
                numberRowConfig='default'
                displayButtons={{
                    remove: true,
                    update: true,
                    view: true,
                }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonViewClick={handlerBtnViewClick}
            />
            {!!isLoading && (
                <div
                    style={{
                        color: 'red',
                        position: 'absolute',
                        bottom: '-20px',
                        left: '50%',
                        transform: 'translate(-50%)',
                    }}
                >
                    <ThreeDots
                        height='60'
                        width='60'
                        radius='9'
                        color='#51E5FF'
                        ariaLabel='three-dots-loading'
                        visible={true}
                    />
                </div>
            )}
        </div>
    );
}
