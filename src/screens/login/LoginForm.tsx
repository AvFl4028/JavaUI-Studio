import { useState, FormEvent } from "react";
import { LogInIcon, UserPlusIcon } from "./icons";
import LoginOAuth from "./LoginOAuth";

interface LoginFormProps {
    mode: "signin" | "signup";
    onSignIn?: (values: { email: string; token: string }) => void;
    onSignUp?: (values: { email: string; token: string }) => void;
    onForgotToken?: () => void;
    onOAuth?: (provider: "github" | "google") => void;
}

export default function LoginForm({
    mode,
    onSignIn,
    onSignUp,
    onForgotToken,
    onOAuth,
}: LoginFormProps) {
    const isSignIn = mode === "signin";
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [confirmToken, setConfirmToken] = useState("");

    const tokensMismatch =
        !isSignIn && confirmToken.length > 0 && confirmToken !== token;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isSignIn) {
            onSignIn?.({ email, token });
        } else {
            if (tokensMismatch) return;
            onSignUp?.({ email, token });
        }
    }

    return (
        <form className="jui-auth-form" onSubmit={handleSubmit} noValidate>
            <div className="jui-auth-field">
                <label className="jui-auth-label" htmlFor="jui-email">
                    Developer Email
                </label>
                <input
                    id="jui-email"
                    className="jui-auth-input"
                    type="email"
                    placeholder="user@domain.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="jui-auth-field">
                <div className="jui-auth-label-row">
                    <label className="jui-auth-label" htmlFor="jui-token">
                        Access Token
                    </label>
                    {isSignIn && (
                        <button
                            type="button"
                            className="jui-auth-forgot"
                            onClick={() => onForgotToken?.()}
                        >
                            Forgot?
                        </button>
                    )}
                </div>
                <input
                    id="jui-token"
                    className="jui-auth-input"
                    type="password"
                    placeholder="••••••••"
                    autoComplete={isSignIn ? "current-password" : "new-password"}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
            </div>

            {!isSignIn && (
                <div className="jui-auth-field">
                    <label className="jui-auth-label" htmlFor="jui-confirm-token">
                        Confirm Token
                    </label>
                    <input
                        id="jui-confirm-token"
                        className="jui-auth-input"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={confirmToken}
                        onChange={(e) => setConfirmToken(e.target.value)}
                        required
                        aria-invalid={tokensMismatch}
                    />
                    {tokensMismatch && (
                        <p className="jui-auth-error">Tokens don&apos;t match.</p>
                    )}
                </div>
            )}

            <button type="submit" className="jui-auth-submit">
                {isSignIn ? (
                    <>
                        <LogInIcon />
                        <span>Authenticate</span>
                    </>
                ) : (
                    <>
                        <UserPlusIcon />
                        <span>Create Account</span>
                    </>
                )}
            </button>

            <div className="jui-auth-divider">
                <span className="jui-auth-divider-line" />
                <span className="jui-auth-divider-text">OR</span>
                <span className="jui-auth-divider-line" />
            </div>

            <LoginOAuth onOAuth={onOAuth} />
        </form>
    );
}
