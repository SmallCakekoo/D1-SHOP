import AppLink from '../ui/AppLink'
import Icon from '../ui/Icon'
import { quickAccess } from '../../data/navigation'

const P = 'd1tiendas-commons-components-1-x-'

export default function QuickAccessMenu() {
  return (
    <div
      className={`${P}containerLayout ${P}containerLayout--desktop-header ${P}containerLayout--max-width ${P}containerLayout--header-menu ${P}containerLayout--header ${P}containerLayout--quick-access flex section-space-left section-space-right`}
    >
      <div className={`${P}containerQuickAccessMenu ${P}containerQuickAccessMenu--quick-access-menu w-100 pt3 pb2 mb2 flex items-center`}>
        <div className="d1-quick-access-row scroll-invisible">
          {quickAccess.map((item) => (
            <div key={item.href}>
              <AppLink
                href={item.href}
                className={`${P}containerQuickAccessMenuItem ${P}containerQuickAccessMenuItem--quick-access-menu flex items-center pa2 no-underline`}
              >
                <div className={`${P}containerQuickAccessMenuItemIcon ${P}containerQuickAccessMenuItemIcon--quick-access-menu flex`}>
                  <Icon id={item.icon} />
                </div>
                <span className={`t-small ${P}containerQuickAccessMenuItemLabel ${P}containerQuickAccessMenuItemLabel--quick-access-menu`}>
                  {item.label}
                </span>
              </AppLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
