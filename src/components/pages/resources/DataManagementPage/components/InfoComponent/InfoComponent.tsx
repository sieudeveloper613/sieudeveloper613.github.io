import { useState, Fragment } from "react";
import moment from "moment";
import make from "../../../../../../utils/make";
import { Circles } from "react-loader-spinner";
import styles from "./InfoComponent.module.scss";
import generate from "../../../../../../utils/generate";
import useDataManagementStore from "../../useDataManagementStore";

type IInfoComponentProps = {
    data: any;
    title: string;
    hiddenBottomBorder?: boolean;
    isChildrenComponent?: boolean,
    children?: any
}

export default function InfoComponent(props: IInfoComponentProps) {

    // return key/value pair of object to array of key/value
    const entries = Object.entries(props.data);

    // create state
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);


    const handleClickShow = (index: number) => {
        if (isShow && selectedId) {
            setIsShow(!isShow);
        } else {
            setSelectedId(index);
            setIsShow(!isShow);
        }
    };

    const Item = ({ label, value }: { label: string, value: string }) => (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", padding: "8px" }}>
            <div style={{ width: "50%", color: "black", fontWeight: "bold" }}>{label}</div>
            <div style={{ width: "50%", color: "black" }}>{value}</div>
        </div>
    )

    return (
        <div className={make.className(["wrapper", props.hiddenBottomBorder ? "none-bottom-border" : null], styles)}>
            {
                !props.isChildrenComponent && (
                    <div className={styles["title"]}>
                        <span>THÔNG TIN</span>
                        <span>{props.title.toLocaleUpperCase()}</span>
                    </div>
                )
            }
            <ul>
                {
                    entries.map((item: any, index: number) => {
                        const LABEL = item[0];
                        const VALUE = item[1];
                        if (typeof VALUE === "object") {
                            if (!VALUE) {
                                return (
                                    <li key={index} className={styles["row"]}>
                                        <div className={styles["key"]}>{LABEL.toLocaleUpperCase()}</div>
                                        <div className={styles["value"]} style={{ color: "tomato" }}>{"Chưa khai báo"}</div>
                                    </li>
                                )
                            } else if (Array.isArray(VALUE)) {
                                return (
                                    <Fragment>
                                        <li key={index} className={styles["row"]}>
                                            <div className={styles["key"]}>{LABEL.toLocaleUpperCase()}</div>
                                            <div className={styles["value"]}>
                                                <div className={styles["icon"]} onClick={() => handleClickShow(index)}>
                                                    {isShow && selectedId === index ? "visibility_off" : "visibility"}
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            isShow && selectedId === index && (
                                                <div className={styles["children-container"]}>
                                                    {
                                                        LABEL === "Quy trình trồng trọt" ?
                                                            VALUE.map((value: any) => {
                                                                return (
                                                                    <div key={generate.id()} style={{ display: "flex", flexDirection: "row", margin: "24px 0px" }}>
                                                                        <div style={{ width: "40%", color: "black", fontWeight: "bold" }}>
                                                                            {value.process.toUpperCase()}
                                                                        </div>
                                                                        <div style={{ display: "flex", flexDirection: "column", width: "60%", gap: 16 }}>
                                                                            {
                                                                                value.times.map((time: any, index: number) => {
                                                                                    return (
                                                                                        <div key={item._id} style={{ flexDirection: "column", borderBottom: "1px solid #d3d3d3" }}>
                                                                                            <Item label={"THỜI GIAN"} value={`Lần ${index + 1} - ${moment(item.createdAt).format("DD/MM/YYYY")}`} />
                                                                                            <Item label={"TÊN VẬT TƯ"} value={time.material} />
                                                                                            <Item label={"NHÀ CUNG CẤP"} value={time.supplier} />
                                                                                            <Item label={"LIỀU LƯỢNG"} value={time.dosage} />
                                                                                            <Item label={"TÊN NHÂN SỰ"} value={time.humanResource} />
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : LABEL === "Thông tin nguyên liệu" ?
                                                                VALUE.map((value: any) => {
                                                                    return (
                                                                        <Ingredient 
                                                                            data={value} 
                                                                            children={props.children}  
                                                                        />
                                                                    )
                                                                })
                                                                : Object.entries(item[1]).map((value: any) => {
                                                                    return (
                                                                        <li key={generate.id()} className={styles["child-row"]}>
                                                                            <div className={styles["child-key"]}>{value[0].toLocaleUpperCase()}</div>
                                                                            <div className={styles["child-value"]} style={{ color: !value[1] || value[1] === "" ? "tomato" : "black" }}>{value[1]}</div>
                                                                        </li>
                                                                    )
                                                                })
                                                    }
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                )
                            } else if (Object.keys(VALUE).length) {
                                return (
                                    <Fragment>
                                        <li key={index} className={styles["row"]}>
                                            <div className={styles["key"]}>
                                                {LABEL.toLocaleUpperCase()}
                                            </div>
                                            <div className={styles["value"]}>
                                                <div
                                                    className={styles["icon"]}
                                                    onClick={() => handleClickShow(index)}
                                                >{isShow && selectedId === index ? "visibility_off" : "visibility"}</div>
                                            </div>
                                        </li>
                                        {
                                            isShow && selectedId === index && (
                                                <div className={styles["children-container"]}>
                                                    {
                                                        Object.entries(VALUE).length > 0 &&
                                                        Object.entries(VALUE).map((value: any) => {
                                                            console.log("value 2: ", value);
                                                            const CHILDREN_LABEL = value[0];
                                                            const CHILDREN_VALUE = value[1];
                                                            console.log("check children value: ", Array.isArray(CHILDREN_VALUE));

                                                            if (typeof CHILDREN_VALUE === "string") {
                                                                return (
                                                                    <li key={generate.id()} className={styles["row"]}>
                                                                        <div className={styles["key"]}>{CHILDREN_LABEL.toLocaleUpperCase()}</div>
                                                                        <div className={styles["value"]} style={{ color: !CHILDREN_VALUE || CHILDREN_VALUE === "" ? "tomato" : "black" }}>{CHILDREN_VALUE ? CHILDREN_VALUE : "Chưa khai báo"}</div>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                )
                            }
                        } else if (typeof VALUE == "string") {
                            return (
                                <li key={generate.id()} className={styles["row"]}>
                                    <div className={styles["key"]}>{LABEL.toLocaleUpperCase()}</div>
                                    <div className={styles["value"]} style={{ color: !VALUE ? "tomato" : "black" }}>{VALUE ? VALUE : "Chưa khai báo"}</div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}

const Ingredient = ({ data, children }: { data: any, children: any }) => {
    const { childrenData, setChildrenData, isChildrenLoading, handleResourceSearch } = useDataManagementStore();
    const [isSourceShow, setIsSourceShow] = useState<boolean>(false);
    const [isProcessShow, setIsProcessShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    console.log("selected id: ", selectedId);

    const getResource = (id: string, value: string) => {
        console.log("re id: ", id);
        if (isSourceShow && selectedId) {
            setSelectedId(null);
            setIsSourceShow(false);
            setChildrenData(undefined);
        } else {
            setSelectedId(id);
            setIsSourceShow(true);
            handleResourceSearch(value);
        }
    }

    return (
        <div key={data._id} style={{ display: "flex", flexDirection: "column", margin: "24px 0px" }}>
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "whitesmoke", padding: 16, width: "100%" }}>
                <div style={{ width: "50%", fontSize: 16, color: "black", fontWeight: "bold" }}>Tên nguyên liệu</div>
                <div style={{ width: "50%", fontSize: 16, color: "black", fontWeight: "bold", textAlign: "right" }}>{data.name}</div>
            </div>
            <button onClick={() => setIsProcessShow(!isProcessShow)}
                style={{
                    padding: 16,
                    alignItems: "center",
                    backgroundColor: "white",
                    justifyContent: "flex-start",
                    outline: "none",
                    border: "none"
                }}>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "#ABABAB" }}>{isProcessShow ? "remove" : "add"}</span>
                    <div style={{ color: "black", marginLeft: 12, fontWeight: "bold", textTransform: "uppercase" }}>Quy trình</div>
                </div>
            </button>
            {
                isProcessShow && (
                    data.process.data.map((value: any, mIndex: number) => {
                        return (
                            <div key={mIndex} style={{ display: "flex", flexDirection: "row", marginLeft: 20, padding: 12, width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ width: "22%", color: "gray", textAlign: "center", fontWeight: "bold" }}>{value.name}</div>
                                <div style={{ margin: "0px 16px", width: 1, backgroundColor: "black", height: "100%" }} />
                                <div style={{ display: "flex", flexDirection: "column", width: "75%" }}>
                                    {
                                        value.times.length ? value.times.map((date: Date, dateIndex: number) => {
                                            return (
                                                <div key={dateIndex} style={{ width: "100%", color: "gray", padding: "8px 0px" }}>{`Lần ${mIndex + 1}.   ${moment(date).format("HH:mm - DD/MM/YYYY")}`}</div>
                                            )
                                        }) : (
                                            <div style={{ width: "100%", color: "gray", fontStyle: "italic", padding: "8px 0px" }}>Chưa khai báo quy trình</div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })

                )
            }
            <button onClick={() => getResource(data._id, data.source)}
                style={{
                    padding: 16,
                    alignItems: "center",
                    backgroundColor: "white",
                    justifyContent: "flex-start",
                    outline: "none",
                    border: "none"
                }}>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "#ABABAB" }}>{isSourceShow && selectedId === data._id ? "remove" : "add"}</span>
                    <div style={{ color: "black", marginLeft: 12, fontWeight: "bold", textTransform: "uppercase" }}>Nguồn nguyên liệu</div>
                </div>
            </button>
            {
                isSourceShow && selectedId === data._id &&
                    isChildrenLoading && selectedId === data._id ? (
                        <Circles
                            height="24"
                            width="24"
                            color="#ff4500"
                            ariaLabel="circles-loading"
                            wrapperStyle={{ display: "flex", justifyContent: "center", padding: "24px" }}
                            wrapperClass=""
                            visible={isChildrenLoading}
                        />
                ) : childrenData && selectedId === data._id ? (
                    <div style={{  marginLeft: 24 }}>{children}</div>
                ) : childrenData === null && selectedId === data._id ? (
                    <p style={{ color: "tomato", textAlign: "center", padding: 12, fontSize: 13 }}>Không tìm thấy nguồn nguyên liệu</p>
                ) : childrenData === undefined && null
            }
        </div>
    )
}