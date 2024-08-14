import { useContext } from "react";
import { AccessInfoManageContext } from "./AccessInfoManageProvider";

export default function useAccessInfoManageStore() {
    return useContext(AccessInfoManageContext);
}
