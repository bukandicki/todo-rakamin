export const deleteItemButton = (cancelHandler, confirmHandler) => {
    return {
        cancel: {
            title: "Cancel",
            handler: cancelHandler
        },
        confirm: {
            title: "Delete",
            styles: {
                backgroundColor: "#E11428",
                color: "#fff"
            },
            handler: confirmHandler
        }
    }
}

export const editItemButton = (cancelHandler, confirmHandler) => {
    return {
        cancel: {
            title: "Cancel",
            handler: cancelHandler
        },
        confirm: {
            title: "Save Task",
            styles: {
                backgroundColor: "#01959F",
                color: "#fff"
            },
            handler: confirmHandler
        }
    }
}
