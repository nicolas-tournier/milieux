import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Day 0',
  },
  {
    value: 100,
    label: 'Today',
  },
];

function valuetext(value: number) {
  return `${value}%`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {

  const [value, setValue] = React.useState<number[]>([90, 100]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <nav className="min-dist-slider">
      <Box>
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          marks={marks}
        />
      </Box>
      <span className="min-dist-slider-label absolute bottom-3 left-0 right-0 text-center">Minimum distance shift</span>
    </nav>
  );
}