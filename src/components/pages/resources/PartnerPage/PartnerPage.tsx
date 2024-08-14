import PartnerProvider from "./PartnerProvider";
import PartnerArea from "./components/PartnerArea";
import PartnerForm from "./components/PartnerForm";

function PartnerPage() {
    return (
        <PartnerProvider>
            <PartnerArea />
            <PartnerForm />
        </PartnerProvider>
    );
}

export default PartnerPage;
