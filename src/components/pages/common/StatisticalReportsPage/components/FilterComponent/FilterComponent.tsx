
/* components */
import Selection from "../../../../../common/Selection";

/* configurations */
import useStatisticalReportsStore from "../../useStatisticalReportsStore";

/* packages */
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";

/* styles */
import styles from "./FilterComponent.module.scss";

/* types */
import { EResource, EStatisticalReportsRole } from "../../../../../../sharetype/TPermission";
import makeClassName from "../../../../../../utils/make/className";

const { RangePicker } = DatePicker;

type IFilterComponentProps = {
    role: EStatisticalReportsRole;
    resource?: EResource;
};

export default function FilterComponent(props: IFilterComponentProps) {
    const {
        bienSoXe,
        data,
        typeProduct,
        listSupplier,
        listMaterial,
        sanPham,
        sanPham_1,
        buttons,
        nameButton,
        selectedObj,
        selectedSanPham_1,
        btnChooseTimeClick,
        onChangeSelectObj,
        onChangselectTypeProduct,
        setSelectedTypeProduct,
        selectedSupplier,
        setSelectedSupplier,
        selectedMaterial,
        setSelectedMaterial,
        selectedTypeProduct,
        setListSupplier,
        setListMaterial,
        selectedBienSo,
        setSelectedBienSo,

        selectedSanPham,
        setSelectedSanPham,
        setSelectedSanPham_1,

        dates,
        setDates,
        loading,
        btnViewReportClick,
    } = useStatisticalReportsStore();

    const btn = buttons.filter((item) => !item.value.startsWith("nam"));
    const dateArr = dates?.map((item) => dayjs(item, "YYYY-MM-DD")) || [];
    console.log("date array: ", dateArr)
    let selections;

    switch (props.role) {
        case "farm_garden":
            selections = (
                <div className={styles["selection-container"]}>
                    <Selection
                        className={styles["select-obj"]}
                        title={"Đối tượng"}
                        placeholder={"Chọn đối tượng"}
                        options={data}
                        onChange={(v) => onChangeSelectObj(v)}
                        value={selectedObj}
                    />
                    {
                        selectedObj === "khoxe" && (
                            <Selection
                                className={styles["select-obj"]}
                                title={"Biển số xe"}
                                placeholder={"Chọn biển số"}
                                options={bienSoXe}
                                onChange={setSelectedBienSo}
                                value={selectedBienSo}
                            />
                        )
                    }
                    {
                        selectedObj === "khuvuon" && (
                            <Selection
                                className={styles["select-obj"]}
                                title={"Mã khu vườn"}
                                placeholder={"Chọn đối tượng"}
                                options={sanPham_1}
                                onChange={setSelectedSanPham_1}
                                value={selectedSanPham_1}
                            />
                        )
                    }
                    {
                        (selectedObj === "sanpham" || selectedObj === "khoxe") && (
                            <Selection
                                className={styles["select-obj"]}
                                title={"Loại sản phẩm"}
                                placeholder={"Chọn loại sản phẩm"}
                                options={sanPham}
                                onChange={setSelectedSanPham}
                                value={selectedSanPham}
                            />
                        )
                    }
                </div>
            );
            break;
        case "distribution-center":
        case "companyLogistic":
            selections = (
                <div className={styles["selection-container"]}>
                    <Selection
                        className={styles["select-obj"]}
                        title="Đối tượng:"
                        placeholder="Chọn đối tượng"
                        options={data}
                        onChange={(v) => onChangeSelectObj(v)}
                        value={selectedObj}
                    />
                    {selectedObj === "khoxe" && (
                        <Selection
                            className={styles["select-obj"]}
                            title="Biển số xe:"
                            placeholder="Chọn đối tượng"
                            options={bienSoXe}
                            onChange={setSelectedBienSo}
                            value={selectedBienSo}
                        />
                    )}
                    {(selectedObj === "sanpham" || selectedObj === "khoxe") && (
                        <Selection
                            className={styles["select-obj"]}
                            title="Loại sản phẩm:"
                            placeholder="Chọn đối tượng"
                            options={sanPham}
                            onChange={setSelectedSanPham}
                            value={selectedSanPham}
                        />
                    )}
                </div>
            );
            break;
        case "processing-facility":
            switch (props.resource) {
                case "agricultural-produce":
                    selections = (
                        <div className={styles["selection-container"]}>
                            <Selection
                                className={styles["select-obj"]}
                                title="Đối tượng:"
                                placeholder="Chọn đối tượng"
                                options={data}
                                onChange={(v) => onChangeSelectObj(v)}
                                value={selectedObj}
                            />
                            {selectedObj === "khoxe" && (
                                <Selection
                                    className={styles["select-obj"]}
                                    title="Biển số xe:"
                                    placeholder="Chọn đối tượng"
                                    options={bienSoXe}
                                    onChange={setSelectedBienSo}
                                    value={selectedBienSo}
                                />
                            )}
                            {selectedObj && (
                                <Selection
                                    className={styles["select-obj"]}
                                    title="Loại sản phẩm:"
                                    placeholder="Chọn đối tượng"
                                    options={sanPham}
                                    onChange={setSelectedSanPham}
                                    value={selectedSanPham}
                                />
                            )}
                        </div>
                    );
                    break;
                case "customer-products":
                    selections = (
                        <div className={styles["selection-container"]}>
                            <Selection
                                className={styles["select-obj"]}
                                title="Đối tượng:"
                                placeholder="Chọn đối tượng"
                                options={data}
                                onChange={(v) => onChangeSelectObj(v)}
                                value={selectedObj}
                            />
                        </div>
                    );
                    switch (selectedObj) {
                        case "khoxe":
                            selections = (
                                <div className={styles["selection-container"]}>
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Đối tượng:"
                                        placeholder="Chọn đối tượng"
                                        options={data}
                                        onChange={(v) => onChangeSelectObj(v)}
                                        value={selectedObj}
                                    />
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Biển số xe:"
                                        placeholder="Chọn đối tượng"
                                        options={bienSoXe}
                                        onChange={setSelectedBienSo}
                                        value={selectedBienSo}
                                    />

                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Loại sản phẩm:"
                                        placeholder="Chọn đối tượng"
                                        options={sanPham}
                                        onChange={setSelectedSanPham}
                                        value={selectedSanPham}
                                    />
                                </div>
                            );
                            break;
                        case "nguyenlieutho":
                            selections = (
                                <div className={styles["selection-container"]}>
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Đối tượng:"
                                        placeholder="Chọn đối tượng"
                                        options={data}
                                        onChange={(v) => {
                                            setSelectedSupplier(undefined)
                                            setSelectedMaterial(undefined)
                                            setListMaterial([])
                                            setListSupplier([])
                                            onChangeSelectObj(v)
                                        }}
                                        value={selectedObj}
                                    />
                                    <Selection
                                        className={styles["special-selection"]}
                                        title="Nhà cung cấp nguyên liệu:"
                                        placeholder="Chọn đối tượng"
                                        options={listSupplier}
                                        onChange={(v) => {
                                            setListMaterial([])
                                            setSelectedMaterial(undefined)
                                            setSelectedSupplier(v)

                                        }}
                                        value={selectedSupplier}
                                    />
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Nguyên liệu:"
                                        placeholder="Chọn đối tượng"
                                        options={listMaterial}
                                        onChange={(v) => {
                                            setSelectedMaterial(v)
                                        }}
                                        value={selectedMaterial}
                                    />
                                </div>
                            );
                            break;
                        case "sanpham":
                            selections = (
                                <div className={styles["selection-container"]}>
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Đối tượng:"
                                        placeholder="Chọn đối tượng"
                                        options={data}
                                        onChange={(v) => onChangeSelectObj(v)}
                                        value={selectedObj}
                                    />
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Loại sản phẩm:"
                                        placeholder="Chọn đối tượng"
                                        options={typeProduct}
                                        onChange={(v) => onChangselectTypeProduct(v)}
                                        value={selectedTypeProduct}
                                    />
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Sản phẩm:"
                                        placeholder="Chọn đối tượng"
                                        options={sanPham}
                                        onChange={setSelectedSanPham}
                                        value={selectedSanPham}
                                    />
                                </div>
                            );
                            break;
                        default:
                            selections = (
                                <div className={styles["selection-container"]}>
                                    <Selection
                                        className={styles["select-obj"]}
                                        title="Đối tượng:"
                                        placeholder="Chọn đối tượng"
                                        options={data}
                                        onChange={(v) => onChangeSelectObj(v)}
                                        value={selectedObj}
                                    />
                                </div>
                            );
                    }
                    break;
            }
            break;
        case "dealerStore":
        case "retail":
        case "hospital":
        case "drupStore":
        case "supermarket":
        case "restaurant":
            selections = (
                <div className={styles["selection-container"]}>
                    {
                        <Selection
                            className={styles["select-obj"]}
                            title="Loại sản phẩm:"
                            placeholder="Chọn đối tượng"
                            options={sanPham}
                            onChange={setSelectedSanPham}
                            value={selectedSanPham}
                        />
                    }
                </div>
            );
            break;
    }

    return (
        <div className={styles["filter-container"]}>
            <div className={styles["participant-container"]}>
                {selections}

                <div className={styles["time-container"]}>
                    <div className={styles["child"]}>
                        <span className={styles["label"]}>Thời gian cụ thể</span>
                        <div className={styles["child-row"]}>
                            {
                                btn.map((item) => {
                                    return (
                                        <button
                                            key={item.value}
                                            className={nameButton === item.value ? styles["active"] : ""}
                                            onClick={() => btnChooseTimeClick(item)}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className={makeClassName(["child", "day-select-input"], styles)}>
                        <span className={styles["label"]}>Thời gian khác</span>
                        <RangePicker
                            picker={"date"}
                            locale={locale}
                            format={"DD/MM/YYYY"}
                            onChange={(values) => {
                                setDates(
                                    values?.map((item) => {
                                        return dayjs(item).format("YYYY-MM-DD");
                                    }),
                                );
                            }}
                            value={[dateArr[0], dateArr[1]]}
                        />
                    </div>
                </div>

            </div>
            <div className={styles["button-container"]}>
                <button disabled={loading} className={styles["btn-report"]} onClick={btnViewReportClick}>
                    Xem báo cáo
                </button>
                <button className={makeClassName(["btn-export"], styles)}>Xuất tệp Excel</button>
            </div>
        </div>
    );
}
