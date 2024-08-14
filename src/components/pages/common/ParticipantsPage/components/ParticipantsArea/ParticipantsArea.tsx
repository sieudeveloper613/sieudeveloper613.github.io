import * as React from 'react';
import DataTable from '../../../../../common/DataTable';
import useParticipantsStore from '../../useParticipantsStore';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../../../../../common/SearchBar';

export interface IParticipantsAreaProps { }

export default function ParticipantsArea(props: IParticipantsAreaProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick,
    } =
        useParticipantsStore();

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
        console.log(resData)
        if (!!resData) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [resData]);

    return (
        <div style={{ position: 'relative' }}>
            <SearchBar placeholder='Nhập tên, Số điện thoại hoặc Email' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerBtnSearchClick} />
            <DataTable
                lengthList={lengthList}
                title='Quản lý đối tượng'
                headerCells={['Tên đối tác', 'Địa chỉ', 'Số điện thoại', 'Email']}
                columnWidth={['minWidth:140px', 'auto', 'minWidth:140px', 'minWidth:180px']}
                data={dataSheet}
                numberRowConfig='default'
                viewColumnWidth='200px'
                minWidth='1200px'
                rowHeight={'40px'}
                displayButtons={{
                    update: true,
                    remove: true,
                }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
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
