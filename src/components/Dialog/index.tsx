import * as React from 'react';
import { DialogActions, DialogTitle, DialogContent, Dialog } from '@mui/material';
import TOCContent from './TOCContent';
import PPContent from './PPContent';
import { Button } from 'antd';
import { ReactComponent as BackSVG } from 'assets/icons/backHeader.svg';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';

interface DialogFCProps {
  isMobile: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  agreeContent: (arg0: boolean) => void;
  type: string;
}

const commonStyle = {
  background: '#1B242D',
  color: '#BDC5CB',
  border: 'none',
};

const titleStyle = {
  color: '#ffffff',
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
  p: 2,
  height: 60,
};

const titleDesktopStyle = {
  justifyContent: 'center',
  fontSize: 50,
  height: 'auto',
  pb: 5,
  pt: 5,
};

const bodyDesktopStyle = {
  pl: 22,
  pr: 22,
  scrollbarGutter: 'stable both-edges',
  overflowY: 'hidden',
  '&:hover': { overflowY: 'scroll' },
  '&:focus': { overflowY: 'scroll' },
  '&:active': { overflowY: 'scroll' },
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-track': {
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#40556a',
    borderRadius: '1rem',
  },
};

const ScrollDialog: React.FC<DialogFCProps> = ({ isMobile, open, setOpen, agreeContent, type }) => {
  const [t] = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  const desktopStyle = (mobileStyle: { [name: string]: any }) => !isMobile && { ...mobileStyle };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullScreen={isMobile}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 0 },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={[{ ...commonStyle, ...titleStyle }, desktopStyle(titleDesktopStyle)]}
        >
          {isMobile && (
            <div>
              <Button
                className="menubtn"
                type="text"
                icon={<BackSVG height={24} width={24} />}
                onClick={handleClose}
              ></Button>
            </div>
          )}
          <div>
            <b>{type === 'TOC' ? 'Terms of Service' : 'Privacy Policy'}</b>
          </div>
          {isMobile && <div style={{ width: 32 }}></div>}
        </DialogTitle>
        <DialogContent dividers={true} sx={[{ ...commonStyle }, desktopStyle(bodyDesktopStyle)]}>
          {type === 'TOC' ? <TOCContent /> : <PPContent />}
        </DialogContent>
        <DialogActions
          sx={[{ ...commonStyle, justifyContent: 'center' }, desktopStyle({ pt: 5, pb: 5 })]}
        >
          <Button
            type="primary"
            className={`button_ant_ct w-100${isMobile ? ' big_ant' : ''}`}
            style={{ maxWidth: '400px' }}
            onClick={() => {
              agreeContent(true);
              handleClose();
            }}
          >
            {t(common.agree)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScrollDialog;
