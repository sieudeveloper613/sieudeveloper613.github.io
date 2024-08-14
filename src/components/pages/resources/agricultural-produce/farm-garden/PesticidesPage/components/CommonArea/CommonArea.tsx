import React from 'react';
import { Self } from '../..';
import DataTable from '../../../../../../../common/DataTable';
import useCommonStore from '../../useCommonStore';
import { ThreeDots } from 'react-loader-spinner';

type ICommonProps = {};

function CommonArea(props: ICommonProps) {
    const { dataSheet, resData, lengthList, handlerBtnCreateClick, handlerBtnUpdateClick, handlerBtnRemoveClick } =
        useCommonStore();
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
                title={`Thông Tin ${Self.title}`}
                headerCells={[Self.title]}
                numberRowConfig='default'
                data={dataSheet}
                rowHeight={'40px'}
                displayButtons={{ update: true, remove: true }}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
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

export default CommonArea;
