import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import { getPageQuery } from './utils';

export function getAuthority(str?: string) {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('authentication.accessToken')
      : str; // authorityString could be admin, "admin", ["admin"]
  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}
export function removeAuthority() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { width } = useWindowDimensions();

  localStorage.removeItem('authentication.accessToken');

  const { redirect } = getPageQuery();

  if (!window.location.pathname.includes('/login') && !redirect) {
    width > 768 ? navigate('/login') : navigate('/login-method');
  }
}
