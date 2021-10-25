import { FC } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { unitTypeUpdated } from "../../store/ui";

const UnitSwitcher: FC = () => {
  const dispatch = useAppDispatch();
  const unitType = useAppSelector((state) => state.ui.unitType);
  const onChange = (_: any, value: any) => {
    dispatch(unitTypeUpdated(value));
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="temp-unit" name="row-radio-buttons-group" onChange={onChange} value={unitType}>
        <FormControlLabel value="metric" control={<Radio />} label="Celsius" />
        <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit" />
      </RadioGroup>
    </FormControl>
  );
};

export default UnitSwitcher;
