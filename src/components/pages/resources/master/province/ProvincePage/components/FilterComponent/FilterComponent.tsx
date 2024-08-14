import useProvincePageStore from '../../useProvincePageStore';
import styles from './FilterComponent.module.scss';
import 'dayjs/locale/vi';
import Selection from '../../../../../../../common/Selection';

type IFilterComponentProps = {};

export default function FilterComponent(props: IFilterComponentProps) {
    const {
        dataCity,
        dataDistrict,
        selectedObj,
        setSelectedObj,
        selectedProductType,
        onChangeSelectProductType,
    } = useProvincePageStore();

    return (
        <div className={styles['filter-container']}>
            <div className={styles['participant-container']}>
                <div className={styles['selection-container']}>
                     <Selection
                        className={styles['select-obj']}
                        title='Tỉnh - Thành phố:'
                        placeholder='Tất cả'
                        options={dataCity}
                        onChange={(v) => onChangeSelectProductType(v)}
                        value={selectedProductType}
                    />
                    <Selection
                        className={styles['select-obj']}
                        title='Quận - Huyện:'
                        placeholder='Chọn đối tượng'
                        options={dataDistrict}
                        onChange={setSelectedObj}
                        value={selectedObj}
                    />
                    
                </div>
            </div>
        </div>
    );
}
