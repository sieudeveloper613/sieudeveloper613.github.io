import React from 'react';
import DataTable from '../../../../../../../common/DataTable';
import SearchBar from '../../../../../../../common/SearchBar';
import useTraceabilityPartnerStore from '../../useTraceabilityPartnerStore';
import { ThreeDots } from 'react-loader-spinner';

interface ITraceabilityPartnerAreaProps { }

const listCells = ['Tên đối tác', 'Địa chỉ', 'Số điện thoại', 'Email'];

function TraceabilityPartnerArea(props: ITraceabilityPartnerAreaProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handlerBtnCreateClick,
        handlerBtnRemoveClick,
        handlerBtnUpdateClick,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick
    } =
        useTraceabilityPartnerStore();

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
            <SearchBar placeholder='Nhập tên, số điện thoại hoặc email' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerBtnSearchClick} />
            <DataTable
                lengthList={lengthList}
                title='Đối tác'
                headerCells={listCells}
                data={dataSheet}
                rowHeight={'40px'}
                columnWidth={['minWidth: 120px', 'auto', 'minWidth: 140px', 'minWidth:200px']}
                displayButtons={{ update: true, remove: true }}
                minWidth='1200px'
                //
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
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

export default TraceabilityPartnerArea;
