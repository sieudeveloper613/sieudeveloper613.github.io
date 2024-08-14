import ENV from "../../../../core/ENV";
import axiosClient from "../../../../core/axiosClient";

const remove = async (_id: string) => {
    try {
        console.log("remove-params: ", { _id });

        const request = await axiosClient.delete(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/process-code/remove/${_id}`,
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data,
        };
    } catch (error: any) {
        console.log("remove-error: ", error);
        return { status: "failure" };
    }
}

export default remove;