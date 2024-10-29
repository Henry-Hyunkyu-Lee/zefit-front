import RequestsDetail from '@/components/page/AdminPage/AdmDetailPage/Requests';
import History from '@/components/page/AdminPage/History';
import News from '@/components/page/AdminPage/News';
import Notice from '@/components/page/AdminPage/Notice';
import Requests from '@/components/page/AdminPage/Requests';
import Status from '@/components/page/AdminPage/Status';
import CorrectHistory from '@/components/page/AdminPage/Update/History';
import CorrectNews from '@/components/page/AdminPage/Update/News';
import CorrectNotice from '@/components/page/AdminPage/Update/Notice';
import CorrectStatus from '@/components/page/AdminPage/Update/Status';

export const contentConfig: {
    [key: string]: {
        title: string,
        component?: React.ComponentType<{ admData: any }>
    };
} = {
    historys: { title: '연혁', component: History },
    partners: { title: '인증 및 파트너 현황', component: Status },
    notices: { title: '공지사항', component: Notice },
    news: { title: '보도자료', component: News },
    inquirys: { title: '문의한 글', component: Requests },
};

export const correctContentConfig: {
    [key: string]: {
        title: string,
        component?: React.ComponentType<{
            admData: any,
            isUpload: boolean,
            setIsUpload: React.Dispatch<React.SetStateAction<boolean>>
        }>
    };
} = {
    historys: { title: '연혁', component: CorrectHistory },
    partners: { title: '인증 및 파트너 현황', component: CorrectStatus },
    notices: { title: '공지사항', component: CorrectNotice },
    news: { title: '보도자료', component: CorrectNews },
    inquirys: { title: '문의한 글', component: RequestsDetail },
};