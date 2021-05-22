import Loader from "react-loader-spinner";
import usePrefersColorScheme from "../hooks/usePrefersColorScheme";
import themes from "../theme";

type AppLoaderProps = {
  width: number;
  height: number;
};

const AppLoader = ({ width, height }: AppLoaderProps) => {
  const preferredColorScheme = usePrefersColorScheme();
  return (
    <Loader
      type="Puff"
      color={themes[preferredColorScheme].colors.ted}
      width={width}
      height={height}
    />
  );
};

export default AppLoader;
