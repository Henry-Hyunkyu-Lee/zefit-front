"use client";

import { ReactNode, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

export default function ClientProvider({ children }: { children: ReactNode }) {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    // 서버에서는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}
