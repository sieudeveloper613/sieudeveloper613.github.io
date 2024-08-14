import Main from "./components/Main";
import SSCCProvider from "./SSCCProvider";
import ResetingForm from "./components/ResetingForm";
import LifeCycleDetail from "./components/LifeCycleDetail";
import CreatenewCodeForm from "./components/CreateNewCodeForm";

const SSCCPage = () => {
    return(
        <SSCCProvider>
            <Main />
            <CreatenewCodeForm />
            <LifeCycleDetail />
            <ResetingForm />
        </SSCCProvider>
    )
}

export default SSCCPage;