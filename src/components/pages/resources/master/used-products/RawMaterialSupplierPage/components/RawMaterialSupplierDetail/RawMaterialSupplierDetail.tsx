import generate from '../../../../../../../../utils/generate';
import make from '../../../../../../../../utils/make';
import DataTable, { ITableCell } from '../../../../../../../common/DataTable';
import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useRawMaterialSupplierStore from '../../useRawMaterialSupplierStore';

// import styles from './RawMaterialSupplierDetail.module.scss';
export interface IRawMaterialSupplierDetailProps {}

export default function RawMaterialSupplierDetail(props: IRawMaterialSupplierDetailProps) {
    const { displayViewDetail, setDisplayViewDetail } = useRawMaterialSupplierStore();
    const handlerClose = () => {
        setDisplayViewDetail(false);
    };
    return (
        <WindowFormContainer display={displayViewDetail}>
            <WindowForm
                buttons={[
                    { label: 'X', onClick: handlerClose },
                    { label: 'Đóng', onClick: handlerClose },
                ]}
            >
                <DataTable
                    title='Chi tiết'
                    headerCells={['STT', 'Mã nguyên liệu', 'Tên nguyên liệu']}
                    displayButtons={{ create: false }}
                    data={make.array({ start: 1, stop: 11 }, (i) => {
                        return {
                            _id: generate.id(),
                            items: [i, 'MF1', 'Nguyen lieu 1'],
                        } as ITableCell;
                    })}
                />
            </WindowForm>
        </WindowFormContainer>
    );
}
