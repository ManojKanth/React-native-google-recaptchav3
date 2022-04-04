import * as React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const patchPostMessageJsCode = `(${String(function () {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () =>
    String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  window.postMessage = patchedPostMessage;
})})();`;

const getExecutionFunction = (siteKey) => {
  return `window.grecaptcha.execute('${siteKey}', {action: 'form'}).then(
    function(args) {
      window.ReactNativeWebView.postMessage(args);
    }
  )`;
};

const getInvisibleRecaptchaContent = (siteKey, action) => {
  return `<!DOCTYPE html><html><head>
    <script src="https://www.google.com/recaptcha/api.js?render=${siteKey}"></script>
    <script>window.grecaptcha.ready(function() { ${getExecutionFunction(
      siteKey,
      action,
    )} });</script>
    </head></html>`;
};

class ReCaptchaComponent extends React.Component {
  _webViewRef = React.createRef();
  constructor(props) {
    super(props);
  }

  render() {
    const {onTokenReceived, captchaDomain, siteKey} = this.props;
    return (
      <View style={{flex: 0.0001, width: 0, height: 0}}>
        <WebView
          ref={ref => {
            this._webViewRef = ref;
          }}
          androidLayerType="software"
          javaScriptEnabled
          originWhitelist={['*']}
          automaticallyAdjustContentInsets
          mixedContentMode={'always'}
          injectedJavaScript={patchPostMessageJsCode}
          source={{
            html: getInvisibleRecaptchaContent(siteKey),
            baseUrl: captchaDomain,
          }}
          onMessage={(e: any) => {
            onTokenReceived(e.nativeEvent.data);
          }}
        />
      </View>
    );
  }
}

ReCaptchaComponent.propTypes= {
  onTokenReceived: PropTypes.func,
  captchaDomain: PropTypes.string,
  siteKey: PropTypes.string,
}

export default ReCaptchaComponent;
