'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import AuthPageStore from "./store/AuthPageStore";
import AuthForm from "@/features/user/authorize/ui/form/AuthForm";
import RegisterForm from "@/features/user/authorize/ui/form/RegisterForm";
import ConfirmForm from "@/features/user/authorize/ui/form/ConfirmForm";

const AuthPage: React.FC = observer(() => {
    const stateForm = AuthPageStore.stateForm;

    return (
        <main className="main">
            {stateForm === "auth" && (
                <AuthForm />
            )}
            {stateForm === "register" && (
                <RegisterForm />
            )}
            {stateForm === "confirm" && (
                <ConfirmForm />
            )}
        </main>
    );
});

export default AuthPage;