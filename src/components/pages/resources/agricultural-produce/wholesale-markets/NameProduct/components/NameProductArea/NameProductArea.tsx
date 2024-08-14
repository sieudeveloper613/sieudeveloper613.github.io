import React from 'react';
import DataTable from '../../../../../../../common/DataTable';
import SearchBar from '../../../../../../../common/SearchBar';
import useNameProductStore from '../../useNameProduct';
import { ThreeDots } from 'react-loader-spinner'

type IAccessInfoManageProps = {};

function AccessInfoManageArea(props: IAccessInfoManageProps) {
    const {
        resData,
        dataSheet,
        setIsDisplayForm,
        handlerButtonRemoveClick,
        updateDataButtonClick,
        searchInput,
        setSearchInput,
        handlerButtonSearchClick
    } = useNameProductStore();

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
            <SearchBar placeholder='Nhập tên sản phẩm' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerButtonSearchClick} />
            <DataTable
                title='Bán hàng'
                headerCells={['STT', 'Tên sản phẩm', 'Giá theo Kg', 'Giá theo sản phẩm']}
                columnWidth={['100px']}
                data={dataSheet}
                displayButtons={{ remove: true, update: true }}
                hiddenButtonCreate={true}
                onButtonCreateClick={() => setIsDisplayForm(true)}
                onButtonRemoveClick={handlerButtonRemoveClick}
                onButtonUpdateClick={updateDataButtonClick}
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
