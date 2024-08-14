import * as React from "react";

/* components */
import Routers from "../Routers";
import NavigatePage from "../NavigatePage";
import DefaultLayout from "../../../layout/DefaultLayout";
import LoginPage from "../../../components/pages/global/LoginPage";
import DataManagementPage from "../../../components/pages/resources/DataManagementPage";

/* packages */
import { Route, Routes } from "react-router-dom";

/* hooks */
import { useAppSelector } from "../../../redux/hooks";

/* configurations */
import navigationSelector from "../../navigationSelector";


export default function PageSelector() {
    const userInfo = useAppSelector((state) => state.user.userInfo);

    const config = React.useMemo(() => {
        if (!userInfo) return undefined;

        return navigationSelector(userInfo?.permission);
    }, [userInfo]);

    if (!config) {
        return (
            <Routes>
                <Route 
                    path="/quan-tri-du-lieu" 
                    element={
                        <DefaultLayout layout={null}>
                            <DataManagementPage />
                        </DefaultLayout>
                    } 
                />
                <Route 
                    path="/dang-nhap" 
                    element={
                        <LoginPage />
                    } 
                />
                <Route 
                    path="*" 
                    element={
                        <NavigatePage to="/dang-nhap" />
                    } 
                />
            </Routes>
        );
    }

    return <Routers config={config} />;
}
