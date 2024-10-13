import { ThreeCircles } from "react-loader-spinner"

interface SpinnerProps {
  height?: number
  width?: number
}

export const Spinner = ({ height, width }: SpinnerProps) => {
  return (
    <ThreeCircles
      visible={true}
      height={height || "50"}
      width={width || "50"}
      color="#eeeeee"
      innerCircleColor="#526BD6"
      middleCircleColor="#020C31"
      outerCircleColor="#2D408F"
      ariaLabel="chat-history-loading"
    />
  )
}

export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  )
}
