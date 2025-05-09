import path from "path";
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from "next";

export default async function getProvisionApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        // JSON 파일의 경로 설정
        const filePath = path.join(process.cwd(), 'public', 'data', 'provision.json');

        // 파일 읽기
        const jsonData = await fs.readFile(filePath, 'utf8');

        const parseData = JSON.parse(jsonData);

        const resultData = parseData.use;

        // JSON 데이터를 클라이언트에 반환
        res.status(200).json(resultData);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ message: "Internal server error" });
    };
};