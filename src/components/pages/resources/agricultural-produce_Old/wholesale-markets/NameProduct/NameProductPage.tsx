import NameProductArea from './components/NameProductArea';
import NameProductForm from './components/NameProductForm';
import NameProductProvider from './NameProductProvider';

export interface IAccessInfoManagePageProps {}

function NameProductPage(props: IAccessInfoManagePageProps) {
    return (
        <div>
            <NameProductProvider>
                <NameProductArea />
                <NameProductForm />
            </NameProductProvider>
        </div>
    );
}

export default NameProductPage;
