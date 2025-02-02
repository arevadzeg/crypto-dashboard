import dayjs from "dayjs"


const formatTime = (time: number, selectedRange: string) => {
    return selectedRange === "1D" ? dayjs(time).format("HH:mm") : dayjs(time).format("MMM DD")
}

export default formatTime