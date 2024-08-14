import React from 'react';
import TraceabilityPartnerArea from './components/TraceabilityPartnerArea';
import TraceabilityPartnerForm from './components/TraceabilityPartnerForm';
import TraceabilityPartnerProvider from './TraceabilityPartnerProvider';

type ITraceabilityPartnerPageProps = {};

function TraceabilityPartnerPage(props: ITraceabilityPartnerPageProps) {
    return (
        <TraceabilityPartnerProvider>
            <div>
                <TraceabilityPartnerArea />
                <TraceabilityPartnerForm />
            </div>
        </TraceabilityPartnerProvider>
    );
}

export default TraceabilityPartnerPage;
