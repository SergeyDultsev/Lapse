'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import AuthorizePageModel from '@/pages/auth-page/model/AuthorizePageModel';
import LoginForm from "@/features/user/authorize/ui/form/LoginForm";
import RegisterForm from "@/features/user/authorize/ui/form/RegisterForm";
import OtpForm from "@/features/user/authorize/ui/form/OtpForm";
import ForgotForm from "@/features/user/authorize/ui/form/ForgotForm";

const AuthPage: React.FC = observer(() => {
    const stateForm = AuthorizePageModel.stateForm;

    return (
        <main className="main">
            {stateForm === "auth" && (
                <LoginForm />
            )}
            {stateForm === "register" && (
                <RegisterForm />
            )}
            {stateForm === "confirm" && (
                <OtpForm />
            )}
            {stateForm === "forgot" && (
                <ForgotForm />
            )}
        </main>
    );
});

export default useRouterMiddleware(AuthPage);