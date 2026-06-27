import { Helmet } from "react-helmet-async";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

/**
 * 페이지 공통 컨테이너
 */
const PageContainer = ({ title, children }: Props) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {children}
  </>
);

export default PageContainer;
