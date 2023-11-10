import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // 进度条

// 白名单路由
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const token = localStorage.getItem("accessToken");
  if (token) {
    to.path !== "/login" ? next() : next("/");
    NProgress.done();
    return;
  }

  if (to.path === "/login") {
    next();
    NProgress.done();
    return;
  }

  next("/login");
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
