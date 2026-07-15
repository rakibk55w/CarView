import { toast } from "react-toastify";

export function showErrorToast(message) {
    toast.error(message);
}

export function showSuccessToast(message) {
    toast.success(message);
}

export function showInfoToast(message) {
    toast.info(message);
}

export function showWarningToast(message) {
    toast.warning(message);
}