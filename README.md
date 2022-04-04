# React-native-google-recaptchaV3

A react native component that use the invisible reCAPTCHA v3 from Google

## Features

- Pure JS.
- Compatible with both iOS and Android.

## Tech


-  React Native Webview requires to run this component (https://github.com/react-native-webview/react-native-webview#readme)



## Installation


```sh
npm i @manoj/React-native-google-recaptchaV3
npm i react-native-webview
```
## Example

Import this module:
```sh
import ReCaptchaComponent from '@manoj/React-native-google-recaptchaV3';
```

Use as a component:
```sh
<ReCaptchaComponent
  ref={(ref) => this._recaptchRef = ref}
  captchaDomain={'https://yourowndomain.com'}
  siteKey={'sitekey'}
  onTokenReceived={(token) => Alert.alert('CAPTCHA', token)}/>
```



| Prop | Type | Optional | Default | Description |
| ------ | ------ | ------ | ------ | ------ |
| siteKey | String | NO | none | The site key provided by Google reCAPTCHA
| onTokenReceived | Function | NO | none | This returns captcha token from the component
| captchaDomain | String | NO | none | The url registered with Google reCAPTCHA

## Development

Any suggestion is welcome.

