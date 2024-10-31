import { atom } from "recoil";

const getInitialPopupModalOpen = () => {
    if (typeof window !== 'undefined') {
        const popupCookie = document.cookie.split('; ').find(row => row.startsWith('zf-pov='));
        if (!popupCookie) {
            return true; // 쿠키 값이 없을 때 true 반환
        }
        const cookieValue = popupCookie.split('=')[1];
        const cookieDate = new Date(cookieValue); // 쿠키 값이 날짜 형식이라고 가정
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환

        if (now.getTime() - cookieDate.getTime() > oneDay) {
            return true;
        } // 하루가 지났을 때 true 반환
        
        return false;
    }
    return false;
};

export const isPopup = atom({
    key: 'isPopup',
    default: getInitialPopupModalOpen()
});