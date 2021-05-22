import Loader from "react-loader-spinner";
import usePrefersColorScheme from "../hooks/usePrefersColorScheme";
import themes from "../theme";

type AppLoaderProps = {
  width: number;
  height: number;
  className?: string;
};

const AppLoader = ({ width, height, className }: AppLoaderProps) => {
  const preferredColorScheme = usePrefersColorScheme();
  return (
    <div className={className}>
      <Loader
        type="Puff"
        color={themes[preferredColorScheme].colors.ted}
        width={width}
        height={height}
      />
    </div>
  );
};

export default AppLoader;
