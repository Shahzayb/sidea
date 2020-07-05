export function a11yProps(index: any, name: string) {
  return {
    id: `${name}-tab-${index}`,
    'aria-controls': `${name}-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: unknown;
  value: unknown;
  name: unknown;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, name, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
