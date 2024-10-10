import mixpanel from 'mixpanel-browser'

const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN
mixpanel.init(mixpanelToken, {
  debug: true,
})

export const trackEvent = (event: string, properties?: object) => {
  mixpanel.track(event, properties)
}

export default mixpanel
