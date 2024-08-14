import DataTable from '../../../../../../../common/DataTable';
import useStorehouseStore from '../../useStorehouseStore';
export interface IStorehouseAreaProps {}

export default function StorehouseArea(props: IStorehouseAreaProps) {
    const { handleOnCreateClick, handleOnUpdateClick, processData } = useStorehouseStore();
    return (
        <div>
            <DataTable
                title='Kho hàng'
                data={processData}
                displayButtons={{ update: true, remove: true }}
                headerCells={['Mã kho hàng', 'Tên kho hàng', 'Địa chỉ']}
                onButtonCreateClick={handleOnCreateClick}
                onButtonUpdateClick={handleOnUpdateClick}
                displayFooter={false}
            />
        </div>
    );
}
