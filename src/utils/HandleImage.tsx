export const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputImg: React.Dispatch<React.SetStateAction<any>>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const file = e.target.files?.[0];
    if (file) {
        setInputImg(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

export const handleImageDelete = (
    setInputImg: React.Dispatch<React.SetStateAction<any>>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>,
    setInput: React.Dispatch<React.SetStateAction<any>>,
    input: any
) => {
    setInputImg(null);
    setPreviewUrl(null);
    setInput({ ...input, image: null });

    // 파일 입력 요소 초기화
    const fileInput = document.getElementById('files') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
};