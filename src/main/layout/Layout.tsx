import { Theme } from '@radix-ui/themes';
import { MenuDialog } from '../../components/MenuDialog/MenuDialog';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme accentColor="violet" grayColor="slate">
      <MenuDialog />
      {children}
    </Theme>
  );
};
