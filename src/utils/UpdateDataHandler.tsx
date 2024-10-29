import { supabase } from "./Supabase";

export const onClickUpdateHandler = (e: any, updateData: any, id: string, table: string) => {
    e.preventDefault();

    if (table === 'partners' || table === 'news' || table === 'notices') {
        if (!updateData || !id) {
            console.error("admData or admData.id is missing.");
            return;
        }

        const fetchUpdate = async () => {
            console.log(table, id);
            try {
                const { error } = await supabase
                    .from(table)
                    .update(updateData)
                    .eq('id', id)
                    .select();

                if (error) throw error;

                window.location.pathname = `/adm/${table}`;
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        fetchUpdate();
    } else {
        const isReal = confirm('수정을 완료하시겠습니까?');

        // admData가 존재하는지 미리 체크
        if (!updateData || !id) {
            console.error("admData or admData.id is missing.");
            return;
        }

        const fetchUpdate = async () => {
            console.log(table, id);
            try {
                const { error } = await supabase
                    .from(table)
                    .update(updateData)
                    .eq('id', id)
                    .select();

                if (error) throw error;

                window.location.pathname = `/adm/${table}`;
            } catch (error) {
                console.error("Error fetching paginated data from Supabase:", error);
            }
        };

        if (isReal) {
            fetchUpdate();
        };
    };
};