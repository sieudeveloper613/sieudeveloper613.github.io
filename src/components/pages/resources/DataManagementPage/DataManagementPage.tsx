import { Fragment } from "react";

/* components */
import SearchBar from "../../../common/SearchBar";
import InfoComponent from "./components/InfoComponent";
import ShareComponent from "./components/ShareComponent";

/* configurations */
import Address from "../../../../utils/Address";
import useDataManagementStore from "./useDataManagementStore";

/* packages */
import moment from "moment";
import { Circles } from "react-loader-spinner";

/* styles */
import styles from "./DataManagementPage.module.scss";


function DataManagementBasePage() {
    // get values from store
    const {
        search,
        isLoading,
        infoAccount,
        childrenData,
        isDataShowing,
        responsibleData,
        handleInputChange,
        handleShareListener,
        handleSearchListener,
    } = useDataManagementStore();

    console.log("responsible Data: ", responsibleData);

    /** create variable */
    const IS_CHILDREN_COMPONENT: boolean = true;
    let farmGardenData, childrenResourceData, processingFacilityData, distributionCenterData;
    const FORMATED_ADDRESS = {
        "addressLine": responsibleData?.recipient?.address.road || "",
        "ward": responsibleData?.recipient?.address?.ward || "",
        "district": responsibleData?.recipient?.address?.district || "",
        "city": responsibleData?.recipient?.address?.city || "",
        "lat": responsibleData?.recipient?.address?.latitude || "",
        "lng": responsibleData?.recipient?.address?.longitude || ""
    };

    const CHILDREN_FORMATED_ADDRESS = {
        "addressLine": childrenData?.recipient?.address.road || "",
        "ward": childrenData?.recipient?.address?.ward || "",
        "district": childrenData?.recipient?.address?.district || "",
        "city": childrenData?.recipient?.address?.city || "",
        "lat": childrenData?.recipient?.address?.latitude || "",
        "lng": childrenData?.recipient?.address?.longitude || ""
    };

    if (isDataShowing) {
        farmGardenData = {
            "Tên trang trại": isDataShowing.isObjectNameShowing ? responsibleData?.objectName || null : "---",
            "Địa chỉ trang trại": isDataShowing.isObjectAddressShowing ? responsibleData?.objectAddress ? Address.instance.makeAddressName(responsibleData?.objectAddress) : null : "---",
            "Mã GLN": isDataShowing.isObjectGLNShowing ? responsibleData?.objectGLN || null : "---",
            "Mã khu vườn": isDataShowing.isGardenShowing ? responsibleData?.gardenCode || null : "---",
            "Tên sản phẩm": isDataShowing.isProductShowing ? responsibleData?.productName || null : "---",
            "Quy trình trồng trọt": isDataShowing.isCultivationProcessesShowing ? responsibleData?.cultivationProcesses || null : "---",
            "Ngày thu hoạch": isDataShowing.isHarvestDateShowing ? moment(responsibleData?.harvestDate).format("DD/MM/YYYY") || null : "---",
            "Khối lượng": isDataShowing.isWeightShowing ? responsibleData?.weight + " KG" || null : "---",
            "SSCC": isDataShowing.isSSCCShowing ? responsibleData?.SSCC || null : "---",
            "Ngày khởi tạo": isDataShowing.isSSCCCreatedAtSShowing ? responsibleData?.SSCCCreatedAt ? moment(responsibleData?.SSCCCreatedAt).format("DD/MM/YYYY") : null : "---",
            "Ngày xuất hàng": isDataShowing.isSSCCExportedAtShowing ? responsibleData?.SSCCExportedAt ? moment(responsibleData?.SSCCExportedAt).format("DD/MM/YYYY") : null : "---",
            "Thông tin vận chuyển": isDataShowing.isDeliveryShowing ? (responsibleData?.delivery ? {
                "đơn vị vận chuyển": responsibleData?.delivery.deliveryType || null,
                "xe": responsibleData?.delivery.vehicle || null,
                "tài xế": responsibleData?.delivery.driver || null
            } : null) : "---",
            "Tên nơi đến": isDataShowing.isRecipientNameShowing ? (responsibleData?.recipient ? responsibleData.recipient?.objectName : null) : "---",
            "Địa chỉ đến": isDataShowing.isRecipientAddressShowing ? (responsibleData?.recipient ? Address.instance.makeAddressName(FORMATED_ADDRESS) : null) : "---",
            "Mã GLN nơi đến": isDataShowing.isRecipientGLNShowing ? (responsibleData?.recipient ? responsibleData.recipient?.email : null) : "---",
        }
         
        childrenResourceData = {
            "Tên trang trại": isDataShowing.isObjectNameShowing ? childrenData?.objectName || null : "---",
            "Địa chỉ trang trại": isDataShowing.isObjectAddressShowing ? childrenData?.objectAddress ? Address.instance.makeAddressName(childrenData?.objectAddress) : null : "---",
            "Mã GLN": isDataShowing.isObjectGLNShowing ? childrenData?.objectGLN || null : "---",
            "Mã khu vườn": isDataShowing.isGardenShowing ? childrenData?.gardenCode || null : "---",
            "Tên sản phẩm": isDataShowing.isProductShowing ? childrenData?.productName || null : "---",
            "Quy trình trồng trọt": isDataShowing.isCultivationProcessesShowing ? childrenData?.cultivationProcesses || null : "---",
            "Ngày thu hoạch": isDataShowing.isHarvestDateShowing ? moment(childrenData?.harvestDate).format("DD/MM/YYYY") || null : "---",
            "Khối lượng": isDataShowing.isWeightShowing ? childrenData?.weight + " KG" || null : "---",
            "SSCC": isDataShowing.isSSCCShowing ? childrenData?.SSCC || null : "---",
            "Ngày khởi tạo": isDataShowing.isSSCCCreatedAtSShowing ? childrenData?.SSCCCreatedAt ? moment(childrenData?.SSCCCreatedAt).format("DD/MM/YYYY") : null : "---",
            "Ngày xuất hàng": isDataShowing.isSSCCExportedAtShowing ? childrenData?.SSCCExportedAt ? moment(childrenData?.SSCCExportedAt).format("DD/MM/YYYY") : null : "---",
            "Thông tin vận chuyển": isDataShowing.isDeliveryShowing ? (childrenData?.delivery ? {
                "đơn vị vận chuyển": childrenData?.delivery.deliveryType || null,
                "xe": childrenData?.delivery.vehicle || null,
                "tài xế": childrenData?.delivery.driver || null
            } : null) : "---",
            "Tên nơi đến": isDataShowing.isRecipientNameShowing ? (childrenData?.recipient ? childrenData.recipient?.objectName : null) : "---",
            "Địa chỉ đến": isDataShowing.isRecipientAddressShowing ? (childrenData?.recipient ? Address.instance.makeAddressName(CHILDREN_FORMATED_ADDRESS) : null) : "---",
            "Mã GLN nơi đến": isDataShowing.isRecipientGLNShowing ? (childrenData?.recipient ? childrenData.recipient?.email : null) : "---",
        }

        processingFacilityData = {
            "Tên cơ sở chế biến": isDataShowing.isObjectNameShowing ? responsibleData?.objectName || null : "---",
            "Địa chỉ": isDataShowing.isObjectAddressShowing ? responsibleData?.objectAddress ? Address.instance.makeAddressName(responsibleData?.objectAddress) : null : "---",
            "Mã GLN": isDataShowing.isObjectGLNShowing ? responsibleData?.objectGLN || null : "---",
            "Tên sản phẩm": isDataShowing.isProductShowing ? responsibleData?.productName || null : "---",
            "Thông tin nguyên liệu": isDataShowing.isIngredientShowing ? responsibleData?.ingredient.length ? responsibleData?.ingredient : null : "---",
            // "Thông tin nguyên liệu": isDataShowing.isIngredientShowing ? (responsibleData?.ingredient ? {
            //     "Tên nguyên liệu": responsibleData?.ingredient.ingredientName || null,
            //     "Quy trình": responsibleData.ingredient ? responsibleData.ingredient : null ,
            //     "Nguồn nguyên liệu": IS_CHILDREN_COMPONENT
            // } : null) : "---",
            "Khối lượng sản phẩm": isDataShowing.isWeightShowing ? (responsibleData?.weight ? responsibleData?.weight + " KG" : null) || null : "---",
            "Quy cách đóng gói": isDataShowing.isPackTypeShowing ? responsibleData?.packType || null : "---",
            "Ngày sản xuất": isDataShowing.isManufacturingDateShowing ? (responsibleData?.manufacturingDate ? moment(responsibleData?.manufacturingDate).format("DD/MM/YYYY") : null) : "---",
            "Hạn sử dụng": isDataShowing.isExpiryDateShowing ? responsibleData?.expiryDate ? moment(responsibleData?.expiryDate).format("DD/MM/YYYY") : null : "---",
            "SSCC": isDataShowing.isSSCCShowing ? responsibleData?.SSCC || null : "---",
            "Ngày khởi tạo": isDataShowing.isSSCCCreatedAtSShowing ? responsibleData?.SSCCCreatedAt ? moment(responsibleData?.SSCCCreatedAt).format("DD/MM/YYYY") : null : "---",
            "Ngày xuất hàng": isDataShowing.isSSCCExportedAtShowing ? responsibleData?.SSCCExportedAt ? moment(responsibleData?.SSCCCreatedAt).format("DD/MM/YYYY") : null : "---",
            "Thông tin vận chuyển": isDataShowing.isDeliveryShowing ? (responsibleData?.delivery ? {
                "Đơn vị vận chuyển": responsibleData?.delivery.deliveryType || null,
                "Xe": responsibleData?.delivery.vehicle || null,
                "Tài xế": responsibleData?.delivery.driver || null
            } : null) : "---",
            "Tên nơi đến": isDataShowing.isRecipientNameShowing ? responsibleData?.recipient?.objectName || null : "---",
            "Địa chỉ đến": isDataShowing.isRecipientAddressShowing ? (responsibleData?.recipient ? Address.instance.makeAddressName(FORMATED_ADDRESS) : null) : "---",
            "Mã GLN nơi đến": isDataShowing.isRecipientGLNShowing ? responsibleData?.recipient?.email || null : "---",
        }

        distributionCenterData = {
            "Ngày nhập hàng": "05/07/2024",
            "Tên doanh nghiệp": "Nhà phân phối Checkee",
            "Địa chỉ": "E11 Đường số 56, KDC 586, Phường Phú Thứ, Quận Cái răng, Thành phố Cần Thơ",
            "Mã GLN": null,
        }
    } else {
        farmGardenData = {
            "Tên trang trại": responsibleData ? responsibleData.objectName : null,
            "Địa chỉ trang trại": responsibleData ? responsibleData.objectAddress ? Address.instance.makeAddressName(responsibleData.objectAddress) : null : null,
            "Mã GLN": responsibleData ? responsibleData.objectGLN : null,
            "Mã khu vườn": responsibleData ? responsibleData.gardenCode : null,
            "Tên sản phẩm": responsibleData ? responsibleData.productName : null,
            "Quy trình trồng trọt": responsibleData ? responsibleData.cultivationProcesses : null,
            "Ngày thu hoạch": responsibleData ? responsibleData.harvestDate && moment(responsibleData.harvestDate).format("DD/MM/YYYY") : null,
            "Khối lượng": responsibleData ? responsibleData.weight + " KG" : null,
            "SSCC": responsibleData ? responsibleData.SSCC : null,
            "Ngày khởi tạo": responsibleData ? responsibleData.SSCCCreatedAt && moment(responsibleData.SSCCCreatedAt).format("DD/MM/YYYY") : null,
            "Ngày xuất hàng": responsibleData ? responsibleData.SSCCExportedAt && moment(responsibleData.SSCCExportedAt).format("DD/MM/YYYY") : null,
            "Thông tin vận chuyển": responsibleData ? responsibleData.delivery && {
                "đơn vị vận chuyển": responsibleData.delivery.deliveryType || null,
                "xe": responsibleData?.delivery.vehicle || null,
                "tài xế": responsibleData.delivery.driver || null
            } : null,
            "Tên nơi đến": responsibleData ? responsibleData.recipient ? responsibleData.recipient.objectName : null : null,
            "Địa chỉ đến": responsibleData ? responsibleData.recipient ? Address.instance.makeAddressName(FORMATED_ADDRESS) : null : null,
            "Mã GLN nơi đến": responsibleData ? responsibleData.recipient ? responsibleData.recipient.email : null : null,
        }

        childrenResourceData = {
            "Tên trang trại": childrenData ? childrenData.objectName : null,
            "Địa chỉ trang trại": childrenData ? childrenData.objectAddress ? Address.instance.makeAddressName(childrenData.objectAddress) : null : null,
            "Mã GLN": childrenData ? childrenData.objectGLN : null,
            "Mã khu vườn": childrenData ? childrenData.gardenCode : null,
            "Tên sản phẩm": childrenData ? childrenData.productName : null,
            "Quy trình trồng trọt": childrenData ? childrenData.cultivationProcesses : null,
            "Ngày thu hoạch": childrenData ? moment(childrenData.harvestDate).format("DD/MM/YYYY") : null,
            "Khối lượng": childrenData ? childrenData.weight + " KG" : null,
            "SSCC": childrenData ? childrenData.SSCC : null,
            "Ngày khởi tạo": childrenData ? childrenData.SSCCCreatedAt : null,
            "Ngày xuất hàng": childrenData ? childrenData.SSCCExportedAt : null,
            "Thông tin vận chuyển": childrenData ? childrenData.delivery && {
                "đơn vị vận chuyển": childrenData.delivery.deliveryType || null,
                "xe": childrenData?.delivery.vehicle || null,
                "tài xế": childrenData.delivery.driver || null
            } : null,
            "Tên nơi đến": childrenData ? childrenData.recipient ? childrenData.recipient.objectName : null : null,
            "Địa chỉ đến": childrenData ? childrenData.recipient ? childrenData.recipient.objectName : null : null,
            "Mã GLN nơi đến": childrenData ? childrenData.recipient ? childrenData.recipient.email : null : null,
        }

        processingFacilityData = {
            "Tên cơ sở chế biến": responsibleData ? responsibleData.objectName : null,
            "Địa chỉ": responsibleData ? responsibleData.objectAddress ? Address.instance.makeAddressName(responsibleData.objectAddress) : null : null,
            "Mã GLN": responsibleData ? responsibleData.objectGLN : null,
            "Tên sản phẩm": responsibleData ? responsibleData.productName : null,
            "Thông tin nguyên liệu": responsibleData ? responsibleData.ingredient.length && responsibleData.ingredient : null,
            "Khối lượng sản phẩm": responsibleData ? responsibleData.weight + " KG" : null,
            "Quy cách đóng gói": responsibleData ? responsibleData.packType : null,
            "Ngày sản xuất": responsibleData ? responsibleData.manufacturingDate && moment(responsibleData.manufacturingDate).format("DD/MM/YYYY") : null,
            "Hạn sử dụng": responsibleData ? responsibleData.expiryDate && moment(responsibleData.expiryDate).format("DD/MM/YYYY") : null,
            "SSCC": responsibleData ? responsibleData.SSCC : null,
            "Ngày khởi tạo": responsibleData ? responsibleData.SSCCCreatedAt && moment(responsibleData.SSCCCreatedAt).format("DD/MM/YYYY") : null,
            "Ngày xuất hàng": responsibleData ? responsibleData.SSCCExportedAt && moment(responsibleData.SSCCExportedAt).format("DD/MM/YYYY") : null,
            "Thông tin vận chuyển": responsibleData ? responsibleData.delivery && {
                "đơn vị vận chuyển": responsibleData.delivery.deliveryType || null,
                "xe": responsibleData.delivery.vehicle || null,
                "tài xế": responsibleData.delivery.driver || null
            } : null,
            "Tên nơi đến": responsibleData ? responsibleData.recipient ? responsibleData.recipient.objectName : null : null,
            "Địa chỉ đến": responsibleData ? responsibleData.recipient ? Address.instance.makeAddressName(FORMATED_ADDRESS) : null : null,
            "Mã GLN nơi đến": responsibleData ? responsibleData.recipient ? responsibleData.recipient.email : null : null,
        }

        distributionCenterData = {
            "Ngày nhập hàng": "05/07/2024",
            "Tên doanh nghiệp": "Nhà phân phối Checkee",
            "Địa chỉ": "E11 Đường số 56, KDC 586, Phường Phú Thứ, Quận Cái răng, Thành phố Cần Thơ",
            "Mã GLN": null,
        }
    }

    return (
        <Fragment>
            <ShareComponent />
            <div style={{ position: "relative" }}>
                <div className={styles["header-wrap"]}>
                    <SearchBar
                        placeholder={"Nhập mã sản phẩm..."}
                        input={search}
                        setInput={(e: any) => handleInputChange(e)}
                        handleButtonClick={handleSearchListener}
                    />
                    {
                        (responsibleData && infoAccount) &&
                        <button type={"button"} className={styles["button-share"]} onClick={handleShareListener}>
                            <span className={styles["icon"]}>share</span>
                            <span className={styles["text"]}>Chia sẻ</span>
                        </button>
                    }
                </div>
                {
                    isLoading ? (
                        <Circles
                            height="48"
                            width="48"
                            color="#ff4500"
                            ariaLabel="circles-loading"
                            wrapperStyle={{ display: "flex", justifyContent: "center", padding: "24px" }}
                            wrapperClass=""
                            visible={isLoading}
                        />
                    ) : responsibleData ?
                        <div className={styles["wrapper"]}>
                            <div className={styles["header-container"]}>
                                <div className={styles["picture-container"]}>
                                    {
                                        !responsibleData.productImage ? (
                                            <img
                                                src={"https://cdn-icons-png.freepik.com/256/16604/16604063.png?semt=ais_hybrid"}
                                                alt="represent product picture"
                                                className={styles["picture"]}
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        ) : (
                                            <img
                                                src={responsibleData.productImage}
                                                alt="represent product picture"
                                                className={styles["picture"]}
                                            />
                                        )
                                    }
                                    <i style={{ color: "gray", marginTop: 8 }}>Hình đại diện sản phẩm</i>
                                </div>

                                <div className={styles["title"]}>
                                    <div className={styles["strong"]}>Kết quả truy xuất nguồn gốc</div>
                                    <div style={{ color: "gray", textTransform: "uppercase" }}>Mã truy xuất sản phẩm</div>
                                    <div className={styles["code-container"]}>
                                        {responsibleData.qrCode}
                                    </div>
                                </div>
                            </div>


                            {   /** if harvest date is not null (MFD and EXD must be null), then return Farm-garden Component */
                                responsibleData.harvestDate && (
                                    <InfoComponent title={"Trang trại"} data={farmGardenData} />
                                )
                            }
                            {   /** if manufacturing and expiry date are not null (harvest date must be null), then return Processing facility */
                                responsibleData.manufacturingDate && responsibleData.expiryDate && (
                                    <InfoComponent 
                                        title="Cơ sở chế biến" 
                                        data={processingFacilityData} 
                                        children={
                                            <InfoComponent title={"Trang trại"} isChildrenComponent data={childrenResourceData} />
                                        } 
                                    />
                                )
                            }
                            {/* <InfoComponent title="Nhà phân phối" data={distributionCenterData} /> */}
                        </div>
                    : responsibleData === null  ? (
                        <div className={styles["wrapper"]}>
                            <div className={styles["header-container"]}>
                                <div className={styles["picture-container"]}>
                                        <img
                                            src={"https://cdn-icons-png.flaticon.com/256/14040/14040336.png"}
                                            alt="represent product picture"
                                            className={styles["picture"]}
                                            style={{ border: "none", backgroundColor: "transparent" }}
                                        />
                                </div>

                                <div className={styles["title"]}>
                                    <div className={styles["strong"]}>Kết quả truy xuất nguồn gốc</div>
                                    <div style={{ color: "gray", textTransform: "uppercase" }}>Không tìm thấy thông tin mã này</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles["wrapper"]}>
                            <div className={styles["header-container"]}>
                                <div className={styles["picture-container"]}>
                                        <img
                                            src={"https://cdn-icons-png.flaticon.com/256/9968/9968777.png"}
                                            alt="represent product picture"
                                            className={styles["picture"]}
                                            style={{ border: "none", backgroundColor: "transparent" }}
                                        />
                                </div>

                                <div className={styles["title"]}>
                                    <div className={styles["strong"]}>Truy xuất nguồn gốc</div>
                                    <div style={{ color: "gray", textTransform: "uppercase" }}>Vui lòng nhập mã để truy xuất thông tin</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default DataManagementBasePage;