import React from "react";

/* components */
import WindowFormContainer, { WindowForm } from "../../../../../../../common/WindowFormContainer";

/* configurations */
import make from "../../../../../../../../utils/make";
import generate from "../../../../../../../../utils/generate";
import useAccessInfoManageStore from "../../useAccessInfoManageStore";

/* style */
import styles from "./AccessInfoManageForm.module.scss"
import { useAppSelector } from "../../../../../../../../redux/hooks";
import { EnterpriseRole, EResource } from "../../../../../../../../sharetype/TPermission";
import { Self } from "../..";
import ProductResponse from "../../../../../../../../sharetype/response/resources/enterprise/ProductResponse";

export default function AccessInfoManageForm() {
    const {
        isDisplay,
        dataInput,
        selectedItem,
        handleUpdateClose,
        handleUpdateListener,
        handleInputFormCreate,
        handleShowHideInformation,
    } = useAccessInfoManageStore();

    const userAccount = useAppSelector((state) => state.user.userInfo);
    const [featch, setFeatch] = React.useState(false);

    const renderDataByRole = (): [string, string, Boolean | undefined][] | undefined => {
        if (userAccount?.permission.resource === EResource.enterprise) {
            if (userAccount.permission.role === EnterpriseRole.farmOrGarden) {
                return [
                    ["Tên đối tượng", "...", selectedItem?.control.defaultControl.isObjectNameShowing],
                    ["Địa chỉ", "...", selectedItem?.control.defaultControl.isObjectAddressShowing],
                    ["Mã GLN", "...", selectedItem?.control.defaultControl.isObjectGLNShowing],
                    ["Mã khu vườn", "...", selectedItem?.control.defaultControl.isGardenShowing],
                    ["Tên sản phẩm", "...", selectedItem?.control.defaultControl.isProductShowing],
                    ["Quy trình trồng trọt", "...", selectedItem?.control.defaultControl.isCultivationProcessesShowing],
                    ["Ngày thu hoạch", "...", selectedItem?.control.defaultControl.isHarvestDateShowing],
                    ["Khối lượng", "...", selectedItem?.control.defaultControl.isWeightShowing],
                    ["SSCC", "...", selectedItem?.control.defaultControl.isSSCCShowing],
                    ["Ngày khởi tạo", "...", selectedItem?.control.defaultControl.isSSCCCreatedAtSShowing],
                    ["Ngày xuất hàng", "...", selectedItem?.control.defaultControl.isSSCCExportedAtShowing],
                    ["Thông tin vận chuyển", "...", selectedItem?.control.defaultControl.isDeliveryShowing],
                    ["Tên nơi đến", "...", selectedItem?.control.defaultControl.isRecipientNameShowing],
                    ["Địa chỉ nơi đến", "...", selectedItem?.control.defaultControl.isRecipientAddressShowing],
                    ["Mã GLN đến", "...", selectedItem?.control.defaultControl.isRecipientGLNShowing],
                ]
            } else if (userAccount.permission.role === EnterpriseRole.processingFacility) {
                return [
                    ["Tên đối tượng", "...", selectedItem?.control.defaultControl.isObjectNameShowing],
                    ["Địa chỉ", "...", selectedItem?.control.defaultControl.isObjectAddressShowing],
                    ["Mã GLN", "...", selectedItem?.control.defaultControl.isObjectGLNShowing],
                    ["Tên sản phẩm", "...", selectedItem?.control.defaultControl.isProductShowing],
                    ["Thông tin nguyên liệu", "...", selectedItem?.control.defaultControl.isIngredientShowing],
                    ["Khối lượng", "...", selectedItem?.control.defaultControl.isWeightShowing],
                    ["Quy cách đóng gói", "...", selectedItem?.control.defaultControl.isPackTypeShowing],
                    ["Ngày sản xuất", "...", selectedItem?.control.defaultControl.isManufacturingDateShowing],
                    ["Hạn sử dụng", "...", selectedItem?.control.defaultControl.isExpiryDateShowing],
                    ["SSCC", "...", selectedItem?.control.defaultControl.isSSCCShowing],
                    ["Ngày khởi tạo", "...", selectedItem?.control.defaultControl.isSSCCCreatedAtSShowing],
                    ["Ngày xuất hàng", "...", selectedItem?.control.defaultControl.isSSCCExportedAtShowing],
                    ["Thông tin vận chuyển", "...", selectedItem?.control.defaultControl.isDeliveryShowing],
                    ["Tên nơi đến", "...", selectedItem?.control.defaultControl.isRecipientNameShowing],
                    ["Địa chỉ nơi đến", "...", selectedItem?.control.defaultControl.isRecipientAddressShowing],
                    ["Mã GLN đến", "...", selectedItem?.control.defaultControl.isRecipientGLNShowing],
                ]
            }
        }
    }

    return (
        <WindowFormContainer display={isDisplay}>
            <WindowForm
                featch={featch}
                title={"Thông tin sản phẩm"}
                width={"1024px"}
                height={"764px"}
                buttons={[
                    {
                        label: "X",
                        onClick: () => handleUpdateClose()
                    },
                    {
                        label: "Lưu",
                        onClick: () => {
                            setFeatch(true);
                            handleUpdateListener();
                            setTimeout(() => {
                                setFeatch(false);
                            }, 4000);
                        },
                    },
                    {
                        label: "Thêm mới thông tin +",
                        onClick: () => {
                            handleInputFormCreate();
                            // setDataInput((prev) => [...prev, [generate.id(), "", ""]]);
                        },
                    },
                ]}
            >
                {/* <ListData /> */}
                <div className={styles["wrapper-list"]}>
                    <ul className={styles["title"]}>
                        <li style={{ textAlign: "left" }}>Thông tin</li>
                        <li style={{ textAlign: "center" }}>Nội dung</li>
                        <li style={{ textAlign: "center" }}>Hiển thị</li>
                    </ul>
                    <RenderControlData data={renderDataByRole()} onPress={handleShowHideInformation} />
                    <RenderInput data={dataInput} />
                </div>
            </WindowForm>
        </WindowFormContainer>
    );
}

const RenderControlData = ({ data, onPress }: { data: [string, string, Boolean | undefined][] | undefined, onPress: (value: string) => void }) => {
    if (!data) return <></>

    return (
        <div className={styles["body"]}>
            {data.map((item: any) => {
                return (
                    <ul key={generate.id()}>
                        <li style={{ textAlign: "left" }}>{item[0]}</li>
                        <li style={{ textAlign: "center" }}>{item[1]}</li>
                        <li style={{ textAlign: "center" }}
                            className={styles["icon"]}
                            onClick={() => onPress(String(item[0]).trim())}
                        >{item[2] ? "visibility" : "visibility_off"}</li>
                    </ul>
                );
            })
            }
        </div >
    );
}

const RenderInput = ({ data }: { data: ProductResponse.IAdditionControl[] }) => {
    const { handleChangeText, handleInputFormRemove } = useAccessInfoManageStore();

    if (!data.length) return <></>

    return (
        <>
            {
                data.map((item: ProductResponse.IAdditionControl) => (
                    <ul key={item._id} className={styles["input-container"]}>
                        <li>
                            <label>Nhập thông tin</label>
                            <input
                                type="text"
                                // placeholder={!Boolean(item[1].trim()) ? "Không được để trống trường này." : "Nhập thông tin"}
                                placeholder={"Nhập thông tin (bắt buộc)"}
                                onChange={(event: any) => handleChangeText(item._id ? item._id : "", "title", event.target.value)}
                                className={make.className(["input", !Boolean(item.title.trim()) ? "noData" : ""], styles)}
                                value={item.title}
                            />
                        </li>
                        <li>
                            <label>Nhập nội dung</label>
                            <input
                                type="text"
                                // placeholder={!Boolean(item[2].trim()) ? "Không được để trống trường này." : "Nhập nội dung"}
                                placeholder={"Nhập nội dung (bắt buộc)"}
                                onChange={(event: any) => handleChangeText(item._id ? item._id : "", "content", event.target.value)}
                                className={make.className(["input", !Boolean(item.content.trim()) ? "noData" : ""], styles)}
                                value={item.content}
                            />
                        </li>
                        <li className={make.className(["icon", "delete"], styles)}>
                            <span onClick={() => handleInputFormRemove(item._id ? item._id : "")}>
                                delete
                            </span>
                        </li>
                    </ul>
                ))
            }
        </>
    );
}
