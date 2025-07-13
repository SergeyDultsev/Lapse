import useApi from "@shared/utils/useApi";
import LoginOrRegisterFormModel from "@features/user/authorize/LoginOrRegisterFormModel";

async function loginOrRegister(): Promise<boolean> {
    const API_URL : string = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-auth`;
    const response = await useApi(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(LoginOrRegisterFormModel.dataForm),
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
    });

    if(response?.data.data) return true;

    return false;
}

export default loginOrRegister;