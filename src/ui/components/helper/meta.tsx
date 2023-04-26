import type { FC } from 'react'

import { SeoSettings } from '~/ui/settings/constants'

const HelperMeta: FC = () => {
  return (
    <>
      <meta name="application-name" content={SeoSettings.applicationName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content={SeoSettings.applicationName}
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="shortcut icon" href={SeoSettings.faviconLink} />
      <link rel="manifest" href={SeoSettings.manifestLink} />
    </>
  )
}

export { HelperMeta }
