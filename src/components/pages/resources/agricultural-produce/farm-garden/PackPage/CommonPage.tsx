import CommonProvider from "./CommonProvider";
import CommonArea from "./components/CommonArea";
import CommonForm from "./components/CommonForm";


const CommonPage = () => {
    return (
        <CommonProvider>
            <CommonArea />
            <CommonForm />
        </CommonProvider>
    );
};

export default CommonPage;
