import useApi from "@/shared/utils/useApi";
import LoginOrRegisterFormModel from "@/features/user/authorize/model/LoginOrRegisterFormModel";

async function getOtpCode(): Promise<void>{
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/otp/send`;
    await useApi(API_URL, {
        method: 'POST',
        body: JSON.stringify(LoginOrRegisterFormModel.dataForm),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });
}

export default getOtpCode;