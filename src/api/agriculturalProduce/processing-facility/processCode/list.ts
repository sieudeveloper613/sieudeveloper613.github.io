import ENV from "../../../../core/ENV";
import axiosClient from "../../../../core/axiosClient";

const list = async (pageNumber: number, perPage: number) => {
    try {
        console.log("list-params: ", { pageNumber, perPage });
        
        const request = await axiosClient.get(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/process-code/list?listpageNumber=${pageNumber}&nPerPage=${perPage}&isMore=true`,
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data,
        };
    } catch (error: any) {
        console.log("list-error: ", error);
        return { status: "failure"};
    }
}

export default list;