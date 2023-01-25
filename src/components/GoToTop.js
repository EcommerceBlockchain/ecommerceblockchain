import { useEffect } from "react";

function GoToTop() {
  // const routePath = useLocation();
  // console.log(routePath);
  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    onTop();
  }, []);

  return null;
}

export default GoToTop;
