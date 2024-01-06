import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

function valuetext(value: number) {
  return `${value}%`;
}

const minDistance = 1;

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
        <Stack spacing={3} direction="row" sx={{ mb: 1 }} alignItems="center">
          <HourglassTopOutlinedIcon sx={{ color: '#9CA3AF' }} />
          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            sx={{
              color: '#60A5FA',
              '& .MuiSlider-thumb': {
                backgroundColor: '#60A5FA',
              },
              '& .MuiSlider-rail': {
                color: '#60A5FA',
              },
              '& .MuiSlider-track': {
                color: '#60A5FA',
              },
            }}
          />
          <HourglassBottomOutlinedIcon sx={{ color: '#9CA3AF' }} />
        </Stack>
      </Box>
      <span className="min-dist-slider-label absolute bottom-1.5 left-0 right-0 text-center text-gray-600">minimum distance shift</span>
    </nav>
  );
}