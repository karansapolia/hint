import { ApplicationInsights } from '@microsoft/applicationinsights-web-basic';

const instrumentationKey = '8ef2b55b-2ce9-4c33-a09a-2c3ef605c97d';

let appInsights: ApplicationInsights;

const trackEvent = (name: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) => {
    if (!appInsights) {
        return;
    }

    appInsights.track({
        baseData: {
            measurements,
            name,
            properties
        },
        baseType: 'EventData',
        name: `Microsoft.ApplicationInsights.${instrumentationKey}.Event`
    });
};

import { ErrorData } from '../../shared/types';

/** Called to initialize the underlying analytics library. */
export const setup = () => {
    appInsights = new ApplicationInsights({ instrumentationKey });
};

/** Called when analysis was canceled by the user. */
export const trackCancel = (duration: number) => {
    trackEvent('f12-cancel', undefined, { 'f12-cancel-duration': duration });
};

/** Called when analysis fails due to an error. */
export const trackError = (error: ErrorData) => {
    trackEvent('f12-error', error);
};

/** Called when analysis finished. */
export const trackFinish = (duration: number) => {
    trackEvent('f12-finish', undefined, { 'f12-finish-duration': duration });
};

/** Called when the "Hints" tab was opened by the user. */
export const trackShow = () => {
    trackEvent('f12-show');
};

/** Called when analysis was started by the user. */
export const trackStart = () => {
    trackEvent('f12-start');
};
