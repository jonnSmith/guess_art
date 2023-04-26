import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import type { FC } from 'react'

import defaultSEOConfig from '~/../next-seo.config'
import { ChakraHOC } from '~/ui/hoc/chakra'
import Layout from '~/ui/layout'

import '~/lib/styles/globals.css'

const AppInstance: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <ChakraHOC>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraHOC>
  )
}

export default AppInstance
