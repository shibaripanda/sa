'use client';

import { useTranslations } from 'next-intl';
import { MainPage } from '../../components/MainPage';
import { Box, Button } from '@mantine/core';
import { useState } from 'react';

export default function Page() {

  const [viewApp, setViewApp] = useState(false)
  const t = useTranslations()

  return (
    <>
      <Box
        component="iframe"
        src={process.env.NEXT_PUBLIC_LINK_DEMO_APP}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          zIndex: 0,
        }}
      />

      {!viewApp && (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(1px)',
            zIndex: 1,
          }}
        />
      )}

      <Box
        style={{
          position: 'fixed',
          top: viewApp ? 20 : '50%',
          left: viewApp ? 20 : '50%',
          transform: viewApp ? 'translate(0, 0)' : 'translate(-50%, -50%)',
          width: viewApp ? 200 : '80%',
          maxWidth: 600,
          transition: 'all 0.5s ease',
          zIndex: 2,
        }}
      >
        <Box>
          {!viewApp ? (
            <>
              <MainPage t={t} setViewApp={setViewApp}/>
            </>
          ) : (
            <Button size="xs" onClick={() => setViewApp(false)}>
              {t('back')}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}