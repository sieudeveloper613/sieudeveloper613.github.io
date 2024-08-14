import generate from '../../../../../../../../utils/generate';
import make from '../../../../../../../../utils/make';
import DataTable, { ITableCell } from '../../../../../../../common/DataTable';
import useRawMaterialSupplierStore from '../../useRawMaterialSupplierStore';

export interface IRawMaterialSupplierAreaProps {}

export default function RawMaterialSupplierArea(props: IRawMaterialSupplierAreaProps) {
    const { handlerOnClickButtonView } = useRawMaterialSupplierStore();
    return (
        <DataTable
            title={'Quản lý nhà cung cấp'}
            headerCells={['STT', 'Nhà cung cấp']}
            data={make.array({ start: 1, stop: 11 }, (i) => {
                return {
                    _id: generate.id(),
                    items: [i, 'Nhà cung cấp A'],
                } as ITableCell;
            })}
            displayButtons={{ view: true, create: false }}
            titleOfColumnView={'Thao tác'}
            viewColumnWidth='150px'
            onButtonViewClick={handlerOnClickButtonView}
        />
    );
}
