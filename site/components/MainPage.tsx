'use client';

import cx from 'clsx';
import { Button, Container, Text, Title } from '@mantine/core';
import classes from './MainPage.module.css';

export function MainPage({t, setViewApp}: any) {
  return (
    <div >

      <div className={classes.inner}>
        <Title className={classes.title}>
          {t('title')}
          <Text component="span" inherit className={classes.highlight}>
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            {t('ads')}
          </Text>
          <hr></hr>
          <Text size="lg" className={classes.description}>
            {t('free')}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg"
          onClick={() => {
            window.open(process.env.NEXT_PUBLIC_LINK_DEMO_APP, '_blank');
          }}>
          {t('buttonGetStarted')} 
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg"
          onClick={() => {
            setViewApp(true)
            }}>
            {t('buttonTry')}
          </Button>
        </div>
      </div>
    </div>
  );
}