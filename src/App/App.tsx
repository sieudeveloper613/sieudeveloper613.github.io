import { useState, useEffect } from "react";

/* components */
import PageSelector from "../core/components/PageSelector";
import MessageBoxProvider from "../components/common/MessageBoxProvider";

/* configurations */
import make from "../utils/make";
import Address from "../utils/Address";
import images from "../resources/images";

/* styles */
import styles from "./App.module.scss";

/* packages */
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {

    /** create state */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        loadingData();
    }, [])

    const loadingData = async () => {
        setIsLoading(true)
        await Address.instance.reloadAddress();
        setIsLoading(false)
    }

    if (isLoading) {
        return <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", height: "100vh" }} className={make.className([styles["app"]])}>
            <img src={images.logo} alt="checkee logo" style={{ width: "400", height: "200" }} />
        </div>
    } else {
        return (
            <div className={make.className([styles["app"]])}>
                <MessageBoxProvider>
                    <PageSelector />
                </MessageBoxProvider>
                <ToastContainer />
            </div>
        )
    }
}

export default App;
