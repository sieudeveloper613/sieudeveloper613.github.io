import DataTable, { ITableCell } from '../../../../../../../common/DataTable';
import useAccessInfoManageStore from '../../useAccessInfoManageStore';
import { ThreeDots } from 'react-loader-spinner';
import React from 'react';
import SearchBar from '../../../../../../../common/SearchBar';

type IAccessInfoManageProps = {};

function AccessInfoManageArea(props: IAccessInfoManageProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handleButtonCreateClick,
        handleButtonUpdateClick,
        handleButtonRemoveClick,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick,
    } = useAccessInfoManageStore();

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
            <SearchBar placeholder='Nhập tên sản phẩm' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerBtnSearchClick} />
            <DataTable
                lengthList={lengthList}
                title={`Quản lý thông tin truy xuất`}
                headerCells={['Tên sản phẩm']}
                numberRowConfig='default'
                data={dataSheet}
                rowHeight={'40px'}
                hiddenButtonCreate={true}
                displayButtons={{ update: true,remove : true }}
                onButtonCreateClick={handleButtonCreateClick}
                onButtonUpdateClick={handleButtonUpdateClick}
                onButtonRemoveClick={handleButtonRemoveClick}
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

export default AccessInfoManageArea;
