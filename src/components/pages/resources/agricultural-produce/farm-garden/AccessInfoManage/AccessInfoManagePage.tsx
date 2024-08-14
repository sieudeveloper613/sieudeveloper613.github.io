
import TPermission from "../../../../../../sharetype/TPermission";
import AccessInfoManageProvider from "./AccessInfoManageProvider";
import AccessInfoManageArea from "./components/AccessInfoManageArea";
import AccessInfoManageForm from "./components/AccessInfoManageForm/AccessInfoManageForm";

export interface IAccessInfoManagePageProps {
    permission: TPermission;
}

const AccessInfoManagePage = (props: IAccessInfoManagePageProps) => {
    return (
        <AccessInfoManageProvider permission={props.permission}>
            <AccessInfoManageArea />
            <AccessInfoManageForm />
        </AccessInfoManageProvider>
    );
};

export default AccessInfoManagePage;
