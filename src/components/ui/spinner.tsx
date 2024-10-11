import { ThreeCircles } from "react-loader-spinner"

export const Spinner = () => {
  return (
    <ThreeCircles
      visible={true}
      height="50"
      width="50"
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
