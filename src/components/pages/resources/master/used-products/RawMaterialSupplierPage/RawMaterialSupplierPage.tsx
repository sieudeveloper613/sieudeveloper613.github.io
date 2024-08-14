import RawMaterialSupplierArea from './components/RawMaterialSupplierArea';
import RawMaterialSupplierDetail from './components/RawMaterialSupplierDetail';
import RawMaterialSupplierProvider from './RawMaterialSupplierProvider';

interface RawMaterialSupplierPageProps {}

export default function RawMaterialSupplierPage(props: RawMaterialSupplierPageProps) {
    return (
        <div>
            <RawMaterialSupplierProvider>
                <RawMaterialSupplierArea />
                <RawMaterialSupplierDetail />
            </RawMaterialSupplierProvider>
        </div>
    );
}
