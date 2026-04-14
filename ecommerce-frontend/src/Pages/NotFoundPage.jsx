import { Header } from "../Components/Header";
import { Helmet } from "react-helmet";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      </Helmet>

      <Header />

      <div className="not-found-message">Page not found</div>
    </>
  );
}
