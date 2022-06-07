import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function IconCalendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={120}
      viewBox="163.113 39.807 515.665 515.666"
      {...props}
    >
      <Circle fill="#FFF" cx={467.45} cy={269.737} r={27.904} />
      <Circle fill="#FFF" cx={560.463} cy={269.737} r={27.904} />
      <Circle fill="#FFF" cx={467.45} cy={362.749} r={27.904} />
      <Circle fill="#FFF" cx={560.463} cy={362.749} r={27.904} />
      <Circle fill="#FFF" cx={281.426} cy={362.749} r={27.904} />
      <Circle fill="#FFF" cx={374.439} cy={362.749} r={27.904} />
      <Circle fill="#FFF" cx={281.426} cy={455.762} r={27.904} />
      <Circle fill="#FFF" cx={374.439} cy={455.762} r={27.904} />
      <Circle fill="#FFF" cx={467.45} cy={455.762} r={27.904} />
      <Path
        fill="#FFF"
        d="M606.97 77.012h-21.205V55.807c0-8.836-7.163-16-16-16s-16 7.164-16 16v21.205H288.124V55.807c0-8.836-7.164-16-16-16s-16 7.164-16 16v21.205H234.92c-39.595 0-71.808 32.213-71.808 71.808v334.846c0 39.595 32.213 71.808 71.808 71.808h372.05c39.595 0 71.808-32.213 71.808-71.808V148.82c0-39.595-32.213-71.808-71.808-71.808zm-372.05 32h372.05c21.95 0 39.808 17.857 39.808 39.808v21.205H195.113V148.82c0-21.95 17.857-39.808 39.807-39.808zm372.05 414.461H234.92c-21.95 0-39.808-17.857-39.808-39.808v-281.64h451.665v281.641c.001 21.95-17.857 39.807-39.807 39.807z"
      />
    </Svg>
  )
}

export default IconCalendar;