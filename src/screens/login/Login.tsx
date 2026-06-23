"use client";

import { useState, ReactNode } from "react";
import LoginHeader from "./LoginHeader";
import LoginTabs from "./LoginTabs";
import LoginForm from "./LoginForm";
import "./styles/Login.styles.css";

type Mode = "signin" | "signup";

export interface LoginProps {
    onSignIn?: (values: { email: string; token: string }) => void;
    onSignUp?: (values: { email: string; token: string }) => void;
    onForgotToken?: () => void;
    onOAuth?: (provider: "github" | "google") => void;
}

export default function Login({
    onSignIn,
    onSignUp,
    onForgotToken,
    onOAuth,
}: LoginProps): ReactNode {
    const [mode, setMode] = useState<Mode>("signin");

    return (
        <div className="jui-auth-page">
            <div className="jui-auth-card">
                <LoginHeader />
                <LoginTabs mode={mode} onModeChange={setMode} />
                <LoginForm
                    mode={mode}
                    onSignIn={onSignIn}
                    onSignUp={onSignUp}
                    onForgotToken={onForgotToken}
                    onOAuth={onOAuth}
                />
            </div>
        </div>
    );
}
