import { NavigationMenu } from 'radix-ui';
import { Link } from 'react-router';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationMenu.Root>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <NavigationMenu.Link asChild>
              <Link to="/">Home</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <NavigationMenu.Link asChild>
              <Link to="/game">Game</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.Root>
      {children}
    </>
  );
};
