import VehicleProvider from "./VehicleProvider";
import VehicleArea from "./VehicleArea/VehicleArea";
import VehicleForm from "./VehicleForm/VehicleForm";

const VehiclePage = () => {
    return (
        <VehicleProvider>
            <VehicleArea />
            <VehicleForm />
        </VehicleProvider>
    );
};

export default VehiclePage;
