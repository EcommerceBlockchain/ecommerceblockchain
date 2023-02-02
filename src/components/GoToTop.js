import { useEffect } from "react";

function GoToTop() {
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
