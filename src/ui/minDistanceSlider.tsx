import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import { IDateSpan, TimespanContext, earliestDate } from '../providers/timeSpanProvider';
import { MappingUpdateContext } from '../providers/mappingUpdateContext';

function valuetext(value: number) {
  return `${value}%`;
}

const minDistance = 1;

export default function MinimumDistanceSlider() {

  const [sliderValues, setSliderValues] = useState<number[]>([0, 100]);
  const [dateSpanText, setDateSpanText] = useState<string>('');
  const { dateSpan, setDateSpan } = useContext(TimespanContext);
  const { setCanUpdateMapping } = useContext(MappingUpdateContext);

  useEffect(() => {
    const newDateSpan = findDate(sliderValues[0], sliderValues[1]);
    setDateSpan(newDateSpan);
  }, [sliderValues]);

  useEffect(() => {
    const dateSpanText = `${new Date(dateSpan.startDate).toLocaleDateString()} - ${new Date(dateSpan.endDate).toLocaleDateString()}`;
    setDateSpanText(dateSpanText);
    setCanUpdateMapping(true);
  }, [dateSpan]);

  function findDate(lower: number, higher: number): IDateSpan {

    const earliest = earliestDate;
    const latest = new Date().getTime();
    const totalTimeSpan = latest - earliest;
    const lowerDate = earliest + totalTimeSpan * (lower / 100);
    const higherDate = earliest + totalTimeSpan * (higher / 100);

    return {
      startDate: lowerDate,
      endDate: higherDate
    }
  }
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
        setSliderValues([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSliderValues([clamped - minDistance, clamped]);
      }
    } else {
      setSliderValues(newValue as number[]);
    }
  };

  return (
    <nav className="min-dist-slider">
      <Box>
        <Stack spacing={3} direction="row" sx={{ mb: 1 }} alignItems="center">
          <HourglassTopOutlinedIcon sx={{ color: '#9CA3AF' }} />
          <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={sliderValues}
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
      <span className="min-dist-slider-label absolute bottom-1.5 left-0 right-0 text-center text-gray-600">{dateSpanText}</span>
    </nav>
  );
}