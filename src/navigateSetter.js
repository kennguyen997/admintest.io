import { useNavigate } from 'react-router-dom';

export const History = {
  navigate: null,
  push: (page, ...rest) => History.navigate(page, ...rest),
};

const NavigateSetter = () => {
  History.navigate = useNavigate();
  return null;
};

export default NavigateSetter;
