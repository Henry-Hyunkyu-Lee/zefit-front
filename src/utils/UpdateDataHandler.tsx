import { supabase } from "./Supabase";

export const onClickUpdateHandler = (e: any, updateData: any, id: string, table: string) => {
    e.preventDefault();

    if (table === 'partners' || table === 'news' || table === 'notices') {
        if (!updateData || !id) {
            console.error("admData or admData.id is missing.");
            return;
        }

        const fetchUpdate = async () => {
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

export const onClickListUpdateHandler = (e: any, updateData: any, id: number[], table: string) => {
    e.preventDefault();

    const isReal = confirm('선택한 문의글을 모두 답변 완료 처리하시겠습니까?');

    // admData가 존재하는지 미리 체크
    if (!updateData || !id) {
        console.error("admData or admData.id is missing.");
        return;
    }

    const fetchUpdate = async () => {
        try {
            const { error } = await supabase
                .from(table)
                .update(updateData)
                .in('id', id)
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

export const onClickAllUpdateHandler = (e: any, updateData: any, table: string) => {
    e.preventDefault();

    const isReal = confirm('선택한 문의글을 모두 답변 완료 처리하시겠습니까?');

    const fetchUpdate = async () => {
        try {
            const { error } = await supabase
                .from(table)
                .update(updateData)
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