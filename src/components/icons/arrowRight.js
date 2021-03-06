import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.width}
      viewBox="0 0 478.46 478.461"
      {...props}
    >
      <Path
        fill={props.fill}
        d="M246.926 348.243a15.949 15.949 0 01-11.27-4.643c-6.273-6.224-6.312-16.354-.088-22.627l65.233-65.743h-161.56c-8.836 0-16-7.163-16-16 0-8.836 7.164-16 16-16h161.561l-65.233-65.743c-6.224-6.272-6.185-16.403.088-22.627 6.271-6.224 16.401-6.186 22.627.088l92.292 93.013c6.19 6.238 6.19 16.301 0 22.539l-92.292 93.013a15.953 15.953 0 01-11.358 4.73z"
      />
      <Path
        fill={props.fill}
        d="M239.229 478.461C107.318 478.461 0 371.143 0 239.23S107.318 0 239.229 0c131.912 0 239.23 107.318 239.23 239.23s-107.317 239.231-239.23 239.231zm0-446.461C124.963 32 32 124.963 32 239.23c0 114.268 92.963 207.23 207.229 207.23 114.268 0 207.23-92.963 207.23-207.23C446.46 124.963 353.497 32 239.229 32z"
      />
    </Svg>
  )
}

export default ArrowRight
