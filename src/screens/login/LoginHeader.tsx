import { TerminalIcon } from "./icons";

export default function LoginHeader() {
    return (
        <div className="jui-auth-header">
            <div className="jui-auth-brand">
                <span className="jui-auth-icon">
                    <TerminalIcon />
                </span>
                <span className="jui-auth-title">JavaUI Studio</span>
            </div>
            <p className="jui-auth-subtitle">Workspace Authentication</p>
        </div>
    );
}
