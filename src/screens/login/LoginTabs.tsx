type Mode = "signin" | "signup";

interface LoginTabsProps {
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

export default function LoginTabs({ mode, onModeChange }: LoginTabsProps) {
    const isSignIn = mode === "signin";

    return (
        <div className="jui-auth-tabs" role="tablist" aria-label="Authentication mode">
            <button
                type="button"
                role="tab"
                aria-selected={isSignIn}
                className={`jui-auth-tab ${isSignIn ? "jui-auth-tab--active" : ""}`}
                onClick={() => onModeChange("signin")}
            >
                Sign In
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={!isSignIn}
                className={`jui-auth-tab ${!isSignIn ? "jui-auth-tab--active" : ""}`}
                onClick={() => onModeChange("signup")}
            >
                Create Account
            </button>
        </div>
    );
}
