import * as React from 'react';
import GardenCodeArea from './GardenCodeArea';
import GardenCodeForm from './GardenCodeForm';
import GardenCodeProvider from './GardenCodeProvider';
import QRCodeForm from './QRCodeForm';

export interface IGardenCodeProps {}

export default function GardenCodePage(props: IGardenCodeProps) {
    return (
        <GardenCodeProvider>
            <div>
                <GardenCodeArea />
                <GardenCodeForm />
                <QRCodeForm />
            </div>
        </GardenCodeProvider>
    );
}
