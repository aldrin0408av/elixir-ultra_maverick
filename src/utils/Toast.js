import Swal from 'sweetalert2'

// Icons: success, warning, error, info

export const BasicToast = (position, icon, title, timer) => {
    return (
        Swal.fire({
            position: position,
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: timer
        })
    )
}

export const ModalToast = (title, text, icon, confirmButtonText) => {
    return (
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        })
    )
}
