import React from 'react';
import DataTable from '../../../../../../../common/DataTable';
import SearchBar from '../../../../../../../common/SearchBar';
import useProductTypeStore from '../../useProductTypeStore';
import { ThreeDots } from 'react-loader-spinner';

interface IProductTypeAreaProps { }

const listCells = ['Mã vạch sản phẩm', 'Tên sản phẩm', 'Loại', 'Tên đối tác', 'Quốc gia', 'Ngày tạo'];

function ProductTypeArea(props: IProductTypeAreaProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handlerBtnCreateClick,
        handlerBtnRemoveClick,
        handlerBtnUpdateClick,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick,
        handlerBtnFilterClick
    } =
        useProductTypeStore();

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
            <SearchBar placeholder='Nhập mã, tên sản phẩm...' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerBtnSearchClick} />
            <DataTable
                lengthList={lengthList}
                title='Loại sản phẩm'
                radios={[
                    {
                        label: 'Sản phẩm',
                        onClick: handlerBtnFilterClick,
                    },
                    {
                        label: 'Hộp',
                        onClick: handlerBtnFilterClick,
                    },
                    {
                        label: 'Thùng',
                        onClick: handlerBtnFilterClick,
                    }
                ]}
                headerCells={listCells}
                data={dataSheet}
                rowHeight={'40px'}
                columnWidth={['width:auto','width:auto', 'minWidth: 140px', 'minWidth:150px']}
                displayButtons={{ update: true, remove:true }}
                numberRowConfig='default'
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

export default ProductTypeArea;
