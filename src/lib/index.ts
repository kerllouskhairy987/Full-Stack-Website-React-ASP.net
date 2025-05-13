
import Swal from "sweetalert2";

interface AlertErrorProps {
    title: string;
    text: string;
}
export const AlertError = ({ title, text }: AlertErrorProps) => {
    Swal.fire({
        icon: "error",
        title,
        text
    });
};

interface AlertSuccessProps {
    title: string;
    html: string;
}
export const AlertSuccess = ({title, html}: AlertSuccessProps) => {
    Swal.fire({
        title,
        html,
        icon: "success",
        draggable: true
    });
}