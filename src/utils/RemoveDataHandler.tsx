import { supabase } from "./Supabase";

export const onClickRemoveHandler = (e: any, admData: any, id: string, table: string) => {
    e.preventDefault();

    const isReal = confirm('정말로 삭제하시겠습니까?\n\n삭제 완료 시 이 정보는 더 이상 남지 않게 됩니다.');

    // admData가 존재하는지 미리 체크
    if (!admData || !id) {
        console.error("admData or admData.id is missing.");
        return;
    }

    const fetchRemove = async () => {
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) throw error;

            window.location.pathname = `/adm/${table}`;
        } catch (error) {
            console.error("Error fetching paginated data from Supabase:", error);
        }
    };

    if (isReal) {
        fetchRemove();
    }
};