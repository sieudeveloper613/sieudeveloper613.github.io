import * as React from 'react';
import DataTable from '../../../../../common/DataTable';
import useUserAccountStore from '../../useUserAccountStore';
import PartnerForm from '../PartnerForm';
import PartnerFormProvider from '../PartnerForm/PartnerFormProvider';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../../../../../common/SearchBar';
import { ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';

export interface IUserAccountAreaProps {}

export default function UserAccountArea(props: IUserAccountAreaProps) {
    const {
        typeUser,
        dataSheet,
        permission,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
        handlerBtnViewClick,
        idViewPartner,
        resData,
        lengthList,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick
    } = useUserAccountStore();

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
    // console.log('nnhatlog--role',permission?.role)
    let title = 'đối tượng'
    switch(permission?.role){
        case EnterpriseRole.enterprise:
            title = 'doanh nghiệp'
            break;
        case EnterpriseRole.farmOrGarden:
            title = 'trang trại'
            break;
        case EnterpriseRole.processingFacility:
            title = 'cơ sở chế biến'
            break;
        case EnterpriseRole.distributionCenter:
            title = 'nhà phân phối'
            break;
        case EnterpriseRole.restaurant:
            title = 'nhà hàng'
            break;
        case EnterpriseRole.supermarket:
            title = 'siêu thị'
            break;
        case EnterpriseRole.dealerStore:
            title = 'cửa hàng bán lẻ'
            break;
    }
    let headerAndColum = {
        header:[`Tên ${title}`,'Mã số thuế', 'Địa chỉ', 'Số điện thoại', 'Email'],
        column:['minWidth:200px','minWidth:140px', 'maxWidth:300px', 'minWidth:140px', 'minWidth:180px']
    }
    let isView = true
    if(typeUser != ETypeUser.other && typeUser != ETypeUser.enterprise ){
        headerAndColum = {
            header:[`Tên ${title}`,'GLN','Email', 'Địa chỉ', 'Mã số thuế'],
            column:['minWidth:200px','minWidth:140px', 'minWidth:180px','maxWidth:300px', 'minWidth:140px']
        }
        isView= false

    } else if(typeUser == ETypeUser.other){
        headerAndColum = {
            header:[`Tên ${title}`,'GLN','Email', 'Địa chỉ', 'Số điện thoại'],
            column:['minWidth:200px','minWidth:140px', 'minWidth:180px','maxWidth:300px', 'minWidth:140px']
        }
        isView= false

    } 
    return (
        <div style={{ position: 'relative' }}>
            <SearchBar placeholder='Nhập tên hoặc Email' input={searchInput} setInput={setSearchInput} handleButtonClick={handlerBtnSearchClick} />
            <DataTable
                lengthList ={lengthList}
                title={`Quản lý ${title}`}
                headerCells={headerAndColum.header}
                columnWidth={headerAndColum.column}
                data={dataSheet}
                minWidth='1300px'
                rowHeight={'40px'}
                displayButtons={{
                    update: true,
                    remove: true,
                    view: isView,
                }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                titleOfColumnView='Đối tượng tham gia'
                viewColumnWidth='180px'
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
            <PartnerFormProvider useId={idViewPartner} permission={permission}>
                <PartnerForm />
            </PartnerFormProvider>
        </div>
    );
}
