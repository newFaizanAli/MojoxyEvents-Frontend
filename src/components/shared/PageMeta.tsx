import { HelmetProvider, Helmet } from "react-helmet-async";

const PageMeta = ({
    title,
}: {
    title: string;
}) => (
    <Helmet>
        <title>{`${title} | Mojoxy`}</title>
        <meta name="description" content={`This is ${title?.toLocaleLowerCase()} page for Mojoxy`} />
    </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
