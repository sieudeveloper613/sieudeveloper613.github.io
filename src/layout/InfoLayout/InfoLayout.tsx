import make from "../../utils/make";
import Address from "../../utils/Address";
import styles from "./InfoLayout.module.scss";
import { useAppSelector } from "../../redux/hooks";
import NavBar from "../../components/common/NavBar";
import Header from "../../components/common/Header/Header";
import Prettier from "../../utils/Prettier";

export default function InfoLayout() {
    const infoAccount = useAppSelector((state) => state.user.userInfo);

    const Information = ({ label, value }: { label: string, value: string | undefined }) => (
        <div className={styles["information-row"]}>
            <h5 className={styles["label"]}>{label}</h5>
            <h3 className={styles["value"]}>{value ? value : ""}</h3>
        </div>
    )

    return (
        <div className={make.className([styles["default-layout"]])}>
            <Header />
            <div className={styles["container"]}>
                <div className="navbar">
                    <NavBar />
                </div>
                <main className="main">
                    <div className={styles["info-page"]}>
                        <h2 className={styles["info-page-title"]}>Thông tin tài khoản</h2>
                        { infoAccount && <div className={styles["avatar"]}>{infoAccount.name.substring(0, 1)}</div> }
                        <div className={styles["info-page-list"]}>
                            <Information label={"Tên đơn vị"} value={infoAccount?.name} />
                            <Information label={"Email"} value={infoAccount?.email} />
                            <Information label={"Số điện thoại"} value={Prettier.phoneNumber(infoAccount?.phone ? infoAccount.phone : "")} />
                            <Information label={"Địa chỉ"} value={Address.instance.makeAddressName(infoAccount?.address)} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
