import { useEffect, useState } from "react";
import PartnerForm from "../PartnerForm";
import { ThreeDots } from "react-loader-spinner";
import DataTable from "../../../../../common/DataTable";
import SearchBar from "../../../../../common/SearchBar";
import useUserAccountStore from "../../useUserAccountStore";
import PartnerFormProvider from "../PartnerForm/PartnerFormProvider";
import { ETypeUser, EnterpriseRole } from "../../../../../../sharetype/TPermission";

export interface IUserAccountAreaProps { }

export default function UserAccountArea(props: IUserAccountAreaProps) {
    const {
        resData,
        typeUser,
        dataSheet,
        lengthList,
        permission,
        searchInput,
        idViewPartner,
        setSearchInput,
        handlerBtnViewClick,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
        handlerBtnSearchClick
    } = useUserAccountStore();

    let title = "đối tượng"
    switch (permission?.role) {
        case EnterpriseRole.enterprise:
            title = "doanh nghiệp";
            break;
        case EnterpriseRole.farmOrGarden:
            title = "trang trại";
            break;
        case EnterpriseRole.processingFacility:
            title = "cơ sở chế biến";
            break;
        case EnterpriseRole.distributionCenter:
            title = "nhà phân phối";
            break;
        case EnterpriseRole.restaurant:
            title = "nhà hàng";
            break;
        case EnterpriseRole.supermarket:
            title = "siêu thị";
            break;
        case EnterpriseRole.dealerStore:
            title = "cửa hàng bán lẻ";
            break;
    }

    /** create constants */
    const ROW_HEIGHT = "44px";
    const MAX_WIDTH = "100%";
    const TITLE = `Quản lý ${title}`;
    const COLUMN_VIEW_WIDTH = "220px";
    const NUMBER_ROW_CONFIG = "default";
    const COLUMN_VIEW_TITLE = "Đối tượng tham gia";

    /** create state */
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!!dataSheet && dataSheet.length) {
            setIsLoading(false);
        } else if (dataSheet.length === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else setIsLoading(true);
    }, [dataSheet]);
    useEffect(() => {
        if (!!resData) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [resData]);

    /** FOR MASTER */
    let headerAndColum = {
        header: [`Tên ${title}`, "Mã số thuế", "Địa chỉ", "Số điện thoại", "Email"],
        column: ["minWidth: 220px", "minWidth: 180px", "minWidth: 320px", "minWidth: 160px", "minWidth: 300px"]
    }

    /** FOR OTHERS */
    let isView = true;
    if (typeUser != ETypeUser.other && typeUser != ETypeUser.enterprise) {
        headerAndColum = {
            header: [`Tên ${title}`, "GLN", "Email", "Địa chỉ", "Mã số thuế"],
            column: ["minWidth: 220px", "minWidth: 160px", "minWidth: 300px", "minWidth: 320px", "minWidth: 160px"]
        }
        isView = false;
    } else if (typeUser == ETypeUser.other) {
        headerAndColum = {
            header: [`Tên ${title}`, "GLN", "Email", "Địa chỉ", "Số điện thoại"],
            column: ["minWidth: 220px", "minWidth: 160px", "minWidth: 300px", "minWidth: 320px", "minWidth: 160px"]
        }
        isView = false

    }
    
    return (
        <>
            <SearchBar 
                placeholder={`Nhập để tìm kiếm (tên ${title}, email,...)`} 
                input={searchInput} 
                setInput={setSearchInput} 
                handleButtonClick={handlerBtnSearchClick} 
            />

            <DataTable
                title={TITLE}
                data={dataSheet}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                rowHeight={ROW_HEIGHT}
                lengthList={lengthList}
                headerCells={headerAndColum.header}
                columnWidth={headerAndColum.column}
                numberRowConfig={NUMBER_ROW_CONFIG}
                viewColumnWidth={COLUMN_VIEW_WIDTH}
                titleOfColumnView={COLUMN_VIEW_TITLE}
                displayButtons={{ update: true, remove: true, view: isView }}
                onButtonViewClick={handlerBtnViewClick}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
            />
            <PartnerFormProvider useId={idViewPartner} permission={permission}>
                <PartnerForm />
            </PartnerFormProvider>
        </>
    );
}
