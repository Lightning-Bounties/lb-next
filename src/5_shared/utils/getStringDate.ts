const getStringDate = (date: Date) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()] + ' '
        + date.getDate()
        + ', '
        + date.getFullYear()
        + ', '
        + ' '
        + date.getHours().toString().padStart(2, "0")
        + ':' + date.getMinutes().toString().padStart(2, "0")
}

export { getStringDate }