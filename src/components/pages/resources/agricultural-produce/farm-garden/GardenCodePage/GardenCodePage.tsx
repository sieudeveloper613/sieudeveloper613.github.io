import QRCodeForm from "./QRCodeForm";
import GardenCodeArea from "./GardenCodeArea";
import GardenCodeForm from "./GardenCodeForm";
import GardenCodeProvider from "./GardenCodeProvider";

export default function GardenCodePage() {
    return (
        <GardenCodeProvider>
            <GardenCodeArea />
            <GardenCodeForm />
            <QRCodeForm />
        </GardenCodeProvider>
    );
}
