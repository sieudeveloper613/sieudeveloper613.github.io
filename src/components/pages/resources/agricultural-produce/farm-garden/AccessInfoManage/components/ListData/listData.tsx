import { useCallback } from "react";

/* configurations */
import make from "../../../../../../../../utils/make";
import generate from "../../../../../../../../utils/generate";
import useAccessInfoManageStore from "../../useAccessInfoManageStore";

/* styles */
import styles from "./ListData.module.scss";


function ListData() {
    const {
        dataInput,
        setDataInput,
        
    } = useAccessInfoManageStore();

    const renderData = () => {
        const field: [string, string, Boolean | undefined][] = [
            // ["Tên trang trại", "...", isHiddenNameOrg],
            // ["Địa chỉ", "...", isHiddenAddressOrg],
            // ["Mã khu vườn", "...", isHiddenGardenCode],
            // ["Tên sản phẩm", "...", isHiddenProductName],
            // ["Loại phân bón", "...", isHiddenFertilizers],
            // ["Loại thuốc trừ sâu", "...", isHiddenPesticides],
            // ["Khối lượng", "...", isHiddenAmount],
            // ["Ngày xuất hàng", "...", isHiddenExportDate],
            // ["Tên nơi đến", "...", isHiddenArrivedPlace],
            // ["Địa chỉ nơi đến", "...", isHiddenArrivedAddress],
            // ["Loại giống", "...", isHiddenPlantVarieties],
            // ["Ngày thu hoạch", "...", isHiddenHarvestDate],
            // ["Đơn vị vận chuyển", "...", isHiddenTransportServiceName],
            // ["Biển số", "...", isHiddenVehicleName],
            // ["Tài xế", "...", isHiddenDriverName],
        ];

        return (
            <div className={styles["body"]}>
                {field.map((item: any, index: number) => {
                    return (
                        <ul key={generate.id()}>
                            <li style={{ textAlign: "left" }}>{item[0]}</li>
                            <li style={{ textAlign: "center" }}>{item[1]}</li>
                            <li style={{ textAlign: "center" }}
                                className={styles["icon"]}
                                onClick={() => {}}
                            >{item[2] ? "visibility_off" : "visibility"}</li>
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
                // const newData = [...prev];
                // const updateObj = newData.find((item) => item[0] === id);
                // if (!updateObj) return prev;
                // updateObj[i] = value;
                return prev;
                // return newData;
            });
        },
        [setDataInput],
    );

    const renderInput = useCallback(() => {
        return <></>
        // return dataInput.map((item) => (
        //     <ul key={item[0]} className={styles["input-container"]}>
        //         <li>
        //             <label>Nhập thông tin</label>
        //             <input
        //                 type="text"
        //                 // placeholder={!Boolean(item[1].trim()) ? "Không được để trống trường này." : "Nhập thông tin"}
        //                 placeholder={"Nhập thông tin (bắt buộc)"}
        //                 onChange={(e) => onChangeInput(item[0], 1, e.target.value)}
        //                 className={make.className(["input", !Boolean(item[1].trim()) ? "noData" : ""], styles)}
        //                 value={item[1]}
        //             />
        //         </li>
        //         <li>
        //             <label>Nhập nội dung</label>
        //             <input
        //                 type="text"
        //                 // placeholder={!Boolean(item[2].trim()) ? "Không được để trống trường này." : "Nhập nội dung"}
        //                 placeholder={"Nhập nội dung (bắt buộc)"}
        //                 onChange={(e) => onChangeInput(item[0], 2, e.target.value)}
        //                 className={make.className(["input", !Boolean(item[2].trim()) ? "noData" : ""], styles)}
        //                 value={item[2]}
        //             />
        //         </li>
        //         <li className={make.className(["icon", "delete"], styles)}>
        //             <span onClick={() => setDataInput((prev) => prev.filter((elem) => elem[0] !== item[0]))}>
        //                 delete
        //             </span>
        //         </li>
        //     </ul>
        // ));
    }, [dataInput, setDataInput, onChangeInput]);

    return (
        <div className={styles["wrapper-list"]}>
            <ul className={styles["title"]}>
                <li style={{ textAlign: "left" }}>Thông tin</li>
                <li style={{ textAlign: "center" }}>Nội dung</li>
                <li style={{ textAlign: "center" }}>Thao tác</li>
            </ul>
            {renderData()}
            {renderInput()}
        </div>
    );
}

export default ListData;
