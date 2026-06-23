import { CodeIcon, GlobeIcon } from "./icons";

interface LoginOAuthProps {
    onOAuth?: (provider: "github" | "google") => void;
}

export default function LoginOAuth({ onOAuth }: LoginOAuthProps) {
    return (
        <div className="jui-auth-oauth-row">
            <button
                type="button"
                className="jui-auth-oauth-btn"
                onClick={() => onOAuth?.("github")}
            >
                <CodeIcon />
                <span>GitHub</span>
            </button>
            <button
                type="button"
                className="jui-auth-oauth-btn"
                onClick={() => onOAuth?.("google")}
            >
                <GlobeIcon />
                <span>Google</span>
            </button>
        </div>
    );
}
