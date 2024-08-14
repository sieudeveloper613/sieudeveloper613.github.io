import DriverArea from "./components/DriverArea/DriverArea";
import DriverForm from "./components/DriverFormArea/DriverForm";
import DriverProvider from "./DriverProvider";

export default function DriverPage() {
    return (
        <DriverProvider>
            <DriverArea />
            <DriverForm />
        </DriverProvider>
    );
}
