import ProvinceBasePage, { IProvincePageProps } from './ProvincePage';
import ProvincePageProvider from './ProvincePageProvider';

export default function ProvincePage(props: IProvincePageProps) {
    return (
        <ProvincePageProvider>
            <ProvinceBasePage {...props} />
        </ProvincePageProvider>
    );
}
