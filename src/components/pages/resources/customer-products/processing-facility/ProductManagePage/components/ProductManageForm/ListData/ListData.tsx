import generate from '../../../../../../../../../utils/generate';
import styles from './ListData.module.scss';
import ProductsNamesResponse from '../../../../../../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
import { ISuppliersResponse } from '../../../../../../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse/FertilizersResponse';
import Selection from '../../../../../../../../common/Selection';
import useProductManageStore from '../../../useProductManageStore';
import { Self } from '../../../'
import make from '../../../../../../../../../utils/make';

interface IListData { }

function ListData(props: IListData) {

    const {
        displayForm,
        checkValidAll,
        idUpdate,
        productInfo,
        supplierOptionsList,
        supplierSelectedList,
        materialCodeOptionsList,
        materialCodeSelectedList,

        supplierSelected,
        setSupplierSelected,

        materialCodeSelected,
        setMaterialCodeSelected,

        setSupplierSelection,
        setMaterialCodeSelection,

        // handlerBtnSaveClick,
        handlerBtnClose,
    } = useProductManageStore();

    const renderData = () => {
        if (productInfo) {
            return (
                <div className={styles['body']}>
                    {productInfo.productDetail?.map((item, i) => {
                        return (
                            <ul key={generate.id()}>
                                <li className={styles['strong']}>{item.materialName}</li>
                                <li className={make.className(['strong', 'small-gap', 'center'], styles)}>{item.typeNumber === 1 ? `${item.quantityNumber}%` : `${item.quantityNumber}g`}</li>
                                <li>
                                    <Selection
                                        checkValidAll={checkValidAll}
                                        className={styles['selection']}
                                        placeholder={`Chọn tên nhà cung cấp`}
                                        sortBy={1}
                                        // invalidMessage={`Bạn phải chọn nhà cung cấp`}
                                        // invalidColor='red'
                                        options={supplierOptionsList[i]}
                                        maxLength={5}
                                        value={supplierSelectedList[i]?.value}
                                        onChange={(e) => {
                                            setSupplierSelection(i);
                                            return setSupplierSelected(e)
                                        }}
                                    />
                                </li>
                                <li>
                                    <div className={styles['selection-container']}>
                                        <Selection
                                            checkValidAll={checkValidAll}
                                            className={styles['selection']}
                                            placeholder={`Chọn mã nguyên liệu`}
                                            sortBy={1}
                                            // invalidMessage={`Bạn phải chọn nhà cung cấp`}
                                            // invalidColor='red'
                                            options={materialCodeOptionsList[i]}
                                            maxLength={5}
                                            value={materialCodeSelectedList[i]?.value}
                                            onChange={(e) => {
                                                setMaterialCodeSelection(i);
                                                return setMaterialCodeSelected(e)
                                            }}
                                        />
                                        {
                                            materialCodeSelectedList[i]
                                                ? <div className={styles['icon']}>done</div>
                                                : null
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className={make.className(['icon', 'center'], styles)}>visibility</div>
                                </li>
                            </ul>
                        );
                    })
                    }
                </div >
            );
        }
        return null
    };
    // renderData()
    return (
        <div className={styles['wrapper-list']}>
            <ul className={styles['title']}>
                <li>Tên nguyên liệu</li>
                <li className={make.className(['center', 'small-gap'], styles)}>Tỉ trọng</li>
                <li>Tên nhà cung cấp</li>
                <li>Mã nhập nguyên liệu</li>
                <li className={styles['center']}>Thông tin nguyên liệu</li>
            </ul>
            {renderData()}
        </div>
    );
}

export default ListData;