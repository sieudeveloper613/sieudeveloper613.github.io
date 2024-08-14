import { useCallback } from 'react';
import generate from '../../../../../../../../utils/generate';
import make from '../../../../../../../../utils/make';
import Input from '../../../../../../../common/TextField/components/Input';
import useAccessInfoManageStore from '../../useAccessInfoManageStore';
import styles from './ListData.module.scss';

interface IListData { }

function ListData(props: IListData) {
    const {
        handleSetListDataForm,
        dataInput,
        setDataInput,
        isHiddenNameOrg,
        isHiddenGardenCode,
        isHiddenAddressOrg,
        isHiddenPlantVarieties,
        isHiddenFertilizers,
        isHiddenHarvestDate,
        isHiddenExportDate,
        isHiddenTransportServiceName,
        isHiddenVehicleName,
        isHiddenDriverName
    } = useAccessInfoManageStore();

    const renderData = () => {
        const field: [string, string, Boolean | undefined][] = [
            ['Trang trại', '...', isHiddenNameOrg],
            ['Mã khu vườn', '...', isHiddenGardenCode],
            ['Địa chỉ', '...', isHiddenAddressOrg],
            ['Loại giống', '...', isHiddenPlantVarieties],
            ['Phân bón', '...', isHiddenFertilizers],
            ['Ngày thu hoạch', '...', isHiddenHarvestDate],
            ['Ngày xuất hàng', '...', isHiddenExportDate],
            ['Đơn vị vận chuyển', '...', isHiddenTransportServiceName],
            ['Biển số', '...', isHiddenVehicleName],
            ['Tài xế', '...', isHiddenDriverName],
        ];
        return (
            <div className={styles['body']}>
                {field.map((item) => {
                    return (
                        <ul key={generate.id()}>
                            <li className={styles['']}>{item[0]}</li>
                            <li className={styles['']}>{item[1]}</li>
                            <li
                                className={styles['icon']}
                                onClick={() => handleSetListDataForm(item[0].trim())}
                            >{item[2] ? 'visibility_off' : 'visibility'}</li>
                        </ul>
                    );
                })
                }
            </div >
        );
    };

    const onChangeInput = useCallback(
        (id: string, i: number, value: string) => {
            setDataInput((prev) => {
                const newData = [...prev];
                const updateObj = newData.find((item) => item[0] === id);
                if (!updateObj) return prev;
                updateObj[i] = value;

                return newData;
            });
        },
        [setDataInput],
    );

    const renderInput = useCallback(() => {
        return dataInput.map((item) => (
            <ul key={item[0]}>
                <li>
                    <input
                        type='text'
                        placeholder={!Boolean(item[1].trim()) ? 'Không được để trống trường này.' : 'Nhập thông tin'}
                        onChange={(e) => onChangeInput(item[0], 1, e.target.value)}
                        className={make.className(['input', !Boolean(item[1].trim()) ? 'noData' : ''], styles)}
                        value={item[1]}
                    />
                </li>
                <li>
                    <input
                        type='text'
                        placeholder={!Boolean(item[2].trim()) ? 'Không được để trống trường này.' : 'Nhập nội dung'}
                        onChange={(e) => onChangeInput(item[0], 2, e.target.value)}
                        className={make.className(['input', !Boolean(item[2].trim()) ? 'noData' : ''], styles)}
                        value={item[2]}
                    />
                </li>
                <li className={make.className(['icon', 'delete'], styles)}>
                    <span onClick={() => setDataInput((prev) => prev.filter((elem) => elem[0] !== item[0]))}>
                        delete
                    </span>
                </li>
            </ul>
        ));
    }, [dataInput, setDataInput, onChangeInput]);

    return (
        <div className={styles['wrapper-list']}>
            <ul className={styles['title']}>
                <li className={styles['strong']}>Thông tin</li>
                <li className={styles['strong']}>Nội dung</li>
                <li className={styles['strong']}>Thao tác</li>
            </ul>
            {renderData()}
            {renderInput()}
        </div>
    );
}

export default ListData;
