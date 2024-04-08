import { useEffect } from "react";

export const useOnPageLeave = (handler) => {
    useEffect(() => {

        window.addEventListener('beforeunload', (event) => {
            handler();
        });

        return () => {
            handler();
            window.removeEventListener('beforeunload', handler);
        };
    }, []);
};
