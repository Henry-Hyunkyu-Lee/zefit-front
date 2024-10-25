import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
    forcePathStyle: true,
    region: process.env.AWS_S3_REGION as string,
    endpoint: process.env.AWS_S3_ENDPOINT as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
    }
});

export const saveStorage = async (
    updateData: any,
    setUpdateData: React.Dispatch<React.SetStateAction<any>>,
    inputImg: File
) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: inputImg.name,
        Body: inputImg,
    };

    try {
        await client.send(new PutObjectCommand(params));
        const imageUrl = `${process.env.AWS_S3_ENDPOINT}/${inputImg.name}`;
        setUpdateData({ ...updateData, image: imageUrl }); // 상태에 이미지 URL 저장
    } catch (error) {
        console.error("Error uploading image: ", error);
    }
};