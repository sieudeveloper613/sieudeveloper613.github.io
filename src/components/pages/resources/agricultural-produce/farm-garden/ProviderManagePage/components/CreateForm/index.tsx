import React, { useState } from "react";

/* components */
import Selection from "../Selection";
import DatePicker from "../DatePicker";
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import useProviderManageStore from "../../useProviderManageStore";

/* styles */
import styles from "./CreateForm.module.scss"

const CreateForm = () => {
    // collect value from store
    const {
        dates,
        suppliers,
        areInvalids,
        selectedImage,
        materialNames,
        materialTypes,
        isDisplayForms,
        selectedSupplier,
        selectedMaterialName,
        selectedMaterialType,
        setDates,
        setSelectedImage,
        setSelectedSupplier,
        handleCreateFormClose,
        handleCreateFormConfirm,
        setSelectedMaterialName,
        setSelectedMaterialType,
    } = useProviderManageStore();

    // create state
    const [featch] = useState<boolean>(false);

    const handleImageChange = (event: any) => setSelectedImage(event.target.files[0]);

    const handleSupplierChange = (event: any) => setSelectedSupplier(event.target.value);

    const handleMaterialNameChange = (event: any) => setSelectedMaterialName(event.target.value);

    const handleMaterialTypeChange = (event: any) => setSelectedMaterialType(event.target.value);

    const handleManufacturingDateChange = (event: any) => setDates((previousState: any) => ({ ...previousState, manufacturingDate: event.target.value }));

    const handleExpiryDateChange = (event: any) => setDates((previousState: any) => ({ ...previousState, expiryDate: event.target.value }));

    const handleDeliveryDateChange = (event: any) => setDates((previousState: any) => ({ ...previousState, deliveryDate: event.target.value }));

    return (
        <WindowFormContainer display={isDisplayForms.create}>
            <WindowForm
                title={`Tạo mới thông tin: Quản lý nhà cung cấp`}
                featch={featch}
                width={"1024px"}
                height={"auto"}
                buttons={[
                    {
                        label: "X",
                        onClick: handleCreateFormClose,
                    },
                    {
                        label: "Đóng",
                        onClick: handleCreateFormClose,
                    },
                    {
                        label: "Xác nhận",
                        onClick: handleCreateFormConfirm,
                    }
                ]}
            >
                <div className={styles["form-container"]}>
                    <div className={styles["children-container"]}>
                        <div className={styles["row-wrapper"]}>
                            <Selection
                                isEmpty={!selectedSupplier && areInvalids.supplier ? true : false}
                                data={suppliers}
                                label={"Nhà cung cấp"}
                                message={"Vui lòng chọn nhà cung cấp!"}
                                value={selectedSupplier}
                                onValueChange={handleSupplierChange}
                            />

                            <Selection
                                isEmpty={!selectedMaterialType && areInvalids.materialType ? true : false}
                                data={materialTypes}
                                label={"Loại vật tư"}
                                message={"Vui lòng chọn loại vật tư!"}
                                value={selectedMaterialType}
                                onValueChange={handleMaterialTypeChange}
                            />

                            <Selection
                                disabled={!selectedMaterialType ? true : false}
                                isEmpty={!selectedMaterialName && areInvalids.materialName ? true : false}
                                data={materialNames}
                                label={"Tên vật tư"}
                                message={"Vui lòng chọn tên vật tư!"}
                                value={selectedMaterialName}
                                onValueChange={handleMaterialNameChange}
                            />
                        </div>
                        <div className={styles["row-wrapper"]}>
                        <label htmlFor="file-upload" className={styles["upload-button"]}>
                            <span className="material-symbols-outlined">backup</span> 
                            Tải tệp lên{selectedImage ? ": " + String(selectedImage.name) : ""}
                        </label>
                        <input id={"file-upload"} type={"file"} name={"uploadImageFile"} alt={"Upload image file"} onChange={handleImageChange}/>
                            {
                                selectedImage ? (
                                    <img className={styles["upload-image"]} alt="uploaded image" src={URL.createObjectURL(selectedImage)} /> 
                                ) : (
                                    <span className={styles["no-upload-image"]}>Hình ảnh tải lên sẽ hiển thị ở đây</span>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles["date-wrapper"]}>
                        <DatePicker
                            isEmpty={!dates.manufacturingDate && areInvalids.manufacturingDate ? true : false}
                            label={"Ngày sản xuất"}
                            placeholder={"Chọn ngày sản xuất"}
                            value={dates.manufacturingDate}
                            onValueChange={handleManufacturingDateChange}
                            message={"Vui lòng chọn ngày sản xuất!"}
                        />

                        <DatePicker
                            isEmpty={!dates.expiryDate && areInvalids.expiryDate ? true : false}
                            label={"Ngày hết hạn"}
                            placeholder={"Chọn ngày hết hạn"}
                            value={dates.expiryDate}
                            onValueChange={handleExpiryDateChange}
                            message={"Vui lòng chọn ngày hết hạn!"}
                        />

                        <DatePicker
                            isEmpty={!dates.deliveryDate && areInvalids.deliveryDate ? true : false}
                            label={"Ngày giao hàng"}
                            placeholder={"Chọn ngày giao hàng"}
                            value={dates.deliveryDate}
                            onValueChange={handleDeliveryDateChange}
                            message={"Vui lòng chọn ngày giao hàng!"}
                        />
                    </div>
                </div>
            </WindowForm>
        </WindowFormContainer>
    )
}

export default React.memo(CreateForm);