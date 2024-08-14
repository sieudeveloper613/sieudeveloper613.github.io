import React from 'react';
import PartnerArea from './components/PartnerArea';
import PartnerForm from './components/PartnerForm';
import PartnerProvider from './PartnerProvider';

type IPartnerPageProps = {};

function PartnerPage(props: IPartnerPageProps) {
    return (
        <PartnerProvider>
            <div>
                <PartnerArea />
                <PartnerForm />
            </div>
        </PartnerProvider>
    );
}

export default PartnerPage;
