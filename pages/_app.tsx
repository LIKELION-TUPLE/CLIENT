import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@src/styles/globalStyle';
import theme from '@src/styles/theme';
import Layout from 'components/common/Layout';
import React from 'react';
import 'components/calendar/Calendar.css';
import '../public/fonts/font.css';
// import { Noto_Sans_KR } from 'next/font/google';
// const notoSansKr = Noto_Sans_KR({ weight: ['400', '500', '700'], subsets: ['latin'] });
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            {/* <main className={notoSansKr.className}> */}
            <Component {...pageProps} />
            {/* </main> */}
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
