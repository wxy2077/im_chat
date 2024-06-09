export function useEnv() {
    const {VITE_APP_TITLE, VITE_BASE_API, VITE_PUBLIC_PATH} = import.meta.env;
    return {
        VITE_APP_TITLE,
        VITE_BASE_API,
        VITE_PUBLIC_PATH,
    };
}