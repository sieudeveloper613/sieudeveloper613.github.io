import React from 'react';
import DataTable from '../../../../../../../common/DataTable';
import SearchBar from '../../../../../../../common/SearchBar';
import { ThreeDots } from 'react-loader-spinner';
import useProductManageStore from '../../useProductManageStore';

interface IProductManageAreaProps { }

const listCells = ['Tên sản phẩm', 'Ngày bắt đầu', 'Ngày kết thúc'];

function ProductManageArea(props: IProductManageAreaProps) {
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
        useProductManageStore();

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
                title='Quản Lý Sản Phẩm'
                headerCells={listCells}
                numberRowConfig='default'
                data={dataSheet}
                rowHeight={'40px'}
                columnWidth={['minWidth: 120px', 'auto', 'minWidth: 140px', 'minWidth:200px']}
                displayButtons={{ update: true }}
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

export default ProductManageArea;