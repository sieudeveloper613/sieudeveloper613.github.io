import ENV from "../../../../core/ENV";
import axiosClient from "../../../../core/axiosClient";

const update = async (code: string) => {
    try {
        console.log("update-params: ", { code });

        const request = await axiosClient.patch(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/process-code/updateReset/${code}`,
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data,
        };
    } catch (error: any) {
        console.log("update-error: ", error);
        return { status: "failure" };
    }
}

export default update;