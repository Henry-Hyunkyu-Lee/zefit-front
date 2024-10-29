export const getLastLoginDateTime = (paramData: any) => {
    if (paramData) {
        const loginDate = new Date(paramData); // ISO 문자열을 Date 객체로 변환
        const year = loginDate.getFullYear();
        const month = loginDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
        const day = loginDate.getDate();
        const hours = loginDate.getHours();
        const minutes = loginDate.getMinutes();
        const seconds = loginDate.getSeconds();

        const timeObj = { year, month, day, hours, minutes, seconds };

        return `${timeObj.year}-${timeObj.month}-${timeObj.day}  ${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
    } else {
        return null;
    }
};