import { supabase } from "./Supabase";

export const onClickAddHandler = (e: any, insertData: any, table: string) => {
    e.preventDefault();

    const isReal = confirm('이대로 추가하시겠습니까?');

    const fetchAdd = async () => {
        try {
            const { data, error } = await supabase
                .from(table)
                .insert([
                    insertData,
                ])
                .select();

            if (error) throw error;

            window.location.pathname = `/adm/${table}`;
        } catch (error) {
            console.error("Error fetching paginated data from Supabase:", error);
        }
    };

    if (isReal) {
        fetchAdd();
    }
};

export const onClickRequestsHandler = (e: any, insertData: any) => {
    e.preventDefault();

    const isReal = confirm('문의를 남기시겠습니까?');

    const fetchAdd = async () => {
        try {
            const { data, error } = await supabase
                .from('inquirys')
                .insert([
                    insertData,
                ]);

            if (error) throw error;
        } catch (error) {
            console.error("Error fetching paginated data from Supabase:", error);
        }
    };

    if (isReal) {
        fetchAdd();
    }
};