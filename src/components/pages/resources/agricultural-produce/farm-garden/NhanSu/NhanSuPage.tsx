import DriverProvider from "./NhanSuProvider";
import DriverArea from "./components/DriverArea/DriverArea";
import DriverForm from "./components/DriverFormArea/DriverForm";

export default function NhanSuPage() {
    return (
        <DriverProvider>
            <DriverArea />
            <DriverForm />
        </DriverProvider>
    );
}
