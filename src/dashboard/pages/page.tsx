import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import wixLogo from './wix_logo.svg';

const Index: FC = () => {
  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header
          title="Bearer"
          subtitle="Welcome to Bearer"
          actionsBar={
            <Button
              onClick={() => {
                dashboard.showToast({
                  message: 'Bearer delivery service Activated',
                });
              }}
              prefixIcon={<Icons.AIAssistantSmall />}
            >
              Show a toast
            </Button>
          }
        />
        {/* <Page.Content>
         
        </Page.Content> */}
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
