import TPermission from '../../../../../../sharetype/TPermission';
import AccessInfoManageForm from './components/AccessInfoManageForm/AccessInfoManageForm';
import AccessInfoManageProvider from './AccessInfoManageProvider';
import AccessInfoManageArea from './components/AccessInfoManageArea';
import CreateForm from './components/CreateForm'

export interface IAccessInfoManagePageProps {
    permission: TPermission;
}

const AccessInfoManagePage = (props: IAccessInfoManagePageProps) => {
    return (
        <div>
            <AccessInfoManageProvider permission={props.permission}>
                <AccessInfoManageArea />
                <AccessInfoManageForm />
                <CreateForm />
            </AccessInfoManageProvider>
        </div>
    );
};

export default AccessInfoManagePage;
