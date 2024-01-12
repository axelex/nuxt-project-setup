const useDarkMode = () => {
  type Theme = "light" | "dark";

  const setColorTheme = (newTheme: Theme) => {
    useColorMode().preference = newTheme;
  };

  return {
    setColorTheme,
  };
};
export default useDarkMode;
