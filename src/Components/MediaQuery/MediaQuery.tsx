import MediaQuery from 'react-responsive';
// @ts-ignore
import breakpoints from '../../sass/sass-vars/variables';

type Props = {
  breakpoint:'screenSmMin' | 'screenXsMax' | 'screenMdMin' | 'screenSmMax' | 'screenLgMin' | 'screenMdMax' | 'screenXlgMin' | 'screenLgMax';
  widthType: 'max' | 'min';
  children: React.ReactNode | Function; // eslint-disable-line @typescript-eslint/ban-types
};

const MediaQueryWrapper: React.FC<Props> = props => {
  
  const mediaProps: {
    maxWidth: any,
    minWidth: any
  } = {
    maxWidth: undefined,
    minWidth: undefined,
  };

  const { breakpoint, widthType, children } = props;

  // set the right prop based on the widthType
  if (widthType === 'max') { mediaProps.maxWidth = breakpoints[`${breakpoint}Num`]; }
  if (widthType === 'min') { mediaProps.minWidth = breakpoints[`${breakpoint}Num`]; }
  return (
    <MediaQuery {...mediaProps}>
      {children}
    </MediaQuery>
  );
};

export default MediaQueryWrapper;
