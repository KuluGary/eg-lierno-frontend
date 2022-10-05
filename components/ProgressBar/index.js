import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

Router.events.on("routeChangeStart", (_, { shallow }) => !shallow && NProgress.start());
Router.events.on("routeChangeComplete", (_, { shallow }) => !shallow && NProgress.done());
Router.events.on("routeChangeError", (_, { shallow }) => !shallow && NProgress.done());

export default function () {
  return null;
}
