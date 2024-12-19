import Image from "next/image";

import { useTranslations } from "next-intl";
import styles from "./Header.module.scss";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher/LanguageSwitcher";
import logo from "@/assets/image/logo.png";

export default function Header() {
  const t = useTranslations();

  return (
    <div className={styles.header} data-testid="header-component" data-test="test100">
      <Image src={logo} width={68} alt={t("logo")} className={styles.logo} />
      <LanguageSwitcher />
    </div>
  );
}
