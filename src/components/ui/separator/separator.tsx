import * as Separator from '@radix-ui/react-separator'
import styles from './separator.module.css'
export const SeparatorLine = ({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical' | undefined
}) => (
  <Separator.Root className={styles.SeparatorRoot} orientation={orientation} />
)
