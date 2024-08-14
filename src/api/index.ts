import sscc from "./SSCC";
import login from "./login";
import statics from "./statics";
import user from "./master/User";
import globalApi from "./globalApi";
import enterprise from "./enterprise";
import participants from "./participants";
import transportation from "./transportation";
import customerProducts from "./customerProducts";
import resetPasswordApi from "./resetPasswordApi";
import changePasswordApi from "./changePasswordApi";
import statisticalReports from "./statisticalReports";
import agriculturalProduce from "./agriculturalProduce";

const api = Object.freeze({
    sscc,
    user,
    login,
    statics,
    globalApi,
    enterprise,
    participants,
    transportation,
    resetPasswordApi,
    customerProducts,
    changePasswordApi,
    statisticalReports,
    agriculturalProduce,
});

export default api;
