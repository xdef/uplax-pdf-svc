import * as React from "react";
import cx from "clsx";

import classes from "./Layout.module.css";
import { Center, Stack } from "@mantine/core";
import Image from "next/image";

type Props = React.PropsWithChildren<{
  readonly className?: string | undefined;
}>;

const Layout: React.FC<Props> = ({ className, children }) => {
  return (
    <Stack
      className={cx(classes.root, className)}
      gap="xl"
    >
      <Center py="xl">
        <Image
          src="/logo-text.svg"
          alt="Импульс роста"
          width={180}
          height={60}
        />
      </Center>

      {children}
    </Stack>
  );
};

export default Layout;
